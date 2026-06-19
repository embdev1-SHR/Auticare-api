const db = require("../config/db.config");
const promiseDB = db.promise();
const dbAwait = require("../config/dbAwait.config");

exports.scaleList = (callBack) => {
  db.query(`SELECT * FROM scales WHERE Status = 1`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.scaleListByClientUserID = (UserID, callBack) => {
  db.query(
    `SELECT scales.* FROM clients INNER JOIN scales ON clients.UserID = scales.Create_By WHERE clients.UserID = ? AND scales.Status = 1 UNION SELECT scales.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN scales ON centers.UserID = scales.Create_By WHERE clients.UserID = ? AND scales.Status = 1 UNION SELECT scales.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE clients.UserID = ? AND scales.Status = 1 UNION SELECT scales.* FROM scales WHERE ScaleType = "Default" AND Status = 1 `,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleCountByClientUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT SUM(Scales) AS ScaleCount FROM ( SELECT COUNT(*) AS Scales FROM clients INNER JOIN scales ON clients.UserID = scales.Create_By WHERE clients.UserID = ? AND scales.Status = 1 UNION SELECT COUNT(*) AS Scales FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN scales ON centers.UserID = scales.Create_By WHERE clients.UserID = ? AND scales.Status = 1 UNION SELECT COUNT(*) AS Scales FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE clients.UserID = ? AND scales.Status = 1 ) AS subquery;`,
    [UserID, UserID, UserID]
  );
  return rows;
};

exports.scaleListByCenterUserID = (UserID, callBack) => {
  db.query(
    `SELECT scales.* FROM centers INNER JOIN scales ON centers.UserID = scales.Create_By WHERE centers.UserID = ? AND scales.Status = 1 UNION SELECT scales.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE centers.UserID = ? AND scales.Status = 1 UNION SELECT scales.* FROM scales WHERE ScaleType = "Default" AND Status = 1`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleCountByCenterUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT SUM(Scales) AS ScaleCount FROM ( SELECT COUNT(*) AS Scales FROM centers INNER JOIN scales ON centers.UserID = scales.Create_By WHERE centers.UserID = ? AND scales.Status = 1 UNION SELECT COUNT(*) AS Scales FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE centers.UserID = ? AND scales.Status = 1 ) AS subquery;`,
    [UserID, UserID, UserID]
  );
  return rows;
};

exports.scaleListByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT scales.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN scales ON clients.UserID = scales.Create_By WHERE therapists.UserID = ? AND scales.Status = 1 UNION SELECT scales.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN scales ON centers.UserID = scales.Create_By WHERE therapists.UserID = ? AND scales.Status = 1 UNION SELECT scales.* FROM therapists INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE therapists.UserID = ? AND scales.Status = 1 UNION SELECT * FROM scales WHERE ScaleType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleCountByTherapistUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT COUNT(*) AS ScaleCount FROM therapists INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE therapists.UserID = ? AND scales.Status = 1;`,
    [UserID]
  );
  return rows;
};

exports.scaleScreeningQuestionList = (ScaleID, callBack) => {
  db.query(
    `SELECT categories.CategoryName, screen_metrics.* FROM screen_metrics INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID WHERE screen_metrics.ScaleID = ?`,
    [ScaleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleAssessmentQuestionList = (ScaleID, callBack) => {
  db.query(
    `SELECT categories.CategoryName, categories.CategoryLabel, assessment_metrics.* FROM assessment_metrics INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID WHERE assessment_metrics.ScaleID = ?`,
    [ScaleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleAssessmentQuestionListAsync = async (ScaleID) => {
  const [rows] = await promiseDB.query(
    `SELECT categories.CategoryName, categories.CategoryLabel, assessment_metrics.* FROM assessment_metrics INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID WHERE assessment_metrics.ScaleID = ?`,
    [ScaleID]
  );
  return rows;
};

exports.scaleScreeningQuestionListByScaleIDNClientUserID = (data, callBack) => {
  db.query(
    `SELECT categories.CategoryName, screen_metrics.* FROM clients INNER JOIN screen_metrics ON clients.UserID = screen_metrics.Create_By INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID WHERE clients.UserID = ? AND screen_metrics.ScaleID = ? UNION SELECT categories.CategoryName, screen_metrics.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN screen_metrics ON centers.UserID = screen_metrics.Create_By INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID WHERE clients.UserID = ? AND screen_metrics.ScaleID = ? UNION SELECT categories.CategoryName, screen_metrics.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN screen_metrics ON therapists.UserID = screen_metrics.Create_By INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID WHERE clients.UserID = ? AND screen_metrics.ScaleID = ? UNION SELECT categories.CategoryName, screen_metrics.* FROM screen_metrics INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID INNER JOIN scales ON scales.ScaleID = screen_metrics.ScaleID WHERE screen_metrics.ScaleID = ? AND scales.ScaleType = "Default"`,
    [data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.ScaleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleAssessmentQuestionListByScaleIDNClientUserID = (data, callBack) => {
  db.query(
    `SELECT categories.CategoryName, categories.CategoryLabel, assessment_metrics.* FROM clients INNER JOIN assessment_metrics ON clients.UserID = assessment_metrics.Create_By INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID WHERE clients.UserID = ? AND assessment_metrics.ScaleID = ? UNION SELECT categories.CategoryName, categories.CategoryLabel, assessment_metrics.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN assessment_metrics ON centers.UserID = assessment_metrics.Create_By INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID WHERE clients.UserID = ? AND assessment_metrics.ScaleID = ? UNION SELECT categories.CategoryName, categories.CategoryLabel, assessment_metrics.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN assessment_metrics ON therapists.UserID = assessment_metrics.Create_By INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID WHERE clients.UserID = ? AND assessment_metrics.ScaleID = ? UNION SELECT categories.CategoryName, categories.CategoryLabel, assessment_metrics.* FROM assessment_metrics INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID INNER JOIN scales ON scales.ScaleID = assessment_metrics.ScaleID WHERE assessment_metrics.ScaleID = ? AND scales.ScaleType = "Default"`,
    [data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.ScaleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleScreeningQuestionListByScaleIDNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT categories.CategoryName, screen_metrics.* FROM screen_metrics INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID INNER JOIN centers ON centers.UserID = screen_metrics.Create_By WHERE centers.UserID = ? AND screen_metrics.ScaleID = ? UNION SELECT categories.CategoryName, screen_metrics.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN screen_metrics ON therapists.UserID = screen_metrics.Create_By INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID WHERE centers.UserID = ? AND screen_metrics.ScaleID = ? UNION SELECT categories.CategoryName, screen_metrics.* FROM screen_metrics INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID INNER JOIN scales ON scales.ScaleID = screen_metrics.ScaleID WHERE screen_metrics.ScaleID = ? AND scales.ScaleType = "Default" `,
    [data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.ScaleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleAssessmentQuestionListByScaleIDNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT categories.CategoryName, categories.CategoryLabel, assessment_metrics.* FROM assessment_metrics INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID INNER JOIN centers ON centers.UserID = assessment_metrics.Create_By WHERE centers.UserID = ? AND assessment_metrics.ScaleID = ? UNION SELECT categories.CategoryName, categories.CategoryLabel, assessment_metrics.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN assessment_metrics ON therapists.UserID = assessment_metrics.Create_By INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID WHERE centers.UserID = ? AND assessment_metrics.ScaleID = ? UNION SELECT categories.CategoryName, categories.CategoryLabel, assessment_metrics.* FROM assessment_metrics INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID INNER JOIN scales ON scales.ScaleID = assessment_metrics.ScaleID WHERE assessment_metrics.ScaleID = ? AND scales.ScaleType = "Default" `,
    [data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.ScaleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleScreeningQuestionListByScaleIDNTherapistUserID = (data, callBack) => {
  db.query(
    ` SELECT categories.CategoryName, screen_metrics.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN screen_metrics ON clients.UserID = screen_metrics.Create_By INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID WHERE therapists.UserID = ? AND screen_metrics.ScaleID = ? UNION SELECT categories.CategoryName, screen_metrics.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN screen_metrics ON centers.UserID = screen_metrics.Create_By INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID WHERE therapists.UserID = ? AND screen_metrics.ScaleID = ? UNION SELECT categories.CategoryName, screen_metrics.* FROM therapists INNER JOIN screen_metrics ON therapists.UserID = screen_metrics.Create_By INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID WHERE therapists.UserID = ? AND screen_metrics.ScaleID = ? UNION SELECT categories.CategoryName, screen_metrics.* FROM screen_metrics INNER JOIN categories ON screen_metrics.CategoryID = categories.CategoryID INNER JOIN scales ON scales.ScaleID = screen_metrics.ScaleID WHERE screen_metrics.ScaleID = ? AND scales.ScaleType = "Default";`,
    [data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.ScaleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleAssessmentQuestionListByScaleIDNTherapistUserID = async (data) => {
  const [rows] = await promiseDB.query(
    `SELECT categories.CategoryName, assessment_metrics.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN assessment_metrics ON clients.UserID = assessment_metrics.Create_By INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID WHERE therapists.UserID = ? AND assessment_metrics.ScaleID = ? UNION SELECT categories.CategoryName, assessment_metrics.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN assessment_metrics ON centers.UserID = assessment_metrics.Create_By INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID WHERE therapists.UserID = ? AND assessment_metrics.ScaleID = ? UNION SELECT categories.CategoryName, assessment_metrics.* FROM therapists INNER JOIN assessment_metrics ON therapists.UserID = assessment_metrics.Create_By INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID WHERE therapists.UserID = ? AND assessment_metrics.ScaleID = ? UNION SELECT categories.CategoryName, assessment_metrics.* FROM assessment_metrics INNER JOIN categories ON assessment_metrics.CategoryID = categories.CategoryID INNER JOIN scales ON scales.ScaleID = assessment_metrics.ScaleID WHERE assessment_metrics.ScaleID = ? AND scales.ScaleType = "Default"`,
    [data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.ScaleID]
  );
  return rows;
};

exports.scaleDetails = (ScaleID, callBack) => {
  db.query(`SELECT * FROM scales WHERE ScaleID = ? AND Status = 1`, [ScaleID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.scaleDetailsByScaleIDNClientUserID = (data, callBack) => {
  db.query(
    `SELECT scales.* FROM clients INNER JOIN scales ON clients.UserID = scales.Create_By WHERE clients.UserID = ? AND scales.Status = 1 AND scales.ScaleID = ? UNION SELECT scales.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN scales ON centers.UserID = scales.Create_By WHERE clients.UserID = ? AND scales.Status = 1 AND scales.ScaleID = ? UNION SELECT scales.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE clients.UserID = ? AND scales.Status = 1 AND scales.ScaleID = ? UNION SELECT * FROM scales WHERE ScaleType = "Default" AND Status = 1 AND ScaleID = ?`,
    [data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.ScaleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleDetailsByScaleIDNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT scales.* FROM centers INNER JOIN scales ON centers.UserID = scales.Create_By WHERE centers.UserID = ? AND scales.ScaleID = ? AND scales.Status = 1 UNION SELECT scales.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE centers.UserID = ? AND scales.ScaleID = ? AND scales.Status = 1 UNION SELECT * FROM scales WHERE ScaleType = "Default" AND Status = 1 AND ScaleID = ?`,
    [data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.ScaleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleDetailsByScaleIDNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT scales.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID INNER JOIN scales ON clients.UserID = scales.Create_By WHERE therapists.UserID = ? AND scales.Status = 1 AND scales.ScaleID = ? UNION SELECT scales.* FROM therapists INNER JOIN centers ON centers.CenterID = therapists.CenterID INNER JOIN scales ON centers.UserID = scales.Create_By WHERE therapists.UserID = ? AND scales.Status = 1 AND scales.ScaleID = ? UNION SELECT scales.* FROM therapists INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE therapists.UserID = ? AND scales.Status = 1 AND scales.ScaleID = ? UNION SELECT * FROM scales WHERE ScaleType = "Default" AND Status = 1 AND ScaleID = ?`,
    [data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.UserID, data.ScaleID, data.ScaleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleSearch = (data, callBack) => {
  db.query(
    `SELECT * FROM scales WHERE ScaleName LIKE '%${data.ScaleName}%' AND Status = 1 UNION SELECT * FROM scales WHERE ScaleName LIKE '%${data.ScaleName}%' AND ScaleType = "Default" AND Status = 1`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleSearchByScaleNameNClientUserID = (data, callBack) => {
  db.query(
    `SELECT scales.* FROM clients INNER JOIN scales ON clients.UserID = scales.Create_By WHERE clients.UserID = ${data.UserID} AND scales.ScaleName LIKE '%${data.ScaleName}%' AND scales.Status = 1 UNION SELECT scales.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN scales ON centers.UserID = scales.Create_By WHERE clients.UserID = ${data.UserID} AND scales.ScaleName LIKE '%${data.ScaleName}%' AND scales.Status = 1 UNION SELECT scales.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE clients.UserID = ${data.UserID} AND scales.ScaleName LIKE '%${data.ScaleName}%' AND scales.Status = 1 UNION SELECT * FROM scales WHERE ScaleName LIKE '%${data.ScaleName}%' AND ScaleType = "Default" AND Status = 1`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleSearchByScaleNameNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT scales.* FROM centers INNER JOIN scales ON centers.UserID = scales.Create_By WHERE centers.UserID = ${data.UserID} AND scales.ScaleName LIKE '%${data.ScaleName}%' AND scales.Status = 1 UNION SELECT scales.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE centers.UserID = ${data.UserID} AND scales.ScaleName LIKE '%${data.ScaleName}%' AND scales.Status = 1 UNION SELECT * FROM scales WHERE ScaleName LIKE '%${data.ScaleName}%' AND ScaleType = "Default" AND Status = 1 `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleSearchByScaleNameNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT scales.* FROM therapists INNER JOIN scales ON therapists.UserID = scales.Create_By WHERE therapists.UserID = ${data.UserID} AND scales.ScaleName LIKE '%${data.ScaleName}%' AND scales.Status = 1 UNION SELECT * FROM scales WHERE ScaleName LIKE '%${data.ScaleName}%' AND ScaleType = "Default" AND Status = 1 `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.scaleCreate = async (data, callBack) => {
  const connection = await promiseDB.getConnection();
  try {
    await connection.beginTransaction();
    const [scaleResult] = await connection.query(
      `INSERT INTO scales ( ScaleName, Accreditation, ScaleCategory, ScaleMetric, ScaleMetricType, ScaleType, Create_By ) VALUES ( ?, ?, ?, ?, ?, ?, ? )`,
      [
        data.ScaleName,
        data.Accreditation,
        data.ScaleCategory,
        data.ScaleMetric,
        data.ScaleMetricType,
        data.ScaleType,
        data.UserID,
      ]
    );
    const ScaleID = scaleResult?.insertId;
    const array = data.Categories ? data.Categories : [];
    if (array.length) {
      const categoriesArray = array.map(el => [ScaleID, el.CategoryName, el.CategoryLabel, data.UserID]);
      await connection.query(
        `INSERT INTO categories ( ScaleID, CategoryName, CategoryLabel, Create_By ) VALUES ?`,
        [categoriesArray]
      );
    }
    const skillIDs = data?.SkillIDs;
    if (skillIDs?.length) {
      const skillIDList = skillIDs.map(id => [ScaleID, id, data.UserID]);
      await connection.query(
        `INSERT INTO scale_skill_mappings ( ScaleID, SkillID, Create_By ) VALUES ?`,
        [skillIDList]
      );
    }
    await connection.commit();
    connection.release();
    if (scaleResult.affectedRows >= 1) {
      return callBack(null, "Scale created successfully", ScaleID);
    } else {
      return callBack("Failed to create scale");
    }
  } catch (error) {
    console.warn(error);
    await connection.rollback();
    connection.release();
    return callBack(error.message);
  }
};

exports.scaleScreeningCreate = (data, callBack) => {
  db.query(
    `INSERT INTO screen_metrics ( CategoryID, ScaleID, ContentID, QuestionNumber, Question, ResponseOption1, ResponseScore1, ResponseOption2, ResponseScore2, ResponseOption3, ResponseScore3, ResponseOption4, ResponseScore4, ResponseOption5, ResponseScore5, Create_By ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
    [
      data.CategoryID,
      data.ScaleID,
      data.ContentID,
      data.QuestionNumber,
      data.Question,
      data.ResponseOption1,
      data.ResponseScore1,
      data.ResponseOption2,
      data.ResponseScore2,
      data.ResponseOption3,
      data.ResponseScore3,
      data.ResponseOption4,
      data.ResponseScore4,
      data.ResponseOption5,
      data.ResponseScore5,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Scale question added successfully");
      } else {
        return callBack("Failed to add question", null, 500);
      }
    }
  );
};

exports.scaleAssessmentCreate = (data, callBack) => {
  db.query(
    `INSERT INTO assessment_metrics ( CategoryID, ScaleID, ContentID, QuestionNumber, Question, NumberOfScore, TaskName, TaskObjective, Example, Criteria, Create_By ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
    [
      data.CategoryID,
      data.ScaleID,
      data.ContentID,
      data.QuestionNumber,
      data.Question,
      data.NumberOfScore,
      data.TaskName,
      data.TaskObjective,
      data.Example,
      data.Criteria,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows === 1) {
        return callBack(null, "Scale question added successfully");
      } else {
        return callBack("Failed to add question", null, 500);
      }
    }
  );
};

exports.scaleUpdate = (data, callBack) => {
  db.query(
    `UPDATE scales SET ScaleName = ?, Accreditation = ?, ScaleCategory = ?, ScaleMetric = ?, ScaleMetricType = ?, Status = ?, Update_By = ? WHERE ScaleID = ? `,
    [
      data.ScaleName,
      data.Accreditation,
      data.ScaleCategory,
      data.ScaleMetric,
      data.ScaleMetricType,
      data.Status ? 1 : 0,
      data.UserID,
      data.ScaleID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Scale updated successfully");
      } else {
        return callBack("Scale not found", null, 404);
      }
    }
  );
};

exports.ScaleScreeningScoreCriteriaUpdate = (data, callBack) => {
  db.query(
    `UPDATE scales SET NoAutismScore = ?, MildAutismScore = ?, ModerateAutismScore = ?, Update_By = ? WHERE ScaleID = ? `,
    [data.NoAutismScore, data.MildAutismScore, data.ModerateAutismScore, data.UserID, data.ScaleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Screening score criteria updated successfully");
      } else {
        return callBack("Scale not found", null, 404);
      }
    }
  );
};

exports.scaleScreeningUpdate = (data, callBack) => {
  db.query(
    `UPDATE screen_metrics SET CategoryID = ?, ContentID = ?, QuestionNumber = ?, Question = ?, ResponseOption1 = ?, ResponseScore1 = ?, ResponseOption2 = ?, ResponseScore2 = ?, ResponseOption3 = ?, ResponseScore3 = ?, ResponseOption4 = ?, ResponseScore4 = ?, ResponseOption5 = ?, ResponseScore5 = ?, Update_By = ? WHERE MetricID = ? `,
    [
      data.CategoryID,
      data.ContentID,
      data.QuestionNumber,
      data.Question,
      data.ResponseOption1,
      data.ResponseScore1,
      data.ResponseOption2,
      data.ResponseScore2,
      data.ResponseOption3,
      data.ResponseScore3,
      data.ResponseOption4,
      data.ResponseScore4,
      data.ResponseOption5,
      data.ResponseScore5,
      data.UserID,
      data.MetricID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Scale question updated successfully");
      } else {
        return callBack("Scale question not found", null, 404);
      }
    }
  );
};

exports.scaleAssessmentUpdate = (data, callBack) => {
  db.query(
    `UPDATE assessment_metrics SET CategoryID = ?, ContentID = ?, QuestionNumber = ?, Question = ?, NumberOfScore = ?, TaskName = ?, TaskObjective = ?, Example = ?, Criteria = ?, Status = ?, Update_By = ? WHERE MetricID = ? `,
    [
      data.CategoryID,
      data.ContentID,
      data.QuestionNumber,
      data.Question,
      data.NumberOfScore,
      data.TaskName,
      data.TaskObjective,
      data.Example,
      data.Criteria,
      data.Status ? 1 : 0,
      data.UserID,
      data.MetricID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Scale question updated successfully");
      } else {
        return callBack("Scale question not found", null, 404);
      }
    }
  );
};

exports.scaleUpdateByCreate_By = (data, callBack) => {
  db.query(
    `UPDATE scales SET ScaleName = ?, Accreditation = ?, ScaleCategory = ?, ScaleMetric = ?, ScaleMetricType = ?, Status = ?, Update_By = ? WHERE ScaleID = ? AND Create_By = ? `,
    [
      data.ScaleName,
      data.Accreditation,
      data.ScaleCategory,
      data.ScaleMetric,
      data.ScaleMetricType,
      data.Status,
      data.UserID,
      data.ScaleID,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Scale updated successfully");
      } else {
        return callBack("Scale not found", null, 404);
      }
    }
  );
};

exports.ScaleScreeningScoreCriteriaUpdateByCreate_By = (data, callBack) => {
  db.query(
    `UPDATE scales SET NoAutismScore = ?, MildAutismScore = ?, ModerateAutismScore = ?, Update_By = ? WHERE ScaleID = ? AND Create_By = ? `,
    [data.NoAutismScore, data.MildAutismScore, data.ModerateAutismScore, data.UserID, data.ScaleID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Screening score criteria updated successfully");
      } else {
        return callBack("Scale not found", null, 404);
      }
    }
  );
};

exports.scaleScreeningUpdateByCreate_By = (data, callBack) => {
  db.query(
    `UPDATE screen_metrics SET CategoryID = ?, ContentID = ?, QuestionNumber = ?, Question = ?, ResponseOption1 = ?, ResponseScore1 = ?, ResponseOption2 = ?, ResponseScore2 = ?, ResponseOption3 = ?, ResponseScore3 = ?, ResponseOption4 = ?, ResponseScore4 = ?, ResponseOption5 = ?, ResponseScore5 = ?, Update_By = ? WHERE MetricID = ? AND Create_By = ? `,
    [
      data.CategoryID,
      data.ContentID,
      data.QuestionNumber,
      data.Question,
      data.ResponseOption1,
      data.ResponseScore1,
      data.ResponseOption2,
      data.ResponseScore2,
      data.ResponseOption3,
      data.ResponseScore3,
      data.ResponseOption4,
      data.ResponseScore4,
      data.ResponseOption5,
      data.ResponseScore5,
      data.UserID,
      data.MetricID,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Scale question updated successfully");
      } else {
        return callBack("Scale question not found", null, 404);
      }
    }
  );
};

exports.scaleAssessmentUpdateByCreate_By = (data, callBack) => {
  db.query(
    `UPDATE assessment_metrics SET CategoryID = ?, ContentID = ?, QuestionNumber = ?, Question = ?, NumberOfScore = ?, TaskName = ?, TaskObjective = ?, Example = ?, Criteria = ?, Status = ?, Update_By = ? WHERE MetricID = ? AND Create_By = ? `,
    [
      data.CategoryID,
      data.ContentID,
      data.QuestionNumber,
      data.Question,
      data.NumberOfScore,
      data.TaskName,
      data.TaskObjective,
      data.Example,
      data.Criteria,
      data.Status ? 1 : 0,
      data.UserID,
      data.MetricID,
      data.UserID,
    ],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Scale question updated successfully");
      } else {
        return callBack("Scale question not found", null, 404);
      }
    }
  );
};

exports.scaleDelete = (ScaleID, callBack) => {
  db.query(`UPDATE scales SET Status = 0 WHERE ScaleID = ? `, [ScaleID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else if (results.affectedRows == 1) {
      return callBack(null, "Scale deleted successfully");
    } else {
      return callBack("Scale not found", null, 404);
    }
  });
};

exports.scaleMetricDelete = (data, callBack) => {
  db.query(`UPDATE ${data.DBName} SET Status = 0 WHERE MetricID = ? `, [data.MetricID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else if (results.affectedRows == 1) {
      return callBack(null, "Scale Metric deleted successfully");
    } else {
      return callBack("Scale Metric not found", null, 404);
    }
  });
};

exports.scaleDeleteByScaleIDNClientUserID = (data, callBack) => {
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
            `UPDATE scales INNER JOIN clients ON scales.Create_By = clients.UserID SET scales.Status = 0 WHERE clients.UserID = ? AND scales.ScaleID = ? `,
            [data.UserID, data.ScaleID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE scales INNER JOIN centers ON scales.Create_By = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET scales.Status = 0 WHERE clients.UserID = ? AND scales.ScaleID = ? `,
                  [data.UserID, data.ScaleID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE scales INNER JOIN therapists ON scales.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET scales.Status = 0 WHERE clients.UserID = ? AND scales.ScaleID = ? `,
                        [data.UserID, data.ScaleID],
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
                                return callBack(null, "Scale deleted successfully");
                              } else {
                                return callBack("Scale not found", null, 404);
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

exports.scaleMetricDeleteByScaleIDNClientUserID = (data, callBack) => {
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
            `UPDATE ${data.DBName} INNER JOIN clients ON ${data.DBName}.Create_By = clients.UserID SET ${data.DBName}.Status = 0 WHERE clients.UserID = ? AND ${data.DBName}.MetricID = ? `,
            [data.UserID, data.MetricID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE ${data.DBName} INNER JOIN centers ON ${data.DBName}.Create_By = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET ${data.DBName}.Status = 0 WHERE clients.UserID = ? AND ${data.DBName}.MetricID = ? `,
                  [data.UserID, data.MetricID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE ${data.DBName} INNER JOIN therapists ON ${data.DBName}.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET ${data.DBName}.Status = 0 WHERE clients.UserID = ? AND ${data.DBName}.MetricID = ? `,
                        [data.UserID, data.MetricID],
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
                                return callBack(null, "Scale metric deleted successfully");
                              } else {
                                return callBack("Scale metric not found", null, 404);
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

exports.scaleDeleteByScaleIDNCenterUserID = (data, callBack) => {
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
            `UPDATE scales INNER JOIN centers ON scales.Create_By = centers.UserID SET scales.Status = 0 WHERE centers.UserID = ? AND scales.ScaleID = ? `,
            [data.UserID, data.ScaleID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE scales INNER JOIN therapists ON scales.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET scales.Status = 0 WHERE centers.UserID = ? AND scales.ScaleID = ? `,
                  [data.UserID, data.ScaleID],
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
                          return callBack(null, "Scale deleted successfully");
                        } else {
                          return callBack("Scale not found", null, 404);
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

exports.scaleMetricDeleteByMetricIDNCenterUserID = (data, callBack) => {
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
            `UPDATE ${data.DBName} INNER JOIN centers ON ${data.DBName}.Create_By = centers.UserID SET ${data.DBName}.Status = 0 WHERE centers.UserID = ? AND ${data.DBName}.MetricID = ? `,
            [data.UserID, data.MetricID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE ${data.DBName} INNER JOIN therapists ON ${data.DBName}.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET ${data.DBName}.Status = 0 WHERE centers.UserID = ? AND ${data.DBName}.MetricID = ? `,
                  [data.UserID, data.MetricID],
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
                          return callBack(null, "Scale metric deleted successfully");
                        } else {
                          return callBack("Scale metric not found", null, 404);
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

exports.scaleDeleteByScaleIDNTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE scales INNER JOIN therapists ON scales.Create_By = therapists.UserID SET scales.Status = 0 WHERE scales.ScaleID = ? AND therapists.UserID = ? `,
    [data.ScaleID, data.UserID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Scale deleted successfully");
        } else {
          return callBack("Scale not found", null, 404);
        }
      }
    }
  );
};

exports.scaleMetricDeleteByMetricIDNTherapistUserID = (data, callBack) => {
  const query = db.query(
    `UPDATE ${data.DBName} INNER JOIN therapists ON ${data.DBName}.Create_By = therapists.UserID SET ${data.DBName}.Status = 0 WHERE ${data.DBName}.MetricID = ? AND therapists.UserID = ? `,
    [data.MetricID, data.UserID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Scale metric deleted successfully");
        } else {
          return callBack("Scale metric not found", null, 404);
        }
      }
    }
  );
};
