/**
 * devLicence.service.js — the one developer key
 * ══════════════════════════════════════════════════════════════════
 *
 * A single licence key owned by Auticare, not by any centre. It exists so
 * the team can install the wall app on their own machines and test without
 * consuming a customer's device allowance or appearing in a customer's
 * records at all.
 *
 * WHY NOT A CENTRE WITH MaxDevices = 0
 *
 * That was the first design and it was wrong for two reasons. A centre row
 * needs a ClientID and a UserID it does not really have, so it means
 * inventing a customer; and it then shows up in the centres list, the
 * client's centre count, and any report that walks that table. A developer
 * key is not a customer and should not be filed as one.
 *
 * So it lives in its own table with exactly one row, and `center-auth`
 * checks it before it looks at `centers`.
 *
 * VISIBILITY IS DELIBERATELY NARROW
 *
 * Only the Auticare admin account can read it, because anyone holding this
 * key can activate the app anywhere, without limit. It is never returned by
 * any centre endpoint and never included in a centre listing.
 *
 * REVOKING is a regenerate: the old key stops authenticating immediately
 * and every device running on it fails its next token refresh.
 */
const db = require("../config/db.config");
const { randomBytes } = require("crypto");

/* The identity the wall app is handed when it activates on this key. It is
   not a real centre, and CenterID 0 is what tells registerDevice to skip the
   device limit rather than look one up. */
const DEV_CENTER_ID = 0;
const DEV_CENTER = {
  CenterID: DEV_CENTER_ID,
  CenterName: "Auticare Developer Licence",
  CenterType: "Developer",
  ClientID: 0,
  ClientName: "Auticare",
  CenterHeadName: "Auticare",
  CenterHeadEmailId: "",
  CenterHeadPhone: "",
  UserID: 0,
  EmailId: "",
  Phone: "",
};

function newKey() {
  return randomBytes(32).toString("hex");
}

/** Created on first read, so there is no migration step to forget. */
const ensureTable = (callBack) => {
  db.query(
    `CREATE TABLE IF NOT EXISTS dev_licence (
       id          TINYINT      NOT NULL PRIMARY KEY,
       api_key     VARCHAR(128) NOT NULL,
       note        VARCHAR(255) NULL,
       Create_TS   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
       Update_TS   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       UNIQUE KEY uq_dev_key (api_key)
     )`,
    (error) => (error ? callBack(error.message) : callBack(null))
  );
};

/** The key, minting one the first time it is asked for. */
exports.getDevLicence = (callBack) => {
  ensureTable((e0) => {
    if (e0) return callBack(e0);
    db.query(`SELECT api_key, note, Create_TS, Update_TS FROM dev_licence WHERE id = 1`, (e1, rows) => {
      if (e1) return callBack(e1.message);
      if (rows.length) {
        return callBack(null, {
          CenterApiKey: rows[0].api_key,
          note: rows[0].note,
          createdAt: rows[0].Create_TS,
          updatedAt: rows[0].Update_TS,
        });
      }
      const key = newKey();
      db.query(
        `INSERT INTO dev_licence (id, api_key, note) VALUES (1, ?, ?)`,
        [key, "Auticare internal testing"],
        (e2) => (e2 ? callBack(e2.message) : callBack(null, { CenterApiKey: key, note: "Auticare internal testing" }))
      );
    });
  });
};

/** Revoke by replacement: the old key stops working immediately. */
exports.regenerateDevLicence = (callBack) => {
  ensureTable((e0) => {
    if (e0) return callBack(e0);
    const key = newKey();
    db.query(
      `INSERT INTO dev_licence (id, api_key) VALUES (1, ?)
       ON DUPLICATE KEY UPDATE api_key = VALUES(api_key)`,
      [key],
      (e1) => (e1 ? callBack(e1.message) : callBack(null, { CenterApiKey: key }))
    );
  });
};

/**
 * Does this key authenticate as the developer licence?
 * Called by center-auth BEFORE it looks in `centers`, so a developer key
 * never touches customer data.
 */
exports.matchDevLicence = (apiKey, callBack) => {
  if (!apiKey) return callBack(null, null);
  ensureTable((e0) => {
    if (e0) return callBack(e0);
    db.query(`SELECT api_key FROM dev_licence WHERE id = 1 AND api_key = ?`, [apiKey], (e1, rows) => {
      if (e1) return callBack(e1.message);
      callBack(null, rows.length ? Object.assign({}, DEV_CENTER) : null);
    });
  });
};

exports.DEV_CENTER_ID = DEV_CENTER_ID;
exports.DEV_CENTER = DEV_CENTER;
