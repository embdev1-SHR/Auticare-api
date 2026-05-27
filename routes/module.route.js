// const router = require("express").Router();
// const { moduleRoleBasedList } = require("../controllers/module.controller");
// const { pageAuthorisation } = require("../middleware/authorization");

// /**
//  *  @swagger
//  *    tags:
//  *      name: Modules
//  *      description: API to manage modules
//  */

// /**
//  * @swagger
//  *   /api/v1/modules/role-based:
//  *     get:
//  *       summary: Modules List Based on Role
//  *       security:
//  *        - bearerAuth: []
//  *       tags:
//  *         - Modules
//  *       responses:
//  *         "200":
//  *           description: Request was successful
//  *           content:
//  *             application/json:
//  *               schema:
//  *                 type: object
//  *                 properties:
//  *                   success:
//  *                     type: boolean
//  *                     description: If the request is falied or not
//  *                   results:
//  *                     type: object
//  *                     properties:
//  *                       data:
//  *                         type: array
//  *                         items:
//  *                           $ref: '#/components/schemas/Module'
//  *         "401":
//  *           description: Unauthorized
//  *           content:
//  *             application/json:
//  *               schema:
//  *                 $ref: '#/components/schemas/401'
//  *         "403":
//  *           description: Forbidden
//  *           content:
//  *             application/json:
//  *               schema:
//  *                 $ref: '#/components/schemas/403'
//  *         "500":
//  *           description: Internal server error
//  */
// router.get(
//   "/role-based",
//   pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
//   moduleRoleBasedList
// );

// module.exports = router;

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Module:
//  *       type: object
//  *       properties:
//  *         ModuleID:
//  *           type: number
//  *           example: 8
//  *         ModuleName:
//  *           type: string
//  *           example: Dashboard
//  *         ModuleType:
//  *           type: string
//  *           example: Default
//  *         Create_TS:
//  *           type: string
//  *           example: 2022-11-08T16:18:11.000Z
//  *         Update_TS:
//  *           type: string
//  *           format: nullable
//  *         Create_By:
//  *           type: number
//  *           example: 1
//  *         Update_By:
//  *           type: number
//  *           format: nullable
//  */
