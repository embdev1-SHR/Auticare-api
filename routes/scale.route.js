const router = require("express").Router();
const { body, param } = require("express-validator");
const {
  scaleList,
  scaleDetails,
  scaleCreate,
  scaleUpdate,
  scaleDelete,
  scaleSearch,
  scaleScreeningQuestionList,
  scaleScreeningCreate,
  scaleScreeningUpdate,
  scaleAssessmentUpdate,
  scaleAssessmentCreate,
  scaleAssessmentQuestionList,
  scaleMetricDelete,
  ScaleScreeningScoreCriteriaUpdate,
} = require("../controllers/scale.controller");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Scales
 *      description: API to manage scales
 */

/**
 * @swagger
 *   /api/v1/scales:
 *     get:
 *       summary: Scales List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
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
 *                           $ref: '#/components/schemas/Scale'
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
router.get("/", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), scaleList);

/**
 * @swagger
 *   /api/v1/scales/{ScaleID}/screening:
 *     get:
 *       summary: Scale Screening Question List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       parameters:
 *         - in: path
 *           name: ScaleID
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
 *                           $ref: '#/components/schemas/ScaleScreening'
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
 *                         example: Scale not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:ScaleID/screening",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  scaleScreeningQuestionList
);

/**
 * @swagger
 *   /api/v1/scales/{ScaleID}/assessment:
 *     get:
 *       summary: Scale Assessment Question List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       parameters:
 *         - in: path
 *           name: ScaleID
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
 *                           $ref: '#/components/schemas/ScaleAssessment'
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
 *                         example: Scale not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:ScaleID/assessment",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  scaleAssessmentQuestionList
);

/**
 * @swagger
 *   /api/v1/scales/{ScaleID}:
 *     get:
 *       summary: Scale Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       parameters:
 *         - in: path
 *           name: ScaleID
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
 *                           $ref: '#/components/schemas/Scale'
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
 *                         example: Scale not found
 *         "500":
 *           description: Internal server error
 */
router.get("/:ScaleID", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), scaleDetails);

