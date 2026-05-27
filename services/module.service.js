const db = require("../config/db.config");

exports.moduleRoleBasedList = (RoleID, callBack) => {
  db.query(
    `SELECT modules.ModuleID, modules.ModuleName, modules.ModuleType FROM role_module_mappings INNER JOIN modules ON role_module_mappings.ModuleID = modules.ModuleID WHERE RoleID = ?`,
    [RoleID],
    (error, results) => {
      if (error) {
        return callBack(error.message);
      } else return callBack(null, results);
    }
  );
};
