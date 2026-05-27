const router = require("express").Router();
const { body } = require("express-validator");
const {
  goalList,
  goalDetails,
  goalCreate,
  goalUpdate,
  goalDelete,
  goalSearch,
  goalListByTherapyID,
} = require("../controllers/goal.controller");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Goals
 *      description: API to manage goals
 */

/**
 * @swagger
 *   /api/v1/goals:
 *     get:
 *       summary: Goals List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Goals
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
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Goal'
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
router.get(
  "/",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  goalList
);

/**
 * @swagger
 *   /api/v1/goals/therapies/{TherapyID}:
 *     get:
 *       summary: Goals List By TherapyID
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Goals
 *       parameters:
 *         - in: path
 *           name: TherapyID
 *           required: true
 *           schema:
 *             type: integer
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
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Goal'
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
router.get(
  "/therapies/:TherapyID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  goalListByTherapyID
);

/**
 * @swagger
 *   /api/v1/goals/{GoalID}:
 *     get:
 *       summary: Goal Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Goals
 *       parameters:
 *         - in: path
 *           name: GoalID
 *           required: true
 *           schema:
 *             type: integer
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
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Goal'
 *         "400":
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/400'
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
 *         "404":
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: If the request is falied or not
 *                     example: false
 *                   errors:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Goal not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:GoalID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  goalDetails
);

/**
 * @swagger
 *   /api/v1/goals/search:
 *     post:
 *       summary: Goal Search
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Goals
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   GoalName:
 *                     type: string
 *                     required: true
 *                     example: Verbal
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
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Goal'
 *         "400":
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/400'
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
router.post(
  "/search",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [body("GoalName").trim().escape()],
  validateRequestSchema,
  goalSearch
);

/**
 * @swagger
 *   /api/v1/goals:
 *     post:
 *       summary: Goal Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Goals
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   TherapyID:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   GoalName:
 *                     type: string
 *                     required: true
 *                     example: Make a gesture
 *       responses:
 *         "201":
 *           description: Created
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
 *                       message:
 *                         type: string
 *                         example: Goal created successfully
 *         "400":
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/400'
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
router.post(
  "/",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("TherapyID").isNumeric().withMessage("Value must be a number"),
    body("GoalName")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      ,
  ],
  validateRequestSchema,
  goalCreate
);

/**
 * @swagger
 *   /api/v1/goals/{GoalID}:
 *     put:
 *       summary: Goal Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Goals
 *       parameters:
 *         - in: path
 *           name: GoalID
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   TherapyID:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   GoalName:
 *                     type: string
 *                     required: true
 *                     example: Make a gesture
 *                   Status:
 *                     required: true
 *                     type: boolean
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
 *                       message:
 *                         type: string
 *                         example: Goal updated successfully
 *         "400":
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/400'
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
 *         "404":
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: If the request is falied or not
 *                     example: false
 *                   errors:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Goal not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:GoalID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("TherapyID").isNumeric().withMessage("Value must be a number"),
    body("GoalName")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      ,
    body("Status")
      .isBoolean()
      .withMessage("Value must be boolean")
      .trim()
      ,
  ],
  validateRequestSchema,
  goalUpdate
);

/**
 * @swagger
 *   /api/v1/goals/{GoalID}:
 *     delete:
 *       summary: Goal Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Goals
 *       parameters:
 *         - in: path
 *           name: GoalID
 *           required: true
 *           schema:
 *             type: integer
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
 *                       message:
 *                         type: string
 *                         example: Goal deleted successfully
 *         "400":
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/400'
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
 *         "404":
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: If the request is falied or not
 *                     example: false
 *                   errors:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Goal not found
 *         "500":
 *           description: Internal server error
 */
router.delete(
  "/:GoalID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  goalDelete
);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Goal:
 *       type: object
 *       properties:
 *         GoalID:
 *           type: number
 *           example: 8
 *         TherapyID:
 *           type: number
 *           example: 1
 *         GoalName:
 *           type: string
 *           example: Make a gesture
 *         Status:
 *           type: number
 *           example: 1
 *         Create_TS:
 *           type: string
 *           example: 2022-11-08T16:18:11.000Z
 *         Update_TS:
 *           type: string
 *           format: nullable
 *         Create_By:
 *           type: number
 *           example: 1
 *         Update_By:
 *           type: number
 *           format: nullable
 */
