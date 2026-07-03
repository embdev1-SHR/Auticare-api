const railwayDb = require("../config/railway-db.config");
const mainDb = require("../config/db.config");
const { compare, hash } = require("bcrypt");

// ── Device registration ───────────────────────────────────────────────────────

exports.registerDevice = (centerId, deviceId, centerName, callBack) => {
  railwayDb.query(
    `INSERT INTO device_registrations (device_id, center_id, center_name, last_seen_at)
     VALUES (?, ?, ?, NOW())
     ON DUPLICATE KEY UPDATE
       last_seen_at = IF(center_id = VALUES(center_id), NOW(), (SELECT 1 FROM (SELECT 1) t))`,
    [deviceId, centerId, centerName],
    (error) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") return callBack("CONFLICT");
        return callBack(error.message);
      }
      return callBack(null, "ok");
    }
  );
};

exports.checkDevice = (deviceId, callBack) => {
  railwayDb.query(
    `SELECT center_id, center_name, activated_at FROM device_registrations WHERE device_id = ?`,
    [deviceId],
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows[0] || null);
    }
  );
};

exports.touchDevice = (deviceId) => {
  railwayDb.query(`UPDATE device_registrations SET last_seen_at = NOW() WHERE device_id = ?`, [deviceId]);
};

// ── Classes (departments from main Auticare DB) ───────────────────────────────

exports.getClasses = (centerId, callBack) => {
  // Mirror the exact department visibility used by the Departments page
  // (departmentListByCenterUserID) but keyed by CenterID instead of the
  // center's login UserID: departments created by the owning client, by the
  // center itself, by a therapist under the center, plus Default departments.
  mainDb.query(
    `SELECT DISTINCT d.DepartmentID AS ClassID, d.DepartmentName AS ClassName FROM (
       SELECT departments.DepartmentID, departments.DepartmentName
         FROM clients
         INNER JOIN centers ON centers.ClientID = clients.ClientID
         INNER JOIN departments ON clients.UserID = departments.Create_By
         WHERE centers.CenterID = ? AND departments.Status = 1
       UNION
       SELECT departments.DepartmentID, departments.DepartmentName
         FROM centers
         INNER JOIN departments ON centers.UserID = departments.Create_By
         WHERE centers.CenterID = ? AND departments.Status = 1
       UNION
       SELECT departments.DepartmentID, departments.DepartmentName
         FROM centers
         INNER JOIN therapists ON therapists.CenterID = centers.CenterID
         INNER JOIN departments ON therapists.UserID = departments.Create_By
         WHERE centers.CenterID = ? AND departments.Status = 1
       UNION
       SELECT DepartmentID, DepartmentName
         FROM departments
         WHERE DepartmentType = 'Default' AND Status = 1
     ) d
     ORDER BY d.DepartmentName`,
    [centerId, centerId, centerId],
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows);
    }
  );
};

// Set (or update) the Blueroom username + password for a department.
exports.setDepartmentAuth = (centerId, departmentId, username, password, callBack) => {
  hash(password, 10, (err, hashed) => {
    if (err) return callBack(err.message);
    railwayDb.query(
      `INSERT INTO department_passwords (department_id, center_id, username, password)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE username = VALUES(username), password = VALUES(password), updated_at = NOW()`,
      [departmentId, centerId, username, hashed],
      (error) => {
        if (error) {
          if (error.code === "ER_DUP_ENTRY") return callBack("This username is already used by another department.");
          return callBack(error.message);
        }
        return callBack(null, "Credentials set");
      }
    );
  });
};

// Returns configured usernames per department for this center (for dashboard display).
exports.getDepartmentCredentials = (centerId, callBack) => {
  railwayDb.query(
    `SELECT department_id, username FROM department_passwords WHERE center_id = ?`,
    [centerId],
    (error, rows) => {
      if (error) {
        // If the username column hasn't been added yet, treat as "none set"
        // rather than failing the whole dashboard section.
        if (error.code === "ER_BAD_FIELD_ERROR" || error.code === "ER_NO_SUCH_TABLE") {
          return callBack(null, []);
        }
        return callBack(error.message);
      }
      return callBack(null, rows);
    }
  );
};