/**
 * @swagger
 *   /api/v1/scales/search:
 *     post:
 *       summary: Scale Search
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ScaleName:
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
 *                           $ref: '#/components/schemas/Scale'
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
  [body("ScaleName").trim().escape()],
  validateRequestSchema,
  scaleSearch
);

/**
 * @swagger
 *   /api/v1/scales:
 *     post:
 *       summary: Scale Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ScaleName:
 *                     type: string
 *                     required: true
 *                     example: Adaptability
 *                   Accreditation:
 *                     type: string
 *                     required: true
 *                   ScaleCategory:
 *                     type: string
 *                     required: true
 *                     example: Standardized
 *                   ScaleMetric:
 *                     type: string
 *                     required: true
 *                     example: Screening
 *                   ScaleMetricType:
 *                     type: string
 *                     required: true
 *                     example: ISSA
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
 *                         example: Scale created successfully
 *                       insertId:
 *                         type: number
 *                         example: 8
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
    body("ScaleName").not().isEmpty().withMessage("Field is required").trim(),
    body("Accreditation").not().isEmpty().withMessage("Field is required").trim(),
    body("ScaleCategory").not().isEmpty().withMessage("Field is required").trim(),
    body("ScaleMetric").not().isEmpty().withMessage("Field is required").trim(),
    body("ScaleMetricType").not().isEmpty().withMessage("Field is required").trim(),
    body("SkillIDs")
    .isArray()
    .not()
    .isEmpty()
    .withMessage("Value must be an array")
    .optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  scaleCreate
);

/**
 * @swagger
 *   /api/v1/scales/{ScaleID}/screening:
 *     post:
 *       summary: Scale Screening Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       parameters:
 *         - in: path
 *           name: ScaleID
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
 *                   CategoryID:
 *                     type: number
 *                     example: 8
 *                   ScaleID:
 *                     type: number
 *                     example: 8
 *                   ContentID:
 *                     type: number
 *                     example: 8
 *                   QuestionNumber:
 *                     type: number
 *                     example: 1
 *                   Question:
 *                     type: string
 *                   ResponseOption1:
 *                     type: string
 *                     example: Every Time
 *                   ResponseScore1:
 *                     type: number
 *                     example: 1
 *                   ResponseOption2:
 *                     type: string
 *                     example: Every Time
 *                   ResponseScore2:
 *                     type: number
 *                     example: 1
 *                   ResponseOption3:
 *                     type: string
 *                     example: Every Time
 *                   ResponseScore3:
 *                     type: number
 *                     example: 1
 *                   ResponseOption4:
 *                     type: string
 *                     example: Every Time
 *                   ResponseScore4:
 *                     type: number
 *                     example: 1
 *                   ResponseOption5:
 *                     type: string
 *                     example: Every Time
 *                   ResponseScore5:
 *                     type: number
 *                     example: 1
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
 *                         example: Scale created successfully
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
  "/:ScaleID/screening",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("CategoryID").isNumeric().withMessage("Value must be a number"),
    body("ScaleID").isNumeric().withMessage("Value must be a number"),
    body("ContentID").isNumeric().withMessage("Value must be a number"),
    body("QuestionNumber").isNumeric().withMessage("Value must be a number"),
    body("Question").not().isEmpty().withMessage("Field is required").trim(),
    body("ResponseOption1").not().isEmpty().withMessage("Field is required").trim(),
    body("ResponseScore1").isNumeric().withMessage("Value must be a number"),
    body("ResponseOption2").not().isEmpty().withMessage("Field is required").trim(),
    body("ResponseScore2").isNumeric().withMessage("Value must be a number"),
    body("ResponseOption3").trim(),
    body("ResponseScore3").isNumeric().withMessage("Value must be a number").optional({ checkFalsy: true }),
    body("ResponseOption4").trim(),
    body("ResponseScore4").isNumeric().withMessage("Value must be a number").optional({ checkFalsy: true }),
    body("ResponseOption5").trim(),
    body("ResponseScore5").isNumeric().withMessage("Value must be a number").optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  scaleScreeningCreate
);

/**
 * @swagger
 *   /api/v1/scales/{ScaleID}/assessment:
 *     post:
 *       summary: Scale Assessment Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       parameters:
 *         - in: path
 *           name: ScaleID
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
 *                   CategoryID:
 *                     type: number
 *                     example: 8
 *                   ScaleID:
 *                     type: number
 *                     example: 8
 *                   ContentID:
 *                     type: number
 *                     example: 8
 *                   QuestionNumber:
 *                     type: number
 *                     example: 1
 *                   Question:
 *                     type: string
 *                   NumberOfScore:
 *                     type: number
 *                     example: 4
 *                   TaskObjective:
 *                     type: string
 *                   TaskName:
 *                     type: string
 *                   Example:
 *                     type: string
 *                   Criteria:
 *                     type: string
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
 *                         example: Scale created successfully
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
  "/:ScaleID/assessment",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("CategoryID").isNumeric().withMessage("Value must be a number"),
    body("ScaleID").isNumeric().withMessage("Value must be a number"),
    body("ContentID").isNumeric().withMessage("Value must be a number"),
    body("QuestionNumber").isNumeric().withMessage("Value must be a number"),
    body("Question").not().isEmpty().withMessage("Field is required").trim(),
    body("NumberOfScore").isNumeric().withMessage("Value must be a number"),
    body("TaskObjective").not().isEmpty().withMessage("Field is required").trim(),
    body("TaskName").not().isEmpty().withMessage("Field is required").trim(),
    body("Example").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("Criteria").not().isEmpty().withMessage("Field is required").trim(),
  ],
  validateRequestSchema,
  scaleAssessmentCreate
);

/**
 * @swagger
 *   /api/v1/scales/{ScaleID}:
 *     put:
 *       summary: Scale Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       parameters:
 *         - in: path
 *           name: ScaleID
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
 *                   ScaleName:
 *                     type: string
 *                     required: true
 *                     example: Adaptability
 *                   Accreditation:
 *                     type: string
 *                     required: true
 *                   ScaleCategory:
 *                     type: string
 *                     required: true
 *                     example: Standardized
 *                   ScaleMetric:
 *                     type: string
 *                     required: true
 *                     example: Screening
 *                   ScaleMetricType:
 *                     type: string
 *                     required: true
 *                     example: ISSA
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
 *                         example: Scale updated successfully
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
 *                         example: Scale not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:ScaleID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("ScaleName").not().isEmpty().withMessage("Field is required").trim(),
    body("Accreditation").not().isEmpty().withMessage("Field is required").trim(),
    body("ScaleCategory").not().isEmpty().withMessage("Field is required").trim(),
    body("ScaleMetric").not().isEmpty().withMessage("Field is required").trim(),
    body("ScaleMetricType").not().isEmpty().withMessage("Field is required").trim(),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  scaleUpdate
);

/**
 * @swagger
 *   /api/v1/scales/{ScaleID}/score-criteria:
 *     put:
 *       summary: Scale Screening Score Criteria Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       parameters:
 *         - in: path
 *           name: ScaleID
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
 *                   NoAutismScore:
 *                     type: number
 *                     required: true
 *                     example: 70
 *                   MildAutismScore:
 *                     type: number
 *                     required: true
 *                     example: 106
 *                   ModerateAutismScore:
 *                     type: number
 *                     required: true
 *                     example: 153
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
 *                         example: Screening Score Criteria updated successfully
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
 *                         example: Scale not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:ScaleID/score-criteria",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("NoAutismScore").isNumeric().withMessage("Value must be a number"),
    body("MildAutismScore").isNumeric().withMessage("Value must be a number"),
    body("ModerateAutismScore").isNumeric().withMessage("Value must be a number"),
  ],
  validateRequestSchema,
  ScaleScreeningScoreCriteriaUpdate
);

/**
 * @swagger
 *   /api/v1/scales/{ScaleID}/screening/{MetricID}:
 *     put:
 *       summary: Scale Screening Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       parameters:
 *         - in: path
 *           name: ScaleID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: path
 *           name: MetricID
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
 *                   CategoryID:
 *                     type: number
 *                     example: 8
 *                   ContentID:
 *                     type: number
 *                     example: 8
 *                   QuestionNumber:
 *                     type: number
 *                     example: 1
 *                   Question:
 *                     type: string
 *                   ResponseOption1:
 *                     type: string
 *                     example: Every Time
 *                   ResponseScore1:
 *                     type: number
 *                     example: 1
 *                   ResponseOption2:
 *                     type: string
 *                     example: Every Time
 *                   ResponseScore2:
 *                     type: number
 *                     example: 1
 *                   ResponseOption3:
 *                     type: string
 *                     example: Every Time
 *                   ResponseScore3:
 *                     type: number
 *                     example: 1
 *                   ResponseOption4:
 *                     type: string
 *                     example: Every Time
 *                   ResponseScore4:
 *                     type: number
 *                     example: 1
 *                   ResponseOption5:
 *                     type: string
 *                     example: Every Time
 *                   ResponseScore5:
 *                     type: number
 *                     example: 1
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
 *                         example: Scale updated successfully
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
 *                         example: Scale not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:ScaleID/screening/:MetricID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("CategoryID").isNumeric().withMessage("Value must be a number"),
    body("ContentID").isNumeric().withMessage("Value must be a number"),
    body("QuestionNumber").isNumeric().withMessage("Value must be a number"),
    body("Question").not().isEmpty().withMessage("Field is required").trim(),
    body("ResponseOption1").not().isEmpty().withMessage("Field is required").trim(),
    body("ResponseScore1").isNumeric().withMessage("Value must be a number"),
    body("ResponseOption2").not().isEmpty().withMessage("Field is required").trim(),
    body("ResponseScore2").isNumeric().withMessage("Value must be a number"),
    body("ResponseOption3").trim(),
    body("ResponseScore3").isNumeric().withMessage("Value must be a number").optional({ checkFalsy: true }),
    body("ResponseOption4").trim(),
    body("ResponseScore4").isNumeric().withMessage("Value must be a number").optional({ checkFalsy: true }),
    body("ResponseOption5").trim(),
    body("ResponseScore5").isNumeric().withMessage("Value must be a number").optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  scaleScreeningUpdate
);

/**
 * @swagger
 *   /api/v1/scales/{ScaleID}/assessment/{MetricID}:
 *     put:
 *       summary: Scale Assessment Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       parameters:
 *         - in: path
 *           name: ScaleID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: path
 *           name: MetricID
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
 *                   CategoryID:
 *                     type: number
 *                     example: 8
 *                   ContentID:
 *                     type: number
 *                     example: 8
 *                   QuestionNumber:
 *                     type: number
 *                     example: 1
 *                   Question:
 *                     type: string
 *                   NumberOfScore:
 *                     type: number
 *                     example: 4
 *                   TaskObjective:
 *                     type: string
 *                   TaskName:
 *                     type: string
 *                   Example:
 *                     type: string
 *                   Criteria:
 *                     type: string
 *                   ResponseScore5:
 *                     type: number
 *                     example: 1
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
 *                         example: Scale updated successfully
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
 *                         example: Scale not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:ScaleID/assessment/:MetricID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("CategoryID").isNumeric().withMessage("Value must be a number"),
    body("ContentID").isNumeric().withMessage("Value must be a number"),
    body("QuestionNumber").isNumeric().withMessage("Value must be a number"),
    body("Question").not().isEmpty().withMessage("Field is required").trim(),
    body("NumberOfScore").isNumeric().withMessage("Value must be a number"),
    body("TaskObjective").not().isEmpty().withMessage("Field is required").trim(),
    body("TaskName").not().isEmpty().withMessage("Field is required").trim(),
    body("Example").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("Criteria").not().isEmpty().withMessage("Field is required").trim(),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  scaleAssessmentUpdate
);

/**
 * @swagger
 *   /api/v1/scales/{ScaleID}:
 *     delete:
 *       summary: Scale Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       parameters:
 *         - in: path
 *           name: ScaleID
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
 *                         example: Scale deleted successfully
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
 *                         example: Scale not found
 *         "500":
 *           description: Internal server error
 */
