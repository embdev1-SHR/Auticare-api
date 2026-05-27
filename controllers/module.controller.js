// const { moduleRoleBasedList } = require("../services/module.service");

// exports.moduleRoleBasedList = (req, res) => {
//   const data = {
//     RoleID: req.userData.RoleID,
//   };
//   moduleRoleBasedList(data.RoleID, (error, results) => {
//     if (error) {
//       console.log(error);
//       return res
//         .status(500)
//         .send({ success: false, errors: { message: error } });
//     }
//     return res.status(200).send({
//       success: true,
//       results: { data: results },
//     });
//   });
// };