// Department login — validates username+password, returns department info.
exports.loginWithDepartmentAuth = (centerId, username, password, callBack) => {
  railwayDb.query(
    `SELECT department_id, password FROM department_passwords WHERE center_id = ? AND username = ?`,
    [centerId, username],
    (error, rows) => {
      if (error) return callBack(error.message);
      if (!rows.length) return callBack("Invalid username or password.", null, 401);
      compare(password, rows[0].password, (err, match) => {
        if (err) return callBack(err.message);
        if (!match) return callBack("Invalid username or password.", null, 401);
        mainDb.query(
          `SELECT DepartmentID, DepartmentName FROM departments WHERE DepartmentID = ? AND Status = 1`,
          [rows[0].department_id],
          (err2, depts) => {
            if (err2) return callBack(err2.message);
            if (!depts.length) return callBack("Department not found.", null, 404);
            return callBack(null, { DepartmentID: depts[0].DepartmentID, DepartmentName: depts[0].DepartmentName });
          }
        );
      });
    }
  );
};

// ── Class students ────────────────────────────────────────────────────────────

// Students of a class = patients assigned to that department (classId) under
// this center. Pulled live from the main Auticare DB — no manual class roster.
exports.getClassStudents = (classId, centerId, callBack) => {
  mainDb.query(
    `SELECT DISTINCT patients.PatientID AS StudentID, patients.PatientName AS StudentName
     FROM patients
     INNER JOIN therapists ON therapists.TherapistID = patients.TherapistID
     WHERE patients.DepartmentID = ? AND therapists.CenterID = ? AND patients.IsAppCreated = 0
     ORDER BY patients.PatientName`,
    [classId, centerId],
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows);
    }
  );
};

// ── Activity logging ──────────────────────────────────────────────────────────

exports.logActivity = (payload, callBack) => {
  const {
    CenterID, PatientID, ClassID, SessionMode,
    EventType, X, Y, ScreenWidth, ScreenHeight,
    ScenarioID, CompletionPct, DurationMs, GameKey
  } = payload;

  railwayDb.query(
    `INSERT INTO blueroom_events
       (center_id, patient_id, class_id, session_mode, event_type,
        x, y, screen_width, screen_height, scenario_id,
        completion_pct, duration_ms, game_key)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [CenterID, PatientID || null, ClassID || null, SessionMode || "individual",
     EventType, X || null, Y || null, ScreenWidth || null, ScreenHeight || null,
     ScenarioID || null, CompletionPct || null, DurationMs || null, GameKey || null],
    (error, result) => {
      if (error) return callBack(error.message);
      return callBack(null, { id: result.insertId });
    }
  );
};

// ── Activity queries ──────────────────────────────────────────────────────────

exports.getActivitySummary = (centerId, filters, callBack) => {
  const { patientId, classId, from, to, limit = 500 } = filters;
  let where = "WHERE center_id = ?";
  const params = [centerId];
  if (patientId) { where += " AND patient_id = ?"; params.push(patientId); }
  if (classId)   { where += " AND class_id = ?";   params.push(classId); }
  if (from)      { where += " AND ts >= ?";         params.push(from); }
  if (to)        { where += " AND ts <= ?";         params.push(to); }
  params.push(parseInt(limit, 10));

  railwayDb.query(
    `SELECT id, patient_id, class_id, session_mode, event_type,
            x, y, screen_width, screen_height, scenario_id,
            completion_pct, duration_ms, game_key, ts
     FROM blueroom_events ${where}
     ORDER BY ts DESC LIMIT ?`,
    params,
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows);
    }
  );
};

exports.getHeatmapData = (centerId, filters, callBack) => {
  const { patientId, classId, from, to } = filters;
  let where = "WHERE center_id = ? AND event_type = 'touch' AND x IS NOT NULL";
  const params = [centerId];
  if (patientId) { where += " AND patient_id = ?"; params.push(patientId); }
  if (classId)   { where += " AND class_id = ?";   params.push(classId); }
  if (from)      { where += " AND ts >= ?";         params.push(from); }
  if (to)        { where += " AND ts <= ?";         params.push(to); }

  railwayDb.query(
    `SELECT x, y, screen_width, screen_height FROM blueroom_events ${where} LIMIT 5000`,
    params,
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows);
    }
  );
};

exports.getCompletionTimeSeries = (centerId, filters, callBack) => {
  const { patientId, classId, from, to } = filters;
  let where = "WHERE center_id = ? AND event_type = 'scenario_complete'";
  const params = [centerId];
  if (patientId) { where += " AND patient_id = ?"; params.push(patientId); }
  if (classId)   { where += " AND class_id = ?";   params.push(classId); }
  if (from)      { where += " AND ts >= ?";         params.push(from); }
  if (to)        { where += " AND ts <= ?";         params.push(to); }

  railwayDb.query(
    `SELECT scenario_id, game_key, patient_id, completion_pct, duration_ms, ts
     FROM blueroom_events ${where}
     ORDER BY ts ASC LIMIT 2000`,
    params,
    (error, rows) => {
      if (error) return callBack(error.message);
      return callBack(null, rows);
    }
  );
};
