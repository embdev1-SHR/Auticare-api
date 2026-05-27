const db = require("../config/db.config");
const dbAwait = require("../config/dbAwait.config");
const { arrayToNumberPair } = require("../helpers/arrayFunctions");
const promiseDB = db.promise();

exports.skillList = (callBack) => {
  db.query(`SELECT * FROM skills WHERE Status = 1`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.subSkillList = (callBack) => {
  db.query(
    `SELECT sub_skills.SkillID, sub_skills.SubSkillID, sub_skills.SubSkillName FROM skills INNER JOIN sub_skills ON sub_skills.SkillID = skills.SkillID;`,
    // `SELECT sub_skills.SkillID, sub_skills.SubSkillID, sub_skills.SubSkillName FROM skills INNER JOIN sub_skills ON sub_skills.SkillID = skills.SkillID WHERE skills.Status = 1; `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.subSkillListBySkills = (Skills, callBack) => {
  db.query(
    `SELECT sub_skills.SkillID, sub_skills.SubSkillID, sub_skills.SubSkillName FROM skills INNER JOIN sub_skills ON sub_skills.SkillID = skills.SkillID WHERE skills.SkillID IN (${Skills}); `,
    // `SELECT sub_skills.SkillID, sub_skills.SubSkillID, sub_skills.SubSkillName FROM skills INNER JOIN sub_skills ON sub_skills.SkillID = skills.SkillID WHERE skills.SkillID IN (${Skills}) AND skills.Status = 1; `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillContentList = (callBack) => {
  db.query(
    `SELECT content_skill_mappings.SkillID, content_skill_mappings.ContentID, contents.ContentActivityName FROM skills INNER JOIN content_skill_mappings ON content_skill_mappings.SkillID = skills.SkillID INNER JOIN contents ON content_skill_mappings.ContentID = contents.ContentID;`,
    // `SELECT content_skill_mappings.SkillID, content_skill_mappings.ContentID, contents.ContentActivityName FROM skills INNER JOIN content_skill_mappings ON content_skill_mappings.SkillID = skills.SkillID INNER JOIN contents ON content_skill_mappings.ContentID = contents.ContentID WHERE skills.Status = 1 AND contents.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillContentListBySkills = (Skills, callBack) => {
  db.query(
    `SELECT content_skill_mappings.SkillID, content_skill_mappings.ContentID, contents.ContentActivityName FROM skills INNER JOIN content_skill_mappings ON content_skill_mappings.SkillID = skills.SkillID INNER JOIN contents ON content_skill_mappings.ContentID = contents.ContentID WHERE skills.SkillID IN (${Skills});`,
    // `SELECT content_skill_mappings.SkillID, content_skill_mappings.ContentID, contents.ContentActivityName FROM skills INNER JOIN content_skill_mappings ON content_skill_mappings.SkillID = skills.SkillID INNER JOIN contents ON content_skill_mappings.ContentID = contents.ContentID WHERE skills.SkillID IN (${Skills}) AND skills.Status = 1 AND contents.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillDepartmentList = (callBack) => {
  db.query(
    `SELECT department_skill_mappings.SkillID, department_skill_mappings.DepartmentID, departments.DepartmentName FROM skills INNER JOIN department_skill_mappings ON department_skill_mappings.SkillID = skills.SkillID INNER JOIN departments ON department_skill_mappings.DepartmentID = departments.DepartmentID;`,
    // `SELECT department_skill_mappings.SkillID, department_skill_mappings.DepartmentID, departments.DepartmentName FROM skills INNER JOIN department_skill_mappings ON department_skill_mappings.SkillID = skills.SkillID INNER JOIN departments ON department_skill_mappings.DepartmentID = departments.DepartmentID WHERE skills.Status = 1 AND departments.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillDepartmentListBySkills = (Skills, callBack) => {
  db.query(
    `SELECT department_skill_mappings.SkillID, department_skill_mappings.DepartmentID, departments.DepartmentName FROM skills INNER JOIN department_skill_mappings ON department_skill_mappings.SkillID = skills.SkillID INNER JOIN departments ON department_skill_mappings.DepartmentID = departments.DepartmentID WHERE skills.SkillID IN (${Skills});`,
    // `SELECT department_skill_mappings.SkillID, department_skill_mappings.DepartmentID, departments.DepartmentName FROM skills INNER JOIN department_skill_mappings ON department_skill_mappings.SkillID = skills.SkillID INNER JOIN departments ON department_skill_mappings.DepartmentID = departments.DepartmentID WHERE skills.SkillID IN (${Skills}) AND skills.Status = 1 AND departments.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillGoalList = (callBack) => {
  db.query(
    `SELECT goal_skill_mappings.SkillID, goal_skill_mappings.GoalID, therapy_goals.GoalName FROM skills INNER JOIN goal_skill_mappings ON goal_skill_mappings.SkillID = skills.SkillID INNER JOIN therapy_goals ON goal_skill_mappings.GoalID = therapy_goals.GoalID;`,
    // `SELECT goal_skill_mappings.SkillID, goal_skill_mappings.GoalID, therapy_goals.GoalName FROM skills INNER JOIN goal_skill_mappings ON goal_skill_mappings.SkillID = skills.SkillID INNER JOIN therapy_goals ON goal_skill_mappings.GoalID = therapy_goals.GoalID WHERE skills.Status = 1 AND therapy_goals.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillGoalListBySkills = (Skills, callBack) => {
  db.query(
    `SELECT goal_skill_mappings.SkillID, goal_skill_mappings.GoalID, therapy_goals.GoalName FROM skills INNER JOIN goal_skill_mappings ON goal_skill_mappings.SkillID = skills.SkillID INNER JOIN therapy_goals ON goal_skill_mappings.GoalID = therapy_goals.GoalID WHERE skills.SkillID IN (${Skills});`,
    // `SELECT goal_skill_mappings.SkillID, goal_skill_mappings.GoalID, therapy_goals.GoalName FROM skills INNER JOIN goal_skill_mappings ON goal_skill_mappings.SkillID = skills.SkillID INNER JOIN therapy_goals ON goal_skill_mappings.GoalID = therapy_goals.GoalID WHERE skills.SkillID IN (${Skills}) AND skills.Status = 1 AND therapy_goals.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillScaleList = (callBack) => {
  db.query(
    `SELECT scale_skill_mappings.SkillID, scale_skill_mappings.ScaleID, scales.ScaleName FROM skills INNER JOIN scale_skill_mappings ON scale_skill_mappings.SkillID = skills.SkillID INNER JOIN scales ON scale_skill_mappings.ScaleID = scales.ScaleID;`,
    // `SELECT scale_skill_mappings.SkillID, scale_skill_mappings.ScaleID, scales.ScaleName FROM skills INNER JOIN scale_skill_mappings ON scale_skill_mappings.SkillID = skills.SkillID INNER JOIN scales ON scale_skill_mappings.ScaleID = scales.ScaleID WHERE skills.Status = 1 AND scales.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillScaleListByScaleID = (ScaleID, callBack) => {
  db.query(
    `SELECT scale_skill_mappings.SkillID, skills.SkillName FROM skills INNER JOIN scale_skill_mappings ON scale_skill_mappings.SkillID = skills.SkillID AND scale_skill_mappings.ScaleID = ?;`,
    ScaleID,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillScaleListBySkills = (Skills, callBack) => {
  db.query(
    `SELECT scale_skill_mappings.SkillID, scale_skill_mappings.ScaleID, scales.ScaleName FROM skills INNER JOIN scale_skill_mappings ON scale_skill_mappings.SkillID = skills.SkillID INNER JOIN scales ON scale_skill_mappings.ScaleID = scales.ScaleID WHERE skills.SkillID IN (${Skills});`,
    // `SELECT scale_skill_mappings.SkillID, scale_skill_mappings.ScaleID, scales.ScaleName FROM skills INNER JOIN scale_skill_mappings ON scale_skill_mappings.SkillID = skills.SkillID INNER JOIN scales ON scale_skill_mappings.ScaleID = scales.ScaleID WHERE skills.SkillID IN (${Skills}) AND skills.Status = 1 AND scales.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillTherapyList = (callBack) => {
  db.query(
    `SELECT therapy_skill_mappings.SkillID, therapy_skill_mappings.TherapyID, therapy_methods.TherapyName FROM skills INNER JOIN therapy_skill_mappings ON therapy_skill_mappings.SkillID = skills.SkillID INNER JOIN therapy_methods ON therapy_skill_mappings.TherapyID = therapy_methods.TherapyID;`,
    // `SELECT therapy_skill_mappings.SkillID, therapy_skill_mappings.TherapyID, therapy_methods.TherapyName FROM skills INNER JOIN therapy_skill_mappings ON therapy_skill_mappings.SkillID = skills.SkillID INNER JOIN therapy_methods ON therapy_skill_mappings.TherapyID = therapy_methods.TherapyID WHERE skills.Status = 1 AND therapy_methods.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillTherapyListBySkills = (Skills, callBack) => {
  db.query(
    `SELECT therapy_skill_mappings.SkillID, therapy_skill_mappings.TherapyID, therapy_methods.TherapyName FROM skills INNER JOIN therapy_skill_mappings ON therapy_skill_mappings.SkillID = skills.SkillID INNER JOIN therapy_methods ON therapy_skill_mappings.TherapyID = therapy_methods.TherapyID WHERE skills.SkillID IN (${Skills});`,
    // `SELECT therapy_skill_mappings.SkillID, therapy_skill_mappings.TherapyID, therapy_methods.TherapyName FROM skills INNER JOIN therapy_skill_mappings ON therapy_skill_mappings.SkillID = skills.SkillID INNER JOIN therapy_methods ON therapy_skill_mappings.TherapyID = therapy_methods.TherapyID WHERE skills.SkillID IN (${Skills}) AND skills.Status = 1 AND therapy_methods.Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillListByClientUserID = (UserID, callBack) => {
  db.query(
    `SELECT skills.* FROM clients INNER JOIN skills ON clients.UserID = skills.Create_By WHERE clients.UserID = ? AND skills.Status = 1 UNION SELECT skills.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN skills ON centers.UserID = skills.Create_By WHERE clients.UserID = ? AND skills.Status = 1 UNION SELECT skills.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE clients.UserID = ? AND skills.Status = 1 UNION SELECT * FROM skills WHERE Type = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillCountByClientUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT SUM(Skills) AS SkillCount FROM ( SELECT COUNT(*) AS Skills FROM clients INNER JOIN skills ON clients.UserID = skills.Create_By WHERE clients.UserID = ? AND skills.Status = 1 UNION SELECT COUNT(*) AS Skills FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN skills ON centers.UserID = skills.Create_By WHERE clients.UserID = ? AND skills.Status = 1 UNION SELECT COUNT(*) AS Skills FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE clients.UserID = ? AND skills.Status = 1 ) AS subquery;`,
    [UserID, UserID, UserID]
  );
  return rows;
};

exports.skillListByCenterUserID = (UserID, callBack) => {
  db.query(
    `SELECT skills.* FROM centers INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN skills ON clients.UserID = skills.Create_By WHERE centers.UserID = ? AND skills.Status = 1 UNION SELECT skills.* FROM centers INNER JOIN skills ON centers.UserID = skills.Create_By WHERE centers.UserID = ? AND skills.Status = 1 UNION SELECT skills.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE centers.UserID = ? AND skills.Status = 1 UNION SELECT * FROM skills WHERE Type = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillCountByCenterUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT SUM(Skills) AS SkillCount FROM ( SELECT COUNT(*) AS Skills FROM centers INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN skills ON clients.UserID = skills.Create_By WHERE centers.UserID = ? AND skills.Status = 1 UNION SELECT COUNT(*) AS Skills FROM centers INNER JOIN skills ON centers.UserID = skills.Create_By WHERE centers.UserID = ? AND skills.Status = 1 UNION SELECT COUNT(*) AS Skills FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE centers.UserID = ? AND skills.Status = 1 ) AS subquery;`,
    [UserID, UserID, UserID]
  );
  return rows;
};

exports.skillListByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT skills.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN skills ON clients.UserID = skills.Create_By WHERE therapists.UserID = ? AND skills.Status = 1 UNION SELECT skills.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN skills ON centers.UserID = skills.Create_By WHERE therapists.UserID = ? AND skills.Status = 1 UNION SELECT skills.* FROM therapists INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE therapists.UserID = ? AND skills.Status = 1 UNION SELECT * FROM skills WHERE Type = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillCountByTherapistUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT SUM(Skills) AS SkillCount FROM ( SELECT COUNT(*) AS Skills FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN skills ON clients.UserID = skills.Create_By WHERE therapists.UserID = ? AND skills.Status = 1 UNION SELECT COUNT(*) AS Skills FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN skills ON centers.UserID = skills.Create_By WHERE therapists.UserID = ? AND skills.Status = 1 UNION SELECT COUNT(*) AS Skills FROM therapists INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE therapists.UserID = ? AND skills.Status = 1 ) AS subquery;`,
    [UserID, UserID, UserID]
  );
  return rows;
};

exports.skillDetails = (SkillID, callBack) => {
  db.query(`SELECT * FROM skills WHERE SkillID = ? AND Status = 1;`, [SkillID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.skillDetailsBySkillIDNClientUserID = (data, callBack) => {
  db.query(
    `SELECT skills.* FROM clients INNER JOIN skills ON clients.UserID = skills.Create_By WHERE clients.UserID = ? AND skills.Status = 1 AND skills.SkillID = ? UNION SELECT skills.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN skills ON centers.UserID = skills.Create_By WHERE clients.UserID = ? AND skills.Status = 1 AND skills.SkillID = ? UNION SELECT skills.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE clients.UserID = ? AND skills.Status = 1 AND skills.SkillID = ? UNION SELECT * FROM skills WHERE Type = "Default" AND Status = 1 AND SkillID = ?;`,
    [data.UserID, data.SkillID, data.UserID, data.SkillID, data.UserID, data.SkillID, data.SkillID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillDetailsBySkillIDNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT skills.* FROM centers INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN skills ON clients.UserID = skills.Create_By WHERE centers.UserID = ? AND skills.Status = 1 AND skills.SkillID = ? UNION SELECT skills.* FROM centers INNER JOIN skills ON centers.UserID = skills.Create_By WHERE centers.UserID = ? AND skills.Status = 1 AND skills.SkillID = ? UNION SELECT skills.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE centers.UserID = ? AND skills.Status = 1 AND skills.SkillID = ? UNION SELECT * FROM skills WHERE Type = "Default" AND Status = 1 AND SkillID = ?;`,
    [data.UserID, data.SkillID, data.UserID, data.SkillID, data.UserID, data.SkillID, data.SkillID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillDetailsBySkillIDNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT skills.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN skills ON clients.UserID = skills.Create_By WHERE therapists.UserID = ? AND skills.Status = 1 AND skills.SkillID = ? UNION SELECT skills.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN skills ON centers.UserID = skills.Create_By WHERE therapists.UserID = ? AND skills.Status = 1 AND skills.SkillID = ? UNION SELECT skills.* FROM therapists INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE therapists.UserID = ? AND skills.Status = 1 AND skills.SkillID = ? UNION SELECT * FROM skills WHERE Type = "Default" AND Status = 1 AND SkillID = ?;`,
    [data.UserID, data.SkillID, data.UserID, data.SkillID, data.UserID, data.SkillID, data.SkillID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillSearch = (data, callBack) => {
  db.query(`SELECT * FROM skills WHERE SkillName LIKE '%${data.SkillName}%' AND Status = 1 `, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.skillSearchBySkillNameNClientUserID = (data, callBack) => {
  db.query(
    `SELECT skills.* FROM clients INNER JOIN skills ON clients.UserID = skills.Create_By WHERE clients.UserID = ${data.UserID} AND skills.Status = 1 AND skills.SkillName LIKE '%${data.SkillName}%' UNION SELECT skills.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN skills ON centers.UserID = skills.Create_By WHERE clients.UserID = ${data.UserID} AND skills.Status = 1 AND skills.SkillName LIKE '%${data.SkillName}%' UNION SELECT skills.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE clients.UserID = ${data.UserID} AND skills.Status = 1 AND skills.SkillName LIKE '%${data.SkillName}%' UNION SELECT * FROM skills WHERE Type = "Default" AND Status = 1 AND SkillName LIKE '%${data.SkillName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillSearchBySkillNameNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT skills.* FROM centers INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN skills ON clients.UserID = skills.Create_By WHERE centers.UserID = ${data.UserID} AND skills.Status = 1 AND skills.SkillName LIKE '%${data.SkillName}%' UNION SELECT skills.* FROM centers INNER JOIN skills ON centers.UserID = skills.Create_By WHERE centers.UserID = ${data.UserID} AND skills.Status = 1 AND skills.SkillName LIKE '%${data.SkillName}%' UNION SELECT skills.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE centers.UserID = ${data.UserID} AND skills.Status = 1 AND skills.SkillName LIKE '%${data.SkillName}%' UNION SELECT * FROM skills WHERE Type = "Default" AND Status = 1 AND SkillName LIKE '%${data.SkillName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillSearchBySkillNameNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT skills.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN skills ON clients.UserID = skills.Create_By WHERE therapists.UserID = ${data.UserID} AND skills.Status = 1 AND skills.SkillName LIKE '%${data.SkillName}%' UNION SELECT skills.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN skills ON centers.UserID = skills.Create_By WHERE therapists.UserID = ${data.UserID} AND skills.Status = 1 AND skills.SkillName LIKE '%${data.SkillName}%' UNION SELECT skills.* FROM therapists INNER JOIN skills ON therapists.UserID = skills.Create_By WHERE therapists.UserID = ${data.UserID} AND skills.Status = 1 AND skills.SkillName LIKE '%${data.SkillName}%' UNION SELECT * FROM skills WHERE Type = "Default" AND Status = 1 AND SkillName LIKE '%${data.SkillName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.skillCreate = async (data, callBack) => {
  const connection = await dbAwait.awaitGetConnection();
  try {
    await connection.awaitBeginTransaction();
    const skillResult = await connection.awaitQuery(
      `INSERT INTO skills ( SkillName, ReferenceVideoURL, Type, Create_By ) VALUES ( ?, ?, ?, ? )`,
      [data.SkillName, data.ReferenceVideoURL, data.Type, data.UserID]
    );
    const SkillID = skillResult?.insertId;
    const subSkills = [];
    const arraySubSkills = data?.SubSkills;
    if (arraySubSkills?.length) {
      for (let index = 0; index < arraySubSkills.length; index++) {
        const element = arraySubSkills[index];
        subSkills.push([SkillID, element, data.UserID]);
      }
      await connection.awaitQuery(`INSERT INTO sub_skills ( SkillID, SubSkillName, Create_By ) VALUES ?`, [subSkills]);
    }
    const scaleIDs = [];
    const arrayScaleIDs = data?.ScaleIDs;
    if (arrayScaleIDs?.length) {
      for (let index = 0; index < arrayScaleIDs.length; index++) {
        const element = arrayScaleIDs[index];
        scaleIDs.push([SkillID, element, data.UserID]);
      }
      await connection.awaitQuery(`INSERT INTO scale_skill_mappings ( SkillID, ScaleID, Create_By ) VALUES ?`, [
        scaleIDs,
      ]);
    }
    const departmentIDs = [];
    const arrayDepartmentIDs = data?.DepartmentIDs;
    if (arrayDepartmentIDs?.length) {
      for (let index = 0; index < arrayDepartmentIDs.length; index++) {
        const element = arrayDepartmentIDs[index];
        departmentIDs.push([SkillID, element, data.UserID]);
      }
      await connection.awaitQuery(
        `INSERT INTO department_skill_mappings ( SkillID, DepartmentID, Create_By ) VALUES ?`,
        [departmentIDs]
      );
    }
    const goalIDs = [];
    const arrayGoalIDs = data?.GoalIDs;
    if (arrayGoalIDs?.length) {
      for (let index = 0; index < arrayGoalIDs.length; index++) {
        const element = arrayGoalIDs[index];
        goalIDs.push([SkillID, element, data.UserID]);
      }
      await connection.awaitQuery(`INSERT INTO goal_skill_mappings ( SkillID, GoalID, Create_By ) VALUES ?`, [goalIDs]);
    }
    const activityIDs = [];
    const arrayActivityIDs = data?.ActivityIDs;
    if (arrayActivityIDs?.length) {
      for (let index = 0; index < arrayActivityIDs.length; index++) {
        const element = arrayActivityIDs[index];
        activityIDs.push([SkillID, element, data.UserID]);
      }
      await connection.awaitQuery(`INSERT INTO content_skill_mappings ( SkillID, ContentID, Create_By ) VALUES ?`, [
        activityIDs,
      ]);
    }
    const therapyIDs = [];
    const arrayTherapyIDs = data?.TherapyIDs;
    if (arrayTherapyIDs?.length) {
      for (let index = 0; index < arrayTherapyIDs.length; index++) {
        const element = arrayTherapyIDs[index];
        therapyIDs.push([SkillID, element, data.UserID]);
      }
      await connection.awaitQuery(`INSERT INTO therapy_skill_mappings ( SkillID, TherapyID, Create_By ) VALUES ?`, [
        therapyIDs,
      ]);
    }
    await connection.awaitCommit();
    await connection.release();
    if (skillResult.affectedRows >= 1) {
      return callBack(null, "Skill created successfully");
    } else {
      return callBack("Failed to create skill", null, 500);
    }
  } catch (error) {
    console.warn(error);
    connection.rollback(async () => {
      await connection.release();
      return callBack(error.message);
    });
  }
};

exports.skillUpdate = async (data, callBack) => {
  const connection = await dbAwait.awaitGetConnection();
  try {
    await connection.awaitBeginTransaction();
    const skillResult = await connection.awaitQuery(
      `UPDATE skills SET SkillName = ?, ReferenceVideoURL = ?, Status = ?, Update_By = ? WHERE SkillID = ? `,
      [data.SkillName, data.ReferenceVideoURL, data.Status ? 1 : 0, data.UserID, data.SkillID]
    );
    const SkillID = data.SkillID;
    await skillMappingUpdates(data, SkillID, connection);
    await connection.awaitCommit();
    await connection.release();
    if (skillResult.affectedRows >= 1) {
      return callBack(null, "Skill updated successfully");
    } else {
      return callBack("Skill not found", null, 404);
    }
  } catch (error) {
    console.warn(error);
    connection.rollback(async () => {
      await connection.release();
      return callBack(error.message);
    });
  }
};

exports.skillUpdateByCreate_By = async (data, callBack) => {
  const connection = await dbAwait.awaitGetConnection();
  try {
    await connection.awaitBeginTransaction();
    const skillResult = await connection.awaitQuery(
      `UPDATE skills SET SkillName = ?, ReferenceVideoURL = ?, Status = ?, Update_By = ? WHERE SkillID = ? AND Create_By = ? `,
      [data.SkillName, data.ReferenceVideoURL, data.Status, data.UserID, data.SkillID, data.UserID]
    );
    const SkillID = data.SkillID;
    await skillMappingUpdates(data, SkillID, connection);
    await connection.awaitCommit();
    await connection.release();
    if (skillResult.affectedRows >= 1) {
      return callBack(null, "Skill updated successfully");
    } else {
      return callBack("Skill not found", null, 404);
    }
  } catch (error) {
    console.warn(error);
    connection.rollback(async () => {
      await connection.release();
      return callBack(error.message);
    });
  }
};

exports.skillDelete = (SkillID, callBack) => {
  db.query(`UPDATE skills SET Status = 0 WHERE SkillID = ? `, [SkillID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else if (results.affectedRows == 1) {
      return callBack(null, "Skill deleted successfully");
    } else {
      return callBack("Skill not found", null, 404);
    }
  });
};

exports.skillDeleteBySkillIDNClientUserID = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `UPDATE skills INNER JOIN clients ON skills.Create_By = clients.UserID SET skills.Status = 0 WHERE clients.UserID = ? AND skills.SkillID = ? `,
            [data.UserID, data.SkillID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE skills INNER JOIN centers ON skills.Create_By = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET skills.Status = 0 WHERE clients.UserID = ? AND skills.SkillID = ? `,
                  [data.UserID, data.SkillID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE skills INNER JOIN therapists ON skills.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET skills.Status = 0 WHERE clients.UserID = ? AND skills.SkillID = ? `,
                        [data.UserID, data.SkillID],
                        (error, therapistsResult) => {
                          if (error) {
                            connection.rollback(() => {
                              connection.release();
                              return callBack(error.message);
                            });
                          } else
                            connection.commit((error) => {
                              if (error) {
                                connection.rollback(() => {
                                  connection.release();
                                  return callBack(error.message);
                                });
                              } else connection.release();
                              if (
                                clientsResult.affectedRows >= 1 ||
                                centersResult.affectedRows >= 1 ||
                                therapistsResult.affectedRows >= 1
                              ) {
                                return callBack(null, "Skill deleted successfully");
                              } else {
                                return callBack("Skill not found", null, 404);
                              }
                            });
                        }
                      );
                  }
                );
            }
          );
      });
    /* End transaction */
  });
};

exports.skillDeleteBySkillIDNCenterUserID = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else
          connection.query(
            `UPDATE skills INNER JOIN centers ON skills.Create_By = centers.UserID SET skills.Status = 0 WHERE centers.UserID = ? AND skills.SkillID = ? `,
            [data.UserID, data.SkillID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE skills INNER JOIN therapists ON skills.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET skills.Status = 0 WHERE centers.UserID = ? AND skills.SkillID = ? `,
                  [data.UserID, data.SkillID],
                  (error, therapistsResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.commit((error) => {
                        if (error) {
                          connection.rollback(() => {
                            connection.release();
                            return callBack(error.message);
                          });
                        } else connection.release();
                        if (centersResult.affectedRows >= 1 || therapistsResult.affectedRows >= 1) {
                          return callBack(null, "Skill deleted successfully");
                        } else {
                          return callBack("Skill not found", null, 404);
                        }
                      });
                  }
                );
            }
          );
      });
    /* End transaction */
  });
};

exports.skillDeleteBySkillIDNTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE skills INNER JOIN therapists ON skills.Create_By = therapists.UserID SET skills.Status = 0 WHERE skills.SkillID = ? AND therapists.UserID = ? `,
    [data.SkillID, data.UserID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Skill deleted successfully");
        } else {
          return callBack("Skill not found", null, 404);
        }
      }
    }
  );
};

exports.getSkillByCreate_ByNSkillId = (data, callBack) => {
  db.query(
    `SELECT * from skills where Create_By = ? AND SkillID = ? `,
    [data.UserID, data.SkillID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

async function skillMappingUpdates(data, SkillID, connection) {
  const subSkills = [];
  const arraySubSkills = data?.AddSubSkills;
  if (arraySubSkills?.length) {
    for (let index = 0; index < arraySubSkills.length; index++) {
      const element = arraySubSkills[index];
      subSkills.push([SkillID, element, data.UserID]);
    }
    await connection.awaitQuery(`INSERT INTO sub_skills ( SkillID, SubSkillName, Create_By ) VALUES ?`, [subSkills]);
  }
  if (data?.RemoveSubSkills?.length) {
    await connection.awaitQuery(
      `DELETE FROM sub_skills WHERE (SubSkillID, SkillID) IN (${arrayToNumberPair(data?.RemoveSubSkills, SkillID)})`
    );
  }
  const scaleIDs = [];
  const arrayScaleIDs = data?.AddScaleIDs;
  if (arrayScaleIDs?.length) {
    for (let index = 0; index < arrayScaleIDs.length; index++) {
      const element = arrayScaleIDs[index];
      scaleIDs.push([SkillID, element, data.UserID]);
    }
    await connection.awaitQuery(`INSERT INTO scale_skill_mappings ( SkillID, ScaleID, Create_By ) VALUES ?`, [
      scaleIDs,
    ]);
  }
  if (data?.RemoveScaleIDs?.length) {
    await connection.awaitQuery(
      `DELETE FROM scale_skill_mappings WHERE (ScaleID, SkillID) IN (${arrayToNumberPair(
        data?.RemoveScaleIDs,
        SkillID
      )})`
    );
  }

  const departmentIDs = [];
  const arrayDepartmentIDs = data?.AddDepartmentIDs;
  if (arrayDepartmentIDs?.length) {
    for (let index = 0; index < arrayDepartmentIDs.length; index++) {
      const element = arrayDepartmentIDs[index];
      departmentIDs.push([SkillID, element, data.UserID]);
    }
    await connection.awaitQuery(`INSERT INTO department_skill_mappings ( SkillID, DepartmentID, Create_By ) VALUES ?`, [
      departmentIDs,
    ]);
  }
  if (data?.RemoveDepartmentIDs?.length) {
    await connection.awaitQuery(
      `DELETE FROM department_skill_mappings WHERE (DepartmentID, SkillID) IN (${arrayToNumberPair(
        data?.RemoveDepartmentIDs,
        SkillID
      )})`
    );
  }

  const goalIDs = [];
  const arrayGoalIDs = data?.AddGoalIDs;
  if (arrayGoalIDs?.length) {
    for (let index = 0; index < arrayGoalIDs.length; index++) {
      const element = arrayGoalIDs[index];
      goalIDs.push([SkillID, element, data.UserID]);
    }
    await connection.awaitQuery(`INSERT INTO goal_skill_mappings ( SkillID, GoalID, Create_By ) VALUES ?`, [goalIDs]);
  }
  if (data?.RemoveGoalIDs?.length) {
    await connection.awaitQuery(
      `DELETE FROM goal_skill_mappings WHERE (GoalID, SkillID) IN (${arrayToNumberPair(data?.RemoveGoalIDs, SkillID)})`
    );
  }

  const activityIDs = [];
  const arrayActivityIDs = data?.AddActivityIDs;
  if (arrayActivityIDs?.length) {
    for (let index = 0; index < arrayActivityIDs.length; index++) {
      const element = arrayActivityIDs[index];
      activityIDs.push([SkillID, element, data.UserID]);
    }
    await connection.awaitQuery(`INSERT INTO content_skill_mappings ( SkillID, ContentID, Create_By ) VALUES ?`, [
      activityIDs,
    ]);
  }
  if (data?.RemoveActivityIDs?.length) {
    await connection.awaitQuery(
      `DELETE FROM content_skill_mappings WHERE (ContentID, SkillID) IN (${arrayToNumberPair(
        data?.RemoveActivityIDs,
        SkillID
      )})`
    );
  }

  const therapyIDs = [];
  const arrayTherapyIDs = data?.AddTherapyIDs;
  if (arrayTherapyIDs?.length) {
    for (let index = 0; index < arrayTherapyIDs.length; index++) {
      const element = arrayTherapyIDs[index];
      therapyIDs.push([SkillID, element, data.UserID]);
    }
    await connection.awaitQuery(`INSERT INTO therapy_skill_mappings ( SkillID, TherapyID, Create_By ) VALUES ?`, [
      therapyIDs,
    ]);
  }
  if (data?.RemoveTherapyIDs?.length) {
    console.warn(data?.RemoveTherapyIDs);
    await connection.awaitQuery(
      `DELETE FROM therapy_skill_mappings WHERE (TherapyID, SkillID) IN (${arrayToNumberPair(
        data?.RemoveTherapyIDs,
        SkillID
      )})`
    );
  }
}
