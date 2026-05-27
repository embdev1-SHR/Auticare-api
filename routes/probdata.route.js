const router = require("express").Router();
const { body } = require("express-validator");
const {
  probdataCreate,
  probdataList,
  probdataUpdate,
  probdataResponseCreate,
  probdataResponseList,
} = require("../controllers/probdata.controller");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Probdata
 *      description: API to manage probdata
 */

/**
 * @swagger
 *   /api/v1/probdatas/patients/{PatientID}:
 *     get:
 *       summary: Probdata List By PatientID
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Probdata
 *       parameters:
 *         - in: path
 *           name: PatientID
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
 *                           $ref: '#/components/schemas/Probdata'
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
router.get(
  "/patients/:PatientID",
  pageAuthorisation(["Therapist", "Patient"]),
  probdataList
);

/**
 * @swagger
 *   /api/v1/probdatas/patients/{PatientID}/responses:
 *     get:
 *       summary: Probdata Responses List By PatientID
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Probdata
 *       parameters:
 *         - in: path
 *           name: PatientID
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
 *                           $ref: '#/components/schemas/ProbdataResponse'
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
router.get(
  "/patients/:PatientID/responses",
  pageAuthorisation(["Therapist", "Patient"]),
  probdataResponseList
);

/**
 * @swagger
 *   /api/v1/probdatas:
 *     post:
 *       summary: Probdata Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Probdata
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   PatientID:
 *                     type: number
 *                     required: true
 *                   Probdatas:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         TargetQuestion:
 *                           type: string
 *                           required: true
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
 *                         example: Probdata added successfully
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
  pageAuthorisation(["Therapist"]),
  [
    body("PatientID").isNumeric().withMessage("Value must be a number"),
    body("Probdatas")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array"),
    body("Probdatas.*.TargetQuestion")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
  ],
  validateRequestSchema,
  probdataCreate
);

/**
 * @swagger
 *   /api/v1/probdatas/patients/{PatientID}:
 *     post:
 *       summary: Probdata Responses Submition
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Probdata
 *       parameters:
 *         - in: path
 *           name: PatientID
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
 *                   Responses:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         ProbdataID:
 *                           type: number
 *                           required: true
 *                         TargetResponse:
 *                           type: string
 *                           required: true
 *                         Date:
 *                           type: string
 *                           required: true
 *                           example: 12/23/2023
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
 *                         example: Probdata response submited successfully
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
  "/patients/:PatientID",
  pageAuthorisation(["Therapist"]),
  [
    body("Responses")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array"),
    body("Responses.*.ProbdataID")
      .isNumeric()
      .withMessage("Value must be a number"),
    body("Responses.*.TargetResponse")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("Responses.*.Date")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format"),
  ],
  validateRequestSchema,
  probdataResponseCreate
);

/**
 * @swagger
 *   /api/v1/probdatas/{ProbdataID}:
 *     put:
 *       summary: Probdata Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Probdata
 *       parameters:
 *         - in: path
 *           name: ProbdataID
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
 *                   TargetQuestion:
 *                     type: string
 *                     required: true
 *                   IsAchieved:
 *                     required: true
 *                     type: boolean
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
 *                         example: Probdata updated successfully
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
 *                         example: Probdata not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:ProbdataID",
  pageAuthorisation(["Therapist"]),
  [
    body("TargetQuestion")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("IsAchieved").isBoolean().withMessage("Value must be boolean").trim(),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  probdataUpdate
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Probdata:
 *       type: object
 *       properties:
 *         ProbDataID:
 *           type: number
 *           example: 8
 *         PatientID:
 *           type: number
 *           example: 8
 *         TargetQuestion:
 *           type: string
 *         IntroDate:
 *           type: string
 *           example: 2022-11-08T16:18:11.000Z
 *         AchieveDate:
 *           type: string
 *           example: 2022-11-08T16:18:11.000Z
 *         IsAchieved:
 *           type: number
 *           example: 0
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
 *     ProbdataResponse:
 *       type: object
 *       properties:
 *         ProbdataResponseID:
 *           type: number
 *           example: 8
 *         ProbDataID:
 *           type: number
 *           example: 8
 *         PatientID:
 *           type: number
 *           example: 8
 *         TargetResponse:
 *           type: string
 *           example: Yes
 *         Date:
 *           type: string
 *           example: 2022-11-08
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
