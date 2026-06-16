const router = require("express").Router();
const { userDetails, updateProfile } = require("../controllers/user.controller");
const { body } = require("express-validator");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Users
 *      description: API to manage users
 */

/**
 * @swagger
 *   /api/v1/users/details:
 *     get:
 *       summary: Loggedin User Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Users
 *       responses:
 *         "200":
 *           description: Request was successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: If the request is falied or not
 *                   results:
 *                     type: object
 *                     properties:
 *                       data:
 *                         type: object
 *                         properties:
 *                           UserID:
 *                             type: number
 *                           RoleName:
 *                             type: string
 *                           EmailId:
 *                             type: string
 *                           RoleID:
 *                             type: number
 *                           RoleBasedModules:
 *                             type: array
 *                             items:
 *                               $ref: '#/components/schemas/RoleBasedModules'
 *                           SubscriptionPlan:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 SubscriptionPlanId:
 *                                   type: number
 *                                   example: 8
 *                                 PlanName:
 *                                   type: string
 *                                   example: Gold
 *                                 Contents:
 *                                   type: string
 *                                 NumberOfPlanActiveDays:
 *                                   type: number
 *                                   example: 1
 *                                 Frequency:
 *                                   type: string
 *                                   example: Monthly
 *                                 NumberofTherapists:
 *                                   type: number
 *                                   example: 1
 *                                 NumberofPatients:
 *                                   type: number
 *                                   example: 1
 *                                 NumberofCustomScales:
 *                                   type: number
 *                                   example: 1
 *                                 NumberofCustomSkills:
 *                                   type: number
 *                                   example: 1
 *                                 NumberofCustomAssessment:
 *                                   type: number
 *                                   example: 1
 *                                 NumberofCustomContents:
 *                                   type: number
 *                                   example: 1
 *                                 Price:
 *                                   type: number
 *                                   example: 1
 *                                 OnetimeFee:
 *                                   type: number
 *                                   example: 1
 *                                 PlanType:
 *                                   type: string
 *                                 Status:
 *                                   type: number
 *                                   example: 1
 *                                 Create_TS:
 *                                   type: string
 *                                   example: 2022-11-08T16:18:11.000Z
 *                                 Update_TS:
 *                                   type: string
 *                                   format: nullable
 *                                 Create_By:
 *                                   type: number
 *                                   example: 1
 *                                 Update_By:
 *                                   type: number
 *                                   format: nullable
 *                                 SubscriptionPlanActivatedDate:
 *                                   type: string
 *                                   example: 2022-11-08T16:18:11.000Z
 *                                 SubcriptionPlanEndDate:
 *                                   type: string
 *                                   example: 2022-11-08T16:18:11.000Z
 *         "401":
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/401'
 *         "403":
 *           description: Forbidden
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/403'
 *         "500":
 *           description: Internal server error
 */

router.get("/details", pageAuthorisation(["SuperAdmin", "Admin", "ClientAdmin", "Center", "Therapist"]), userDetails);

router.put(
  "/profile",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [body("UserName").not().isEmpty().withMessage("Name is required").trim()],
  validateRequestSchema,
  updateProfile
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     RoleBasedModules:
 *       type: object
 *       properties:
 *         ModuleID:
 *           type: number
 *           example: 8
 *         ModuleName:
 *           type: string
 *           example: ClientManagement
 *         ModuleType:
 *           type: string
 *           example: Default
 */
