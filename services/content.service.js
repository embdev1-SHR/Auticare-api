const db = require("../config/db.config");
const dbAwait = require("../config/dbAwait.config");
const { arrayToNumberPair } = require("../helpers/arrayFunctions");
const promiseDB = db.promise();

exports.contentList = (callBack) => {
  db.query(`SELECT * FROM contents WHERE Status = 1`, (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.contentListByClientUserID = (UserID, callBack) => {
  db.query(
    `SELECT contents.* FROM clients INNER JOIN contents ON clients.UserID = contents.Create_By WHERE clients.UserID = ? AND contents.Status = 1 UNION SELECT contents.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN contents ON centers.UserID = contents.Create_By WHERE clients.UserID = ? AND contents.Status = 1 UNION SELECT contents.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE clients.UserID = ? AND contents.Status = 1 UNION SELECT * FROM contents WHERE ContentType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentCountByClientUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT SUM(Contents) AS ContentCount FROM ( SELECT COUNT(*) AS Contents FROM clients INNER JOIN contents ON clients.UserID = contents.Create_By WHERE clients.UserID = ? AND contents.Status = 1 UNION SELECT COUNT(*) AS Contents FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN contents ON centers.UserID = contents.Create_By WHERE clients.UserID = ? AND contents.Status = 1 UNION SELECT COUNT(*) AS Contents FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE clients.UserID = ? AND contents.Status = 1 ) AS subquery;`,
    [UserID, UserID, UserID]
  );
  return rows;
};

exports.contentListByCenterUserID = (UserID, callBack) => {
  db.query(
    `SELECT contents.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN contents ON clients.UserID = contents.Create_By WHERE centers.UserID = ? AND contents.Status = 1 UNION SELECT contents.* FROM centers INNER JOIN contents ON centers.UserID = contents.Create_By WHERE centers.UserID = ? AND contents.Status = 1 UNION SELECT contents.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE centers.UserID = ? AND contents.Status = 1 UNION SELECT * FROM contents WHERE ContentType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentCountByCenterUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT SUM(Contents) AS ContentCount FROM ( SELECT COUNT(*) AS Contents FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN contents ON clients.UserID = contents.Create_By WHERE centers.UserID = ? AND contents.Status = 1 UNION SELECT COUNT(*) AS Contents FROM centers INNER JOIN contents ON centers.UserID = contents.Create_By WHERE centers.UserID = ? AND contents.Status = 1 UNION SELECT COUNT(*) AS Contents FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE centers.UserID = ? AND contents.Status = 1 ) AS subquery;`,
    [UserID, UserID, UserID]
  );
  return rows;
};

exports.contentListByTherapistUserID = (UserID, callBack) => {
  db.query(
    `SELECT contents.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON clients.UserID = contents.Create_By WHERE therapists.UserID = ? AND contents.Status = 1 UNION SELECT contents.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON centers.UserID = contents.Create_By WHERE therapists.UserID = ? AND contents.Status = 1 UNION SELECT contents.* FROM therapists INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE therapists.UserID = ? AND contents.Status = 1 UNION SELECT * FROM contents WHERE ContentType = "Default" AND Status = 1;`,
    [UserID, UserID, UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentCountByTherapistUserID = async (UserID) => {
  const [rows] = await promiseDB.query(
    `SELECT SUM(Contents) AS ContentCount FROM ( SELECT COUNT(*) AS Contents FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON clients.UserID = contents.Create_By WHERE therapists.UserID = ? AND contents.Status = 1 UNION SELECT COUNT(*) AS Contents FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON centers.UserID = contents.Create_By WHERE therapists.UserID = ? AND contents.Status = 1 UNION SELECT COUNT(*) AS Contents FROM therapists INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE therapists.UserID = ? AND contents.Status = 1 ) AS subquery;`,
    [UserID, UserID, UserID]
  );
  return rows;
};

exports.contentSkillList = (callBack) => {
  db.query(
    `SELECT content_skill_mappings.SkillID, content_skill_mappings.ContentID, skills.SkillName FROM skills INNER JOIN content_skill_mappings ON content_skill_mappings.SkillID = skills.SkillID INNER JOIN contents ON content_skill_mappings.ContentID = contents.ContentID `,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentSkillListByContents = (Contents, callBack) => {
  db.query(
    `SELECT content_skill_mappings.SkillID, content_skill_mappings.ContentID, skills.SkillName FROM skills INNER JOIN content_skill_mappings ON content_skill_mappings.SkillID = skills.SkillID INNER JOIN contents ON content_skill_mappings.ContentID = contents.ContentID WHERE contents.ContentID IN (${Contents})`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentTherapyList = (callBack) => {
  db.query(
    `SELECT content_therapy_mappings.TherapyID, content_therapy_mappings.ContentID, therapy_methods.TherapyName FROM therapy_methods INNER JOIN content_therapy_mappings ON content_therapy_mappings.TherapyID = therapy_methods.TherapyID INNER JOIN contents ON content_therapy_mappings.ContentID = contents.ContentID`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentTherapyListByContents = (Contents, callBack) => {
  db.query(
    `SELECT content_therapy_mappings.TherapyID, content_therapy_mappings.ContentID, therapy_methods.TherapyName FROM therapy_methods INNER JOIN content_therapy_mappings ON content_therapy_mappings.TherapyID = therapy_methods.TherapyID INNER JOIN contents ON content_therapy_mappings.ContentID = contents.ContentID WHERE contents.ContentID IN (${Contents})`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentMediaDatasList = (ContentID, callBack) => {
  db.query(`SELECT * FROM content_media_datas WHERE ContentID = ? AND Status = 1`, [ContentID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.contentMediaDatasListByClientUserID = (data, callBack) => {
  db.query(
    `SELECT content_media_datas.* FROM clients INNER JOIN content_media_datas ON clients.UserID = content_media_datas.Create_By WHERE clients.UserID = ? AND content_media_datas.ContentID = ? AND content_media_datas.Status = 1 UNION SELECT content_media_datas.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN content_media_datas ON centers.UserID = content_media_datas.Create_By WHERE clients.UserID = ? AND content_media_datas.ContentID = ? AND content_media_datas.Status = 1 UNION SELECT content_media_datas.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN content_media_datas ON therapists.UserID = content_media_datas.Create_By WHERE clients.UserID = ? AND content_media_datas.ContentID = ? AND content_media_datas.Status = 1 UNION SELECT * FROM content_media_datas WHERE ContentID = ? AND Status = 1 AND ContentType = "Default";`,
    [data.UserID, data.ContentID, data.UserID, data.ContentID, data.UserID, data.ContentID, data.ContentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentMediaDatasListByCenterUserID = (data, callBack) => {
  db.query(
    `SELECT content_media_datas.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN content_media_datas ON clients.UserID = content_media_datas.Create_By WHERE centers.UserID = ? AND content_media_datas.ContentID = ? AND content_media_datas.Status = 1 UNION SELECT content_media_datas.* FROM centers INNER JOIN content_media_datas ON centers.UserID = content_media_datas.Create_By WHERE centers.UserID = ? AND content_media_datas.ContentID = ? AND content_media_datas.Status = 1 UNION SELECT content_media_datas.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN content_media_datas ON therapists.UserID = content_media_datas.Create_By WHERE centers.UserID = ? AND content_media_datas.ContentID = ? AND content_media_datas.Status = 1 UNION SELECT * FROM content_media_datas WHERE ContentID = ? AND Status = 1 AND ContentType = "Default";`,
    [data.UserID, data.ContentID, data.UserID, data.ContentID, data.UserID, data.ContentID, data.ContentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentMediaDatasListByTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT content_media_datas.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN content_media_datas ON clients.UserID = content_media_datas.Create_By WHERE therapists.UserID = ? AND content_media_datas.ContentID = ? AND content_media_datas.Status = 1 UNION SELECT content_media_datas.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN content_media_datas ON centers.UserID = content_media_datas.Create_By WHERE therapists.UserID = ? AND content_media_datas.ContentID = ? AND content_media_datas.Status = 1 UNION SELECT content_media_datas.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN content_media_datas ON therapists.UserID = content_media_datas.Create_By WHERE therapists.UserID = ? AND content_media_datas.ContentID = ? AND content_media_datas.Status = 1 UNION SELECT * FROM content_media_datas WHERE ContentID = ? AND Status = 1 AND ContentType = "Default";`,
    [data.UserID, data.ContentID, data.UserID, data.ContentID, data.UserID, data.ContentID, data.ContentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentTutorialLinkList = (ContentID, callBack) => {
  db.query(`SELECT * FROM content_tutorial_links WHERE ContentID = ? AND Status = 1`, [ContentID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.contentTutorialLinkListByClientUserID = (data, callBack) => {
  db.query(
    `SELECT content_tutorial_links.* FROM clients INNER JOIN content_tutorial_links ON clients.UserID = content_tutorial_links.Create_By WHERE clients.UserID = ? AND content_tutorial_links.ContentID = ? AND content_tutorial_links.Status = 1 UNION SELECT content_tutorial_links.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN content_tutorial_links ON centers.UserID = content_tutorial_links.Create_By WHERE clients.UserID = ? AND content_tutorial_links.ContentID = ? AND content_tutorial_links.Status = 1 UNION SELECT content_tutorial_links.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN content_tutorial_links ON therapists.UserID = content_tutorial_links.Create_By WHERE clients.UserID = ? AND content_tutorial_links.ContentID = ? AND content_tutorial_links.Status = 1 UNION SELECT * FROM content_tutorial_links WHERE ContentID = ? AND Status = 1 AND ContentType = "Default";`,
    [data.UserID, data.ContentID, data.UserID, data.ContentID, data.UserID, data.ContentID, data.ContentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentTutorialLinkListByCenterUserID = (data, callBack) => {
  db.query(
    `SELECT content_tutorial_links.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN content_tutorial_links ON clients.UserID = content_tutorial_links.Create_By WHERE centers.UserID = ? AND content_tutorial_links.ContentID = ? AND content_tutorial_links.Status = 1 UNION SELECT content_tutorial_links.* FROM centers INNER JOIN content_tutorial_links ON centers.UserID = content_tutorial_links.Create_By WHERE centers.UserID = ? AND content_tutorial_links.ContentID = ? AND content_tutorial_links.Status = 1 UNION SELECT content_tutorial_links.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN content_tutorial_links ON therapists.UserID = content_tutorial_links.Create_By WHERE centers.UserID = ? AND content_tutorial_links.ContentID = ? AND content_tutorial_links.Status = 1 UNION SELECT * FROM content_tutorial_links WHERE ContentID = ? AND Status = 1 AND ContentType = "Default";`,
    [data.UserID, data.ContentID, data.UserID, data.ContentID, data.UserID, data.ContentID, data.ContentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentTutorialLinkListByTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT content_tutorial_links.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN content_tutorial_links ON clients.UserID = content_tutorial_links.Create_By WHERE therapists.UserID = ? AND content_tutorial_links.ContentID = ? AND content_tutorial_links.Status = 1 UNION SELECT content_tutorial_links.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN content_tutorial_links ON centers.UserID = content_tutorial_links.Create_By WHERE therapists.UserID = ? AND content_tutorial_links.ContentID = ? AND content_tutorial_links.Status = 1 UNION SELECT content_tutorial_links.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN content_tutorial_links ON therapists.UserID = content_tutorial_links.Create_By WHERE therapists.UserID = ? AND content_tutorial_links.ContentID = ? AND content_tutorial_links.Status = 1 UNION SELECT * FROM content_tutorial_links WHERE ContentID = ? AND Status = 1 AND ContentType = "Default";`,
    [data.UserID, data.ContentID, data.UserID, data.ContentID, data.UserID, data.ContentID, data.ContentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentDetails = (ContentID, callBack) => {
  db.query(`SELECT * FROM contents WHERE ContentID = ? AND Status = 1;`, [ContentID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else return callBack(null, results);
  });
};

exports.contentDetailsByContentIDNClientUserID = (data, callBack) => {
  db.query(
    `SELECT contents.* FROM clients INNER JOIN contents ON clients.UserID = contents.Create_By WHERE clients.UserID = ? AND contents.Status = 1 AND contents.ContentID = ? UNION SELECT contents.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN contents ON centers.UserID = contents.Create_By WHERE clients.UserID = ? AND contents.Status = 1 AND contents.ContentID = ? UNION SELECT contents.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE clients.UserID = ? AND contents.Status = 1 AND contents.ContentID = ? UNION SELECT * FROM contents WHERE ContentType = "Default" AND Status = 1 AND ContentID = ?;`,
    [data.UserID, data.ContentID, data.UserID, data.ContentID, data.UserID, data.ContentID, data.ContentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentDetailsByContentIDNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT contents.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN contents ON clients.UserID = contents.Create_By WHERE centers.UserID = ? AND contents.Status = 1 AND contents.ContentID = ? UNION SELECT contents.* FROM centers INNER JOIN contents ON centers.UserID = contents.Create_By WHERE centers.UserID = ? AND contents.Status = 1 AND contents.ContentID = ? UNION SELECT contents.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE centers.UserID = ? AND contents.Status = 1 AND contents.ContentID = ? UNION SELECT * FROM contents WHERE ContentType = "Default" AND Status = 1 AND ContentID = ?`,
    [data.UserID, data.ContentID, data.UserID, data.ContentID, data.UserID, data.ContentID, data.ContentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentDetailsByContentIDNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT contents.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON clients.UserID = contents.Create_By WHERE therapists.UserID = ? AND contents.Status = 1 AND contents.ContentID = ? UNION SELECT contents.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON centers.UserID = contents.Create_By WHERE therapists.UserID = ? AND contents.Status = 1 AND contents.ContentID = ? UNION SELECT contents.* FROM therapists INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE therapists.UserID = ? AND contents.Status = 1 AND contents.ContentID = ? UNION SELECT * FROM contents WHERE ContentType = "Default" AND Status = 1 AND ContentID = ?`,
    [data.UserID, data.ContentID, data.UserID, data.ContentID, data.UserID, data.ContentID, data.ContentID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentSearch = (data, callBack) => {
  db.query(
    `SELECT * FROM contents WHERE ContentActivityName LIKE '%${data.ContentActivityName}%' AND Status = 1;`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentSearchByContentActivityNameNClientUserID = (data, callBack) => {
  db.query(
    `SELECT contents.* FROM clients INNER JOIN contents ON clients.UserID = contents.Create_By WHERE clients.UserID = ${data.UserID} AND contents.Status = 1 AND contents.ContentActivityName LIKE '%${data.ContentActivityName}%' UNION SELECT contents.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN contents ON centers.UserID = contents.Create_By WHERE clients.UserID = ${data.UserID} AND contents.Status = 1 contents.ContentActivityName LIKE '%${data.ContentActivityName}%' UNION SELECT contents.* FROM clients INNER JOIN centers ON clients.ClientID = centers.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE clients.UserID = ${data.UserID} AND contents.Status = 1 contents.ContentActivityName LIKE '%${data.ContentActivityName}%' UNION SELECT * FROM contents WHERE ContentType = "Default" AND Status = 1 AND ContentActivityName LIKE '%${data.ContentActivityName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentSearchByContentActivityNameNCenterUserID = (data, callBack) => {
  db.query(
    `SELECT contents.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN contents ON clients.UserID = contents.Create_By WHERE centers.UserID = ${data.UserID} AND contents.Status = 1 AND contents.ContentActivityName LIKE '%${data.ContentActivityName}%' UNION SELECT contents.* FROM centers INNER JOIN contents ON centers.UserID = contents.Create_By WHERE centers.UserID = ${data.UserID} AND contents.Status = 1 AND contents.ContentActivityName LIKE '%${data.ContentActivityName}%' UNION SELECT contents.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE centers.UserID = ${data.UserID} AND contents.Status = 1 AND contents.ContentActivityName LIKE '%${data.ContentActivityName}%' UNION SELECT * FROM contents WHERE ContentType = "Default" AND Status = 1 AND ContentActivityName LIKE '%${data.ContentActivityName}%';`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentSearchByContentActivityNameNTherapistUserID = (data, callBack) => {
  db.query(
    `SELECT contents.* FROM clients INNER JOIN centers ON centers.ClientID = clients.ClientID INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON clients.UserID = contents.Create_By WHERE therapists.UserID = ${data.UserID} AND contents.Status = 1 AND contents.ContentActivityName LIKE '%${data.ContentActivityName}%' UNION SELECT contents.* FROM centers INNER JOIN therapists ON therapists.CenterID = centers.CenterID INNER JOIN contents ON centers.UserID = contents.Create_By WHERE therapists.UserID = ${data.UserID} AND contents.Status = 1 AND contents.ContentActivityName LIKE '%${data.ContentActivityName}%' UNION SELECT contents.* FROM therapists INNER JOIN contents ON therapists.UserID = contents.Create_By WHERE therapists.UserID = ${data.UserID} AND contents.Status = 1 AND contents.ContentActivityName LIKE '%${data.ContentActivityName}%' UNION SELECT * FROM contents WHERE ContentType = "Default" AND Status = 1 AND ContentActivityName LIKE '%${data.ContentActivityName}%'`,
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

exports.contentCreate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) return callBack(error.message);
    connection.beginTransaction((error) => {
      if (error) { connection.release(); return callBack(error.message); }
      connection.query(
        `INSERT INTO contents ( ContentActivityName, ContentActivityDescription, ContentCategory, ContentType, FileUploadURL, Create_By ) VALUES ( ?, ?, ?, ?, ?, ? )`,
        [data.ContentActivityName, data.ContentActivityDescription, data.ContentCategory, data.ContentType, data.FileUploadURL || null, data.UserID],
        (error, contentResult) => {
          if (error) {
            return connection.rollback(() => { connection.release(); return callBack(error.message); });
          }
          const ContentID = contentResult.insertId;
          const therapyIDs = data?.TherapyIDs || [];
          const skillIDs = data?.SkillIDs || [];

          const insertTherapies = (done) => {
            if (!therapyIDs.length) return done(null);
            const rows = therapyIDs.map((id) => [ContentID, id, data.UserID]);
            connection.query(
              `INSERT INTO content_therapy_mappings ( ContentID, TherapyID, Create_By ) VALUES ?`,
              [rows],
              (error) => done(error)
            );
          };

          const insertSkills = (done) => {
            if (!skillIDs.length) return done(null);
            const rows = skillIDs.map((id) => [ContentID, id, data.UserID]);
            connection.query(
              `INSERT INTO content_skill_mappings ( ContentID, SkillID, Create_By ) VALUES ?`,
              [rows],
              (error) => done(error)
            );
          };

          insertTherapies((error) => {
            if (error) {
              return connection.rollback(() => { connection.release(); return callBack(error.message); });
            }
            insertSkills((error) => {
              if (error) {
                return connection.rollback(() => { connection.release(); return callBack(error.message); });
              }
              connection.commit((error) => {
                if (error) {
                  return connection.rollback(() => { connection.release(); return callBack(error.message); });
                }
                connection.release();
                return callBack(null, "Content created successfully");
              });
            });
          });
        }
      );
    });
  });
};

exports.contentMediaDataCreate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else {
          const MediaDatas = data.MediaDatas;
          const MediaDatasArr = [];
          for (let index = 0; index < MediaDatas.length; index++) {
            const element = MediaDatas[index];
            MediaDatasArr.push([
              data.ContentID,
              element.StartPosition,
              element.EndPosition,
              element.Description,
              data.ContentType,
              data.UserID,
            ]);
          }
          connection.query(
            `INSERT INTO content_media_datas (ContentID, StartPosition, EndPosition, Description, ContentType, Create_By) VALUES ?`,
            [MediaDatasArr],
            (error, results) => {
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
                  if (results.affectedRows >= 1) {
                    return callBack(null, "Content media datas added successfully");
                  } else {
                    return callBack("Adding content media datas failed", null, 500);
                  }
                });
            }
          );
        }
      });
    /* End transaction */
  });
};

exports.contentTutorialLinkCreate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) {
      return callBack(error.message);
    } else
    /* Begin transaction */
      connection.beginTransaction((error) => {
        if (error) {
          return callBack(error.message);
        } else {
          const TutorialLinks = data.TutorialLinks;
          const TutorialLinksArr = [];
          for (let index = 0; index < TutorialLinks.length; index++) {
            const element = TutorialLinks[index];
            TutorialLinksArr.push([data.ContentID, element, data.ContentType, data.UserID]);
          }
          connection.query(
            `INSERT INTO content_tutorial_links (ContentID, TutorialLink, ContentType, Create_By) VALUES ?`,
            [TutorialLinksArr],
            (error, results) => {
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
                  if (results.affectedRows >= 1) {
                    return callBack(null, "Content tutorial links added successfully");
                  } else {
                    return callBack("Adding content tutorial links failed", null, 500);
                  }
                });
            }
          );
        }
      });
    /* End transaction */
  });
};

exports.contentUpdate = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) return callBack(error.message);
    connection.beginTransaction((error) => {
      if (error) { connection.release(); return callBack(error.message); }
      connection.query(
        `UPDATE contents SET ContentActivityName = ?, ContentActivityDescription = ?, ContentCategory = ?, FileUploadURL = ?, ActivityInstructionTitle = ?, ActivityInstructionDescription = ?, ContentDescription = ?, Status = ?, Update_By = ? WHERE ContentID = ? `,
        [data.ContentActivityName, data.ContentActivityDescription, data.ContentCategory, data.FileUploadURL, data.ActivityInstructionTitle, data.ActivityInstructionDescription, data.ContentDescription, data.Status, data.UserID, data.ContentID],
        (error, contentResult) => {
          if (error) {
            return connection.rollback(() => { connection.release(); return callBack(error.message); });
          }
          therapyIDUpdates(data, data.ContentID, connection, (error) => {
            if (error) return connection.rollback(() => { connection.release(); return callBack(error); });
            skillIDUpdates(data, data.ContentID, connection, (error) => {
              if (error) return connection.rollback(() => { connection.release(); return callBack(error); });
              connection.commit((error) => {
                if (error) return connection.rollback(() => { connection.release(); return callBack(error.message); });
                connection.release();
                if (contentResult.affectedRows >= 1) {
                  return callBack(null, "Content updated successfully");
                } else {
                  return callBack("Content not found", null, 404);
                }
              });
            });
          });
        }
      );
    });
  });
};

exports.contentMediaDataUpdate = (data, callBack) => {
  db.query(
    `UPDATE content_media_datas SET StartPosition = ?, EndPosition = ?, Description = ?, Status = ?, Update_By = ? WHERE MediaID = ?`,
    [data.StartPosition, data.EndPosition, data.Description, data.Status, data.UserID, data.MediaID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Content media data updated successfully");
      } else {
        return callBack("Content media datas not found", null, 404);
      }
    }
  );
};

exports.contentUpdateByCreate_By = (data, callBack) => {
  db.getConnection((error, connection) => {
    if (error) return callBack(error.message);
    connection.beginTransaction((error) => {
      if (error) { connection.release(); return callBack(error.message); }
      connection.query(
        `UPDATE contents SET ContentActivityName = ?, ContentActivityDescription = ?, ContentCategory = ?, FileUploadURL = ?, ActivityInstructionTitle = ?, ActivityInstructionDescription = ?, ContentDescription = ?, Status = ?, Update_By = ? WHERE ContentID = ? AND Create_By = ? `,
        [data.ContentActivityName, data.ContentActivityDescription, data.ContentCategory, data.FileUploadURL, data.ActivityInstructionTitle, data.ActivityInstructionDescription, data.ContentDescription, data.Status, data.UserID, data.ContentID, data.UserID],
        (error, contentResult) => {
          if (error) {
            return connection.rollback(() => { connection.release(); return callBack(error.message); });
          }
          therapyIDUpdates(data, data.ContentID, connection, (error) => {
            if (error) return connection.rollback(() => { connection.release(); return callBack(error); });
            skillIDUpdates(data, data.ContentID, connection, (error) => {
              if (error) return connection.rollback(() => { connection.release(); return callBack(error); });
              connection.commit((error) => {
                if (error) return connection.rollback(() => { connection.release(); return callBack(error.message); });
                connection.release();
                if (contentResult.affectedRows >= 1) {
                  return callBack(null, "Content updated successfully");
                } else {
                  return callBack("Content not found", null, 404);
                }
              });
            });
          });
        }
      );
    });
  });
};

exports.contentMediaDataUpdateByCreate_By = (data, callBack) => {
  db.query(
    `UPDATE content_media_datas SET StartPosition = ?, EndPosition = ?, Description = ?, Status = ?, Update_By = ? WHERE MediaID = ? AND Create_By = ? `,
    [data.StartPosition, data.EndPosition, data.Description, data.Status, data.UserID, data.MediaID, data.UserID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Content media data updated successfully");
      } else {
        return callBack("Content media data not found", null, 404);
      }
    }
  );
};

exports.contentDelete = (ContentID, callBack) => {
  db.query(`UPDATE contents SET Status = 0 WHERE ContentID = ? `, [ContentID], (error, results) => {
    if (error) {
      return callBack(error.message);
    } else if (results.affectedRows == 1) {
      return callBack(null, "Content deleted successfully");
    } else {
      return callBack("Content not found", null, 404);
    }
  });
};

exports.contentDeleteByContentIDNClientUserID = (data, callBack) => {
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
            `UPDATE contents INNER JOIN clients ON contents.Create_By = clients.UserID SET contents.Status = 0 WHERE clients.UserID = ? AND contents.ContentID = ? `,
            [data.UserID, data.ContentID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE contents INNER JOIN centers ON contents.Create_By = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET contents.Status = 0 WHERE clients.UserID = ? AND contents.ContentID = ? `,
                  [data.UserID, data.ContentID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE contents INNER JOIN therapists ON contents.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET contents.Status = 0 WHERE clients.UserID = ? AND contents.ContentID = ? `,
                        [data.UserID, data.ContentID],
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
                                return callBack(null, "Content deleted successfully");
                              } else {
                                return callBack("Content not found", null, 404);
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

exports.contentDeleteByContentIDNCenterUserID = (data, callBack) => {
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
            `UPDATE contents INNER JOIN centers ON contents.Create_By = centers.UserID SET contents.Status = 0 WHERE centers.UserID = ? AND contents.ContentID = ? `,
            [data.UserID, data.ContentID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE contents INNER JOIN therapists ON contents.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET contents.Status = 0 WHERE centers.UserID = ? AND contents.ContentID = ? `,
                  [data.UserID, data.ContentID],
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
                          return callBack(null, "Content deleted successfully");
                        } else {
                          return callBack("Content not found", null, 404);
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

exports.contentDeleteByContentIDNTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE contents INNER JOIN therapists ON contents.Create_By = therapists.UserID SET contents.Status = 0 WHERE contents.ContentID = ? AND therapists.UserID = ? `,
    [data.ContentID, data.UserID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Content deleted successfully");
        } else {
          return callBack("Content not found", null, 404);
        }
      }
    }
  );
};

exports.contentTutorialLinkDelete = (TutorialLinkID, callBack) => {
  db.query(
    `UPDATE content_tutorial_links SET Status = 0 WHERE TutorialLinkID = ? `,
    [TutorialLinkID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else if (results.affectedRows == 1) {
        return callBack(null, "Content tutorial link deleted successfully");
      } else {
        return callBack("Content tutorial link not found", null, 404);
      }
    }
  );
};

exports.contentTutorialLinkDeleteByTutorialLinkIDNClientUserID = (data, callBack) => {
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
            `UPDATE content_tutorial_links INNER JOIN clients ON content_tutorial_links.Create_By = clients.UserID SET content_tutorial_links.Status = 0 WHERE clients.UserID = ? AND content_tutorial_links.TutorialLinkID = ? `,
            [data.UserID, data.TutorialLinkID],
            (error, clientsResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE content_tutorial_links INNER JOIN centers ON content_tutorial_links.Create_By = centers.UserID INNER JOIN clients ON clients.ClientID = centers.ClientID SET content_tutorial_links.Status = 0 WHERE clients.UserID = ? AND content_tutorial_links.TutorialLinkID = ? `,
                  [data.UserID, data.TutorialLinkID],
                  (error, centersResult) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        return callBack(error.message);
                      });
                    } else
                      connection.query(
                        `UPDATE content_tutorial_links INNER JOIN therapists ON content_tutorial_links.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID INNER JOIN clients ON clients.ClientID = centers.ClientID SET content_tutorial_links.Status = 0 WHERE clients.UserID = ? AND content_tutorial_links.TutorialLinkID = ? `,
                        [data.UserID, data.TutorialLinkID],
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
                                return callBack(null, "Content tutorial link deleted successfully");
                              } else {
                                return callBack("Content tutorial link not found", null, 404);
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

exports.contentTutorialLinkDeleteByTutorialLinkIDNCenterUserID = (data, callBack) => {
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
            `UPDATE content_tutorial_links INNER JOIN centers ON content_tutorial_links.Create_By = centers.UserID SET content_tutorial_links.Status = 0 WHERE centers.UserID = ? AND content_tutorial_links.TutorialLinkID = ? `,
            [data.UserID, data.TutorialLinkID],
            (error, centersResult) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return callBack(error.message);
                });
              } else
                connection.query(
                  `UPDATE content_tutorial_links INNER JOIN therapists ON content_tutorial_links.Create_By = therapists.UserID INNER JOIN centers ON therapists.CenterID = centers.CenterID SET content_tutorial_links.Status = 0 WHERE centers.UserID = ? AND content_tutorial_links.TutorialLinkID = ? `,
                  [data.UserID, data.TutorialLinkID],
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
                          return callBack(null, "Content tutorial link deleted successfully");
                        } else {
                          return callBack("Content tutorial link not found", null, 404);
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

exports.contentTutorialLinkDeleteByTutorialLinkIDNTherapistUserID = (data, callBack) => {
  db.query(
    `UPDATE content_tutorial_links INNER JOIN therapists ON content_tutorial_links.Create_By = therapists.UserID SET content_tutorial_links.Status = 0 WHERE content_tutorial_links.TutorialLinkID = ? AND therapists.UserID = ? `,
    [data.TutorialLinkID, data.UserID],
    (error, therapistsResult) => {
      if (error) {
        return callBack(error.message);
      } else {
        if (therapistsResult.affectedRows >= 1) {
          return callBack(null, "Content tutorial link deleted successfully");
        } else {
          return callBack("Content tutorial link not found", null, 404);
        }
      }
    }
  );
};

exports.getContentByCreate_ByNContentId = (data, callBack) => {
  db.query(
    `SELECT * from contents where Create_By = ? AND ContentID = ? `,
    [data.UserID, data.ContentID],
    (error, results) => {
      if (error) {
        callBack(error.message);
      } else return callBack(null, results);
    }
  );
};

function therapyIDUpdates(data, ContentID, connection, done) {
  const addIDs = data?.AddTherapyIDs || [];
  const removeIDs = data?.RemoveTherapyIDs || [];
  const insertStep = (next) => {
    if (!addIDs.length) return next(null);
    const rows = addIDs.map((id) => [ContentID, id, data.UserID]);
    connection.query(
      `INSERT INTO content_therapy_mappings ( ContentID, TherapyID, Create_By ) VALUES ?`,
      [rows],
      (error) => next(error ? error.message : null)
    );
  };
  const deleteStep = (next) => {
    if (!removeIDs.length) return next(null);
    connection.query(
      `DELETE FROM content_therapy_mappings WHERE (TherapyID, ContentID) IN (${arrayToNumberPair(removeIDs, ContentID)})`,
      (error) => next(error ? error.message : null)
    );
  };
  insertStep((error) => { if (error) return done(error); deleteStep(done); });
}

function skillIDUpdates(data, ContentID, connection, done) {
  const addIDs = data?.AddSkillIDs || [];
  const removeIDs = data?.RemoveSkillIDs || [];
  const insertStep = (next) => {
    if (!addIDs.length) return next(null);
    const rows = addIDs.map((id) => [ContentID, id, data.UserID]);
    connection.query(
      `INSERT INTO content_skill_mappings ( ContentID, SkillID, Create_By ) VALUES ?`,
      [rows],
      (error) => next(error ? error.message : null)
    );
  };
  const deleteStep = (next) => {
    if (!removeIDs.length) return next(null);
    connection.query(
      `DELETE FROM content_skill_mappings WHERE (SkillID, ContentID) IN (${arrayToNumberPair(removeIDs, ContentID)})`,
      (error) => next(error ? error.message : null)
    );
  };
  insertStep((error) => { if (error) return done(error); deleteStep(done); });
}