router.delete("/:ScaleID", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), scaleDelete);

/**
 * @swagger
 *   /api/v1/scales/{MetricID}/{ScaleMetricType}:
 *     delete:
 *       summary: Scale Metric Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Scales
 *       parameters:
 *         - in: path
 *           name: MetricID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: path
 *           name: ScaleMetricType
 *           description: Value Must be Screening or Assessment
 *           required: true
 *           schema:
 *             type: string
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
 *                         example: Scale metric deleted successfully
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
 *                         example: Scale metric not found
 *         "500":
 *           description: Internal server error
 */
router.delete(
  "/:MetricID/:ScaleMetricType",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  param("ScaleMetricType")
    .isString()
    .withMessage("Field must be a String")
    .isIn(["Screening", "Assessment"])
    .withMessage("Field contains invalid value")
    .trim(),
  validateRequestSchema,
  scaleMetricDelete
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Scale:
 *       type: object
 *       properties:
 *         ScaleID:
 *           type: number
 *           example: 8
 *         ScaleName:
 *           type: string
 *           example: Adaptability
 *         Accreditation:
 *           type: string
 *         ScaleCategory:
 *           type: string
 *           example: Standardized
 *         ScaleMetric:
 *           type: string
 *           example: Screening
 *         ScaleMetricType:
 *           type: string
 *           example: ISSA
 *         ScaleType:
 *           type: string
 *           example: Default
 *         NoAutismScore:
 *           type: number
 *           example: 70
 *         MildAutismScore:
 *           type: number
 *           example: 106
 *         ModerateAutismScore:
 *           type: number
 *           example: 153
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
 *     ScaleScreening:
 *       type: object
 *       properties:
 *         CategoryName:
 *           type: string
 *         MetricID:
 *           type: number
 *           example: 8
 *         CategoryID:
 *           type: number
 *           example: 8
 *         ScaleID:
 *           type: number
 *           example: 8
 *         ContentID:
 *           type: number
 *           example: 8
 *         QuestionNumber:
 *           type: number
 *           example: 1
 *         Question:
 *           type: string
 *         ResponseOption1:
 *           type: string
 *           example: Every Time
 *         ResponseScore1:
 *           type: number
 *           example: 1
 *         ResponseOption2:
 *           type: string
 *           example: Every Time
 *         ResponseScore2:
 *           type: number
 *           example: 1
 *         ResponseOption3:
 *           type: string
 *           example: Every Time
 *         ResponseScore3:
 *           type: number
 *           example: 1
 *         ResponseOption4:
 *           type: string
 *           example: Every Time
 *         ResponseScore4:
 *           type: number
 *           example: 1
 *         ResponseOption5:
 *           type: string
 *           example: Every Time
 *         ResponseScore5:
 *           type: number
 *           example: 1
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
 *     ScaleAssessment:
 *       type: object
 *       properties:
 *         CategoryName:
 *           type: string
 *         MetricID:
 *           type: number
 *           example: 8
 *         CategoryID:
 *           type: number
 *           example: 8
 *         ScaleID:
 *           type: number
 *           example: 8
 *         ContentID:
 *           type: number
 *           example: 8
 *         QuestionNumber:
 *           type: number
 *           example: 1
 *         Question:
 *           type: string
 *         NumberOfScore:
 *           type: number
 *           example: 4
 *         TaskObjective:
 *           type: string
 *         TaskName:
 *           type: string
 *         Example:
 *           type: string
 *         Criteria:
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
