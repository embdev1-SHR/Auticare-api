const router = require("express").Router();
const { body } = require("express-validator");
const {
  therapyList,
  therapyDetails,
  therapyCreate,
  therapyUpdate,
  therapyDelete,
  therapySearch,
  therapyMappingList,
} = require("../controllers/therapy.controller");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Therapies
 *      description: API to manage therapies
 */

/**
 * @swagger
 *   /api/v1/therapies:
 *     get:
 *       summary: Therapies List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapies
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
 *                           $ref: '#/components/schemas/Therapy'
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
  therapyList
);

/**
 * @swagger
 *   /api/v1/therapies/mappings:
 *     get:
 *       summary: Therapies Mapping List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapies
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
 *                         $ref: '#/components/schemas/TherapyMappings'
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
  "/mappings",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  therapyMappingList
);

/**
 * @swagger
 *   /api/v1/therapies/{TherapyID}:
 *     get:
 *       summary: Therapy Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapies
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
 *                           $ref: '#/components/schemas/Therapy'
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
 *                         example: Therapy not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:TherapyID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  therapyDetails
);

/**
 * @swagger
 *   /api/v1/therapies/search:
 *     post:
 *       summary: Therapy Search
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapies
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   TherapyName:
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
 *                           $ref: '#/components/schemas/Therapy'
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
  [body("TherapyName").trim().escape()],
  validateRequestSchema,
  therapySearch
);

/**
 * @swagger
 *   /api/v1/therapies:
 *     post:
 *       summary: Therapy Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapies
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   TherapyName:
 *                     type: string
 *                     required: true
 *                     example: Verbal
 *                   AgeGroup:
 *                     type: string
 *                     required: true
 *                   Goals:
 *                     example: ["Goal 1", "Goal 2", "Goal 3"]
 *                     type: array
 *                   SkillIDs:
 *                     example: [1,2,3]
 *                     type: array
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
 *                         example: Therapy created successfully
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
    body("TherapyName").not().isEmpty().withMessage("Field is required").trim(),
    body("AgeGroup").not().isEmpty().withMessage("Field is required").trim(),
    body("Goals")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("SkillIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  therapyCreate
);

/**
 * @swagger
 *   /api/v1/therapies/{TherapyID}:
 *     put:
 *       summary: Therapy Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapies
 *       parameters:
 *         - in: path
 *           name: TherapyID
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
 *                   TherapyName:
 *                     type: string
 *                     required: true
 *                     example: Verbal
 *                   AgeGroup:
 *                     type: string
 *                     required: true
 *                   AddGoals:
 *                     example: ["Goal 1", "Goal 2", "Goal 3"]
 *                     type: array
 *                   RemoveGoalIDs:
 *                     example: [1,2,3]
 *                     type: array
 *                   AddSkillIDs:
 *                     example: [1,2,3]
 *                     type: array
 *                   RemoveSkillIDs:
 *                     example: [1,2,3]
 *                     type: array
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
 *                         example: Therapy updated successfully
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
 *                         example: Therapy not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:TherapyID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("TherapyName").not().isEmpty().withMessage("Field is required").trim(),
    body("AgeGroup").not().isEmpty().withMessage("Field is required").trim(),
    body("AddGoals")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("RemoveGoalIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("AddSkillIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("RemoveSkillIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  therapyUpdate
);

/**
 * @swagger
 *   /api/v1/therapies/{TherapyID}:
 *     delete:
 *       summary: Therapy Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapies
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
 *                       message:
 *                         type: string
 *                         example: Therapy deleted successfully
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
 *                         example: Therapy not found
 *         "500":
 *           description: Internal server error
 */
router.delete(
  "/:TherapyID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  therapyDelete
);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Therapy:
 *       type: object
 *       properties:
 *         TherapyID:
 *           type: number
 *           example: 8
 *         TherapyName:
 *           type: string
 *           example: Verbal
 *         AgeGroup:
 *           type: string
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

/**
 * @swagger
 * components:
 *   schemas:
 *     TherapyMappings:
 *       type: object
 *       properties:
 *         Goals:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               GoalID:
 *                 type: number
 *               TherapyID:
 *                 type: number
 *               GoalName:
 *                 type: string
 *         TherapySkillMappings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               SkillID:
 *                 type: number
 *               TherapyID:
 *                 type: number
 *               SkillName:
 *                 type: string
 */
