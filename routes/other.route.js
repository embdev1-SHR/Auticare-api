const router = require("express").Router();
const {
  CountryList,
  StateList,
  ImageUpload,
  DashboardAnalytics,
  patientAssessmentMetricReport,
  patientScreeningMetricReport,
  patientSessionReport,
} = require("../controllers/other.controller");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Countries
 *      description: API to manage Countries
 */

/**
 *  @swagger
 *    tags:
 *      name: States
 *      description: API to manage States
 */

/**
 * @swagger
 *   /api/v1/others/{PatientID}/scales/{ScaleID}/metrics/{PatientMetricID}/assessment:
 *     get:
 *       summary: Patient Assessment Metric Report
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Metrics
 *       parameters:
 *         - in: path
 *           name: PatientID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: path
 *           name: ScaleID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: path
 *           name: PatientMetricID
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         "200":
 *           description: Request was successful
 *           content:
 *             application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *               schema:
 *                 type: string
 *                 format: byte
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
  "/:PatientID/scales/:ScaleID/metrics/:PatientMetricID/assessment",
  pageAuthorisation(["Therapist", "Patient"]),
  patientAssessmentMetricReport
);

/**
 * @swagger
 *   /api/v1/others/{PatientID}/scales/{ScaleID}/metrics/{PatientMetricID}/screening:
 *     get:
 *       summary: Patient Screening Metric Report
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Metrics
 *       parameters:
 *         - in: path
 *           name: PatientID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: path
 *           name: ScaleID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: path
 *           name: PatientMetricID
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         "200":
 *           description: Request was successful
 *           content:
 *             application/*:
 *               schema:
 *                 type: string
 *                 format: byte
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
  "/:PatientID/scales/:ScaleID/metrics/:PatientMetricID/screening",
  pageAuthorisation(["Therapist", "Patient"]),
  patientScreeningMetricReport
);

/**
 * @swagger
 *   /api/v1/others/{PatientID}/session/{SessionID}/report:
 *     get:
 *       summary: Patient Session Report
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Session
 *       parameters:
 *         - in: path
 *           name: PatientID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: path
 *           name: SessionID
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         "200":
 *           description: Request was successful
 *           content:
 *             application/*:
 *               schema:
 *                 type: string
 *                 format: byte
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
  "/:PatientID/session/:SessionID/report",
  pageAuthorisation(["Therapist", "Patient"]),
  patientSessionReport
);

/**
 * @swagger
 *   /api/v1/others/Countries:
 *     get:
 *       summary: Countries List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Countries
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
 *                           $ref: '#/components/schemas/Country'
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
router.get("/Countries", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), CountryList);

/**
 * @swagger
 *   /api/v1/others/States/{CountryID}:
 *     get:
 *       summary: States List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - States
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
 *                           $ref: '#/components/schemas/State'
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
router.get("/States/:CountryID", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), StateList);

/**
 * @swagger
 *   /api/v1/others/dashboard:
 *     get:
 *       summary: Dashboard analytics
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Dashboard
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
router.get("/dashboard", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), DashboardAnalytics);

/**
 * @swagger
 *   /api/v1/others/ImageUpload:
 *     post:
 *       summary: Image Upload
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Image Upload
 *       consumes:
 *         - multipart/form-data
 *       parameters:
 *         - in: formData
 *           name: imageFile
 *           type: file
 *           required: true
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
 *                         type: string
 *                         example: https://file-upload.s3.us-east-1.amazonaws.com/1670943841104.png
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
router.post("/ImageUpload", ImageUpload);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         CountryID:
 *           type: number
 *           example: 8
 *         CountryName:
 *           type: string
 *           example: India
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
 *     State:
 *       type: object
 *       properties:
 *         StateID:
 *           type: number
 *           example: 3
 *         StateName:
 *           type: string
 *           example: Kerala
 *         CountryID:
 *           type: number
 *           example: 8
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
