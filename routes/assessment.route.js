const router = require("express").Router();
const { body } = require("express-validator");
const {
  assessmentList,
  assessmentDetails,
  assessmentCreate,
  assessmentUpdate,
  assessmentDelete,
  assessmentSearch,
} = require("../controllers/assessment.controller");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Assessments
 *      description: API to manage assessments
 */

/**
 * @swagger
 *   /api/v1/assessments:
 *     get:
 *       summary: Assessments List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Assessments
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
 *                           $ref: '#/components/schemas/Assessment'
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
  assessmentList
);

/**
 * @swagger
 *   /api/v1/assessments/{AssessmentID}:
 *     get:
 *       summary: Assessment Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Assessments
 *       parameters:
 *         - in: path
 *           name: AssessmentID
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
 *                           $ref: '#/components/schemas/Assessment'
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
 *                         example: Assessment not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:AssessmentID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  assessmentDetails
);

/**
 * @swagger
 *   /api/v1/assessments/search:
 *     post:
 *       summary: Assessment Search
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Assessments
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   AssessmentName:
 *                     type: string
 *                     required: false
 *                     example: Communication
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
 *                           $ref: '#/components/schemas/Assessment'
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
  [body("AssessmentName").trim().escape()],
  validateRequestSchema,
  assessmentSearch
);

/**
 * @swagger
 *   /api/v1/assessments:
 *     post:
 *       summary: Assessment Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Assessments
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   AssessmentName:
 *                     type: string
 *                     required: true
 *                     example: Adaptability
 *                   Accreditation:
 *                     type: string
 *                     required: true
 *                   AssessmentCategory:
 *                     type: string
 *                     required: true
 *                     example: Standardized
 *                   ScaleID:
 *                     type: number
 *                     required: true
 *                     example: 15
 *                   SkillID:
 *                     type: number
 *                     required: true
 *                     example: 21
 *                   RegionIDs:
 *                     required: true
 *                     example: [1, 2, 1]
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
 *                         example: Assessment created successfully
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
    body("AssessmentName")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("Accreditation")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("AssessmentCategory")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ScaleID").isNumeric().withMessage("Value must be a number").trim(),
    body("SkillID").isNumeric().withMessage("Value must be a number").trim(),
    body("RegionIDs").not().isEmpty().withMessage("Field is required").trim(),
  ],
  validateRequestSchema,
  assessmentCreate
);

/**
 * @swagger
 *   /api/v1/assessments/{AssessmentID}:
 *     put:
 *       summary: Assessment Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Assessments
 *       parameters:
 *         - in: path
 *           name: AssessmentID
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
 *                   AssessmentName:
 *                     type: string
 *                     required: true
 *                     example: Adaptability
 *                   Accreditation:
 *                     type: string
 *                     required: true
 *                   AssessmentCategory:
 *                     type: string
 *                     required: true
 *                     example: Standardized
 *                   ScaleID:
 *                     type: number
 *                     required: true
 *                     example: 15
 *                   SkillID:
 *                     type: number
 *                     required: true
 *                     example: 21
 *                   RegionIDs:
 *                     required: true
 *                     example: [1, 2, 1]
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
 *                         example: Assessment updated successfully
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
 *                         example: Assessment not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:AssessmentID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("AssessmentName")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("Accreditation")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("AssessmentCategory")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ScaleID").isNumeric().withMessage("Value must be a number").trim(),
    body("SkillID").isNumeric().withMessage("Value must be a number").trim(),
    body("RegionIDs").isNumeric().withMessage("Value must be a number").trim(),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  assessmentUpdate
);

/**
 * @swagger
 *   /api/v1/assessments/{AssessmentID}:
 *     delete:
 *       summary: Assessment Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Assessments
 *       parameters:
 *         - in: path
 *           name: AssessmentID
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
 *                         example: Assessment deleted successfully
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
 *                         example: Assessment not found
 *         "500":
 *           description: Internal server error
 */
router.delete(
  "/:AssessmentID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  assessmentDelete
);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Assessment:
 *       type: object
 *       properties:
 *         AssessmentID:
 *           type: number
 *           example: 8
 *         AssessmentName:
 *           type: string
 *           example: Adaptability
 *         Accreditation:
 *           type: string
 *         AssessmentCategory:
 *           type: string
 *           example: Standardized
 *         ScaleID:
 *           type: number
 *           example: 15
 *         SkillID:
 *           type: number
 *           example: 21
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
