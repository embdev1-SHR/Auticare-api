const router = require("express").Router();
const { body } = require("express-validator");
const {
  patientList,
  patientDetails,
  patientCreate,
  patientUpdate,
  patientDelete,
  patientSearch,
  patientMetricList,
  patientMetricCreate,
  patientMetricsUpdate,
  patientScreeningMetricResponseCreate,
  patientAssessmentMetricResponseCreate,
  patientScreeningMetricResponseList,
  patientAssessmentMetricResponseList,
  patientMetricDetails,
  patientCommentCreate,
  patientCommentList,
  patientCommentUpdate,
  patientCommentDelete,
  patientPlanCreate,
  patientPlanGoalList,
  patientPlanList,
  patientPlanGoalUpdate,
  patientPlanGoalDelete,
  patientPlanGoalCreate,
  patientIssueList,
  patientPlanUpdate,
  patientSessionCreate,
  patientSessionTrialCreate,
  patientSessionTrialFinish,
  patientSessionList,
  patientSessionDetails,
  patientSessionTrialList,
  patientSessionTrialBehaviourList,
  patientSessionTrialMandList,
  patientSessionTrialDetails,
  patientSessionUpdate,
  patientVRSessionDetails,
  patientVRSessionDetailsUpdate,
  patientSessionTrialUnfinished,
  patientSessionBehaviourList,
  patientSessionMandList,
} = require("../controllers/patient.controller");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");
const { verifyAccessToken } = require("../middleware/authentication");

/**
 *  @swagger
 *    tags:
 *      name: Patients
 *      description: API to manage patients
 */

/**
 * @swagger
 *   /api/v1/patients:
 *     get:
 *       summary: Patients List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patients
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
 *                           $ref: '#/components/schemas/Patient'
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
  verifyAccessToken,
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  patientList
);

/**
 * @swagger
 *   /api/v1/patients/issues/{PatientID}:
 *     get:
 *       summary: Patient Issues List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patients
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
 *                           $ref: '#/components/schemas/PatientIssues'
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
  "/issues/:PatientID",
  verifyAccessToken,
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  patientIssueList
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/metrics:
 *     get:
 *       summary: Patient Assessment & Screening Metrics List
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
 *                           $ref: '#/components/schemas/PatientMetric'
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
router.get("/:PatientID/metrics", verifyAccessToken, pageAuthorisation(["Therapist", "Patient"]), patientMetricList);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/metrics/{PatientMetricID}/screening:
 *     get:
 *       summary: Patient Screening Metric Responses List
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
 *           name: PatientMetricID
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
 *                           $ref: '#/components/schemas/PatientMetricScreeningResponse'
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
  "/:PatientID/metrics/:PatientMetricID/screening",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  patientScreeningMetricResponseList
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/metrics/{PatientMetricID}/assessment:
 *     get:
 *       summary: Patient Assessment Metric Responses List
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
 *           name: PatientMetricID
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
 *                           $ref: '#/components/schemas/PatientMetricAssessmentResponse'
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
  "/:PatientID/metrics/:PatientMetricID/assessment",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  patientAssessmentMetricResponseList
);

/**
 * @swagger
 *   /api/v1/patients/comments/{PatientID}:
 *     get:
 *       summary: Patient Comments List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Comments
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
 *                           $ref: '#/components/schemas/PatientComments'
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
router.get("/comments/:PatientID", verifyAccessToken, pageAuthorisation(["Therapist"]), patientCommentList);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/plans:
 *     get:
 *       summary: Patient Plan List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Plans
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
 *                           $ref: '#/components/schemas/PatientPlan'
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
router.get("/:PatientID/plans", verifyAccessToken, pageAuthorisation(["Therapist"]), patientPlanList);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/plans/{PlanID}/goals:
 *     get:
 *       summary: Patient Plan Goal List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Plans
 *       parameters:
 *         - in: path
 *           name: PatientID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: path
 *           name: PlanID
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
 *                           $ref: '#/components/schemas/PatientPlanGoal'
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
router.get("/:PatientID/plans/:PlanID/goals", verifyAccessToken, pageAuthorisation(["Therapist"]), patientPlanGoalList);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/sessions:
 *     get:
 *       summary: Patient Sessions List
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
 *                           $ref: '#/components/schemas/PatientSession'
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
router.get("/:PatientID/sessions", verifyAccessToken, pageAuthorisation(["Therapist", "Patient"]), patientSessionList);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/sessions/{SessionID}/trials:
 *     get:
 *       summary: Patient Session Trials List
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
 *                           $ref: '#/components/schemas/PatientSessionTrial'
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
  "/:PatientID/sessions/:SessionID/trials",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  patientSessionTrialList
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/sessions/{SessionID}/trials/unfinished:
 *     get:
 *       summary: Patient Unfinished Session Trial
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
 *                           $ref: '#/components/schemas/PatientSessionTrial'
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
  "/:PatientID/sessions/:SessionID/trials/unfinished",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  patientSessionTrialUnfinished
);

/**
 * @swagger
 *   /api/v1/patients/sessions/trials/{SessionTrialID}/behaviours:
 *     get:
 *       summary: Patient Session Trial Behaviours List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Session
 *       parameters:
 *         - in: path
 *           name: SessionTrialID
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
 *                           $ref: '#/components/schemas/PatientSessionTrialBehaviour'
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
  "/sessions/trials/:SessionTrialID/behaviours",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  patientSessionTrialBehaviourList
);

/**
 * @swagger
 *   /api/v1/patients/sessions/{SessionID}/behaviours:
 *     get:
 *       summary: Patient Session Behaviours List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Session
 *       parameters:
 *         - in: path
 *           name: SessionID
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
 *                           $ref: '#/components/schemas/PatientSessionTrialBehaviour'
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
  "/sessions/:SessionID/behaviours",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  patientSessionBehaviourList
);

/**
 * @swagger
 *   /api/v1/patients/sessions/trials/{SessionTrialID}/mands:
 *     get:
 *       summary: Patient Session Trial Mand List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Session
 *       parameters:
 *         - in: path
 *           name: SessionTrialID
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
 *                           $ref: '#/components/schemas/PatientSessionTrialMand'
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
  "/sessions/trials/:SessionTrialID/mands",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  patientSessionTrialMandList
);

/**
 * @swagger
 *   /api/v1/patients/sessions/{SessionID}/mands:
 *     get:
 *       summary: Patient Session Mand List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Session
 *       parameters:
 *         - in: path
 *           name: SessionID
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
 *                           $ref: '#/components/schemas/PatientSessionTrialMand'
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
router.get("/sessions/:SessionID/mands", verifyAccessToken, pageAuthorisation(["Therapist"]), patientSessionMandList);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}:
 *     get:
 *       summary: Patient Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patients
 *       parameters:
 *         - in: path
 *           name: PatientID
 *           description: PatientID is not required when the user is Patient, pass zero or any other value instead.
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
 *                           $ref: '#/components/schemas/Patient'
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
 *                         example: Patient not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:PatientID",
  verifyAccessToken,
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  patientDetails
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/metrics/{PatientMetricID}:
 *     get:
 *       summary: Patient Assessment & Screening Metrics Details
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
 *           name: PatientMetricID
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
 *                           $ref: '#/components/schemas/PatientMetric'
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
  "/:PatientID/metrics/:PatientMetricID",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  patientMetricDetails
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/sessions/{SessionID}:
 *     get:
 *       summary: Patient Session Details
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
 *                           $ref: '#/components/schemas/PatientSession'
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
  "/:PatientID/sessions/:SessionID",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  patientSessionDetails
);

/**
 * @swagger
 *   /api/v1/patients/sessions/trials/{SessionTrialID}:
 *     get:
 *       summary: Patient Session Trial Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Session
 *       parameters:
 *         - in: path
 *           name: SessionTrialID
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
 *                           $ref: '#/components/schemas/PatientSessionTrial'
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
  "/sessions/trials/:SessionTrialID",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  patientSessionTrialDetails
);

/**
 * @swagger
 *   /api/v1/patients/sessions/{SessionID}/vr:
 *     get:
 *       summary: Patient VR Session Details
 *       tags:
 *         - Patient VR Session
 *       parameters:
 *         - in: path
 *           name: SessionID
 *           required: true
 *           schema:
 *             type: integer
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
 *                       data:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/PatientVRSession'
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
router.get("/sessions/:SessionID/vr", patientVRSessionDetails);

/**
 * @swagger
 *   /api/v1/patients/sessions/{SessionID}/vr:
 *     post:
 *       summary: Patient VR Session Result
 *       tags:
 *         - Patient VR Session
 *       parameters:
 *         - in: path
 *           name: SessionID
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
 *                   PatientID:
 *                     type: number
 *                     required: true
 *                   UserID:
 *                     type: number
 *                     required: true
 *                   Trials:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         StartingTime:
 *                           type: string
 *                           example: 2022-11-08T16:18:11.000Z
 *                         CompletionTime:
 *                           type: string
 *                           example: 2022-11-08T16:18:11.000Z
 *                         ReactionTime:
 *                           type: string
 *                           example: 2022-11-08T16:18:11.000Z
 *                         PromptInitiationTime:
 *                           type: string
 *                           example: 2022-11-08T16:18:11.000Z
 *                         PromptReactionTime:
 *                           type: string
 *                           example: 2022-11-08T16:18:11.000Z
 *                         PromptFinishingTime:
 *                           type: string
 *                           example: 2022-11-08T16:18:11.000Z
 *                         Score:
 *                           type: number
 *                           example: 5
 *                         SetOfPrompts:
 *                           type: number
 *                           example: 5
 *                         TypeOfPrompts:
 *                           type: string
 *                         NoOfPrompts:
 *                           type: number
 *                           example: 5
 *                         NoOfTrials:
 *                           type: number
 *                           example: 5
 *                         NoOfSuccess:
 *                           type: number
 *                           example: 5
 *                         NoOfFail:
 *                           type: number
 *                           example: 5
 *                         TTFF:
 *                           type: number
 *                           format: double
 *                           example: 55.0
 *                         FFD:
 *                           type: number
 *                           format: double
 *                           example: 55.0
 *                         AFD:
 *                           type: number
 *                           format: double
 *                           example: 55.0
 *                         SFC:
 *                           type: number
 *                           format: double
 *                           example: 55.0
 *                         AttentionSpan:
 *                           type: number
 *                           format: double
 *                           example: 55.0
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
 *                         example: Patient VR session result updated successfully
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
  "/sessions/:SessionID/vr",
  [
    body("PatientID").isNumeric().withMessage("Value must be a number").trim(),
    body("UserID").isNumeric().withMessage("Value must be a number").trim(),
    body("Trials").isArray().not().isEmpty().withMessage("Value must be an array"),
    body("Trials.*.StartingTime")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      .optional({ checkFalsy: true }),
    body("Trials.*.CompletionTime")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      .optional({ checkFalsy: true }),
    body("Trials.*.ReactionTime")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      .optional({ checkFalsy: true }),
    body("Trials.*.PromptInitiationTime")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      .optional({ checkFalsy: true }),
    body("Trials.*.PromptReactionTime")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      .optional({ checkFalsy: true }),
    body("Trials.*.PromptFinishingTime")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      .optional({ checkFalsy: true }),
    body("Trials.*.Score").isNumeric().withMessage("Value must be a number").trim().optional({ checkFalsy: true }),
    body("Trials.*.SetOfPrompts")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim()
      .optional({ checkFalsy: true }),
    body("Trials.*.TypeOfPrompts")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      .optional({ checkFalsy: true }),
    body("Trials.*.NoOfPrompts")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim()
      .optional({ checkFalsy: true }),
    body("Trials.*.NoOfTrials").isNumeric().withMessage("Value must be a number").trim().optional({ checkFalsy: true }),
    body("Trials.*.NoOfSuccess")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim()
      .optional({ checkFalsy: true }),
    body("Trials.*.NoOfFail").isNumeric().withMessage("Value must be a number").trim().optional({ checkFalsy: true }),
    body("Trials.*.TTFF").isDecimal().withMessage("Value must be a decimal number").optional({ checkFalsy: true }),
    body("Trials.*.FFD").isDecimal().withMessage("Value must be a decimal number").optional({ checkFalsy: true }),
    body("Trials.*.AFD").isDecimal().withMessage("Value must be a decimal number").optional({ checkFalsy: true }),
    body("Trials.*.SFC").isDecimal().withMessage("Value must be a decimal number").optional({ checkFalsy: true }),
    body("Trials.*.AttentionSpan")
      .isDecimal()
      .withMessage("Value must be a decimal number")
      .optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  patientVRSessionDetailsUpdate
);

/**
 * @swagger
 *   /api/v1/patients/search:
 *     post:
 *       summary: Patient Search
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patients
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   PatientName:
 *                     type: string
 *                     required: false
 *                     example: John Doe
 *                   ParentEmailID:
 *                     type: string
 *                     required: false
 *                     example: johndoe@demo.com
 *                   ParentPhone:
 *                     type: string
 *                     required: false
 *                     example: 9876543210
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
 *                           $ref: '#/components/schemas/Patient'
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
  verifyAccessToken,
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [body("PatientName").trim().escape(), body("ParentEmailID").trim().escape(), body("ParentPhone").trim().escape()],
  validateRequestSchema,
  patientSearch
);

/**
 * @swagger
 *   /api/v1/patients:
 *     post:
 *       summary: Patient Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patients
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   PatientName:
 *                     type: string
 *                     required: true
 *                     example: John Doe
 *                   DOB:
 *                     type: string
 *                     required: true
 *                     example: 01/01/1990
 *                   Gender:
 *                     type: string
 *                     required: true
 *                     example: Male
 *                   AddressLine1:
 *                     type: string
 *                     required: true
 *                     example: Karamana, Trivandrum
 *                   AddressLine2:
 *                     type: string
 *                     required: true
 *                     example: Kerala, India
 *                   City:
 *                     type: string
 *                     required: true
 *                     example: Karamana
 *                   District:
 *                     type: string
 *                     required: true
 *                     example: Trivandrum
 *                   Pincode:
 *                     type: string
 *                     required: true
 *                     example: 625478
 *                   State:
 *                     type: string
 *                     required: true
 *                     example: Kerala
 *                   Country:
 *                     type: string
 *                     required: true
 *                     example: India
 *                   ParentName:
 *                     type: string
 *                     required: true
 *                     example: William James
 *                   ParentEmailID:
 *                     type: string
 *                     required: true
 *                     example: contact@auticareweb.com
 *                   ParentPhone:
 *                     type: string
 *                     required: true
 *                     example: 9876543211
 *                   Relationship:
 *                     type: string
 *                     required: true
 *                     example: Father
 *                   IssueList:
 *                     required: false
 *                     example: ["Issue 1", "Issue 2"]
 *                     type: array
 *                   PreviousTreatmentHistoryDescription:
 *                     type: string
 *                     required: false
 *                   PreviousTreatmentHistoryURL:
 *                     type: string
 *                     required: false
 *                     example: https://demourl.com
 *                   DocumentsURL:
 *                     type: string
 *                     required: false
 *                     example: https://demourl.com
 *                   ReportsURL:
 *                     type: string
 *                     required: false
 *                     example: https://demourl.com
 *                   Remarks:
 *                     type: string
 *                     required: true
 *                     example: Bad Condition
 *                   Difficulty:
 *                     type: string
 *                     required: false
 *                     example: Struggles to walk
 *                   DepartmentID:
 *                     type: number
 *                     required: true
 *                   TherapistID:
 *                     type: number
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
 *                         example: Patient created successfully
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
  verifyAccessToken,
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("PatientName").not().isEmpty().withMessage("Field is required").trim(),
    body("DOB").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
    body("Gender").not().isEmpty().withMessage("Field is required").trim(),
    body("AddressLine1").not().isEmpty().withMessage("Field is required").trim(),
    body("AddressLine2").not().isEmpty().withMessage("Field is required").trim(),
    body("City").not().isEmpty().withMessage("Field is required").trim(),
    body("District").not().isEmpty().withMessage("Field is required").trim(),
    body("Pincode").not().isEmpty().withMessage("Field is required").isNumeric().withMessage("Value must be a digit"),
    body("State").not().isEmpty().withMessage("Field is required").trim(),
    body("Country").not().isEmpty().withMessage("Field is required").trim(),
    body("ParentName").not().isEmpty().withMessage("Field is required").trim(),
    body("ParentEmailID").isEmail().normalizeEmail(),
    body("ParentPhone").not().isEmpty().withMessage("Field is required"),
    body("Relationship").not().isEmpty().withMessage("Field is required").trim(),
    body("IssueList").isArray().not().isEmpty().withMessage("Value must be an array").optional({ checkFalsy: true }),
    body("PreviousTreatmentHistoryDescription").trim().optional({ checkFalsy: true }),
    body("PreviousTreatmentHistoryURL").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
    body("DocumentsURL").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
    body("ReportsURL").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
    body("Remarks").not().isEmpty().withMessage("Field is required").trim(),
    body("Difficulty").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("DepartmentID").isNumeric().withMessage("Value must be a number"),
    body("TherapistID").isNumeric().withMessage("Value must be a number").optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  patientCreate
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/metrics:
 *     post:
 *       summary: Patient Assessment & Screening Metric Creation
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
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ScaleID:
 *                     type: number
 *                     required: true
 *                     example: 5
 *                   Score:
 *                     type: number
 *                     required: false
 *                     example: 95
 *                   Result:
 *                     type: string
 *                     required: false
 *                     example: Mild Autism
 *                   ScheduleStartDate:
 *                     type: string
 *                     required: false
 *                     example: 01/25/2023
 *                   ScheduleEndDate:
 *                     type: string
 *                     required: false
 *                     example: 01/25/2023
 *                   ActualStartDate:
 *                     type: string
 *                     required: false
 *                     example: 01/25/2023
 *                   ActualEndDate:
 *                     type: string
 *                     required: false
 *                     example: 01/25/2023
 *                   CompletionStatus:
 *                     type: string
 *                     required: false
 *                     example: Cancelled
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
 *                         example: Patient metrics created successfully
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
  "/:PatientID/metrics",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("ScaleID").isNumeric().withMessage("Value must be a number").trim(),
    body("Score").isNumeric().withMessage("Value must be a number").trim().optional({ checkFalsy: true }),
    body("Result").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("ScheduleStartDate")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format")
      .optional({ checkFalsy: true }),
    body("ScheduleEndDate")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format")
      .optional({ checkFalsy: true }),
    body("ActualStartDate")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format")
      .optional({ checkFalsy: true }),
    body("ActualEndDate")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format")
      .optional({ checkFalsy: true }),
    body("CompletionStatus").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  patientMetricCreate
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/metrics/{PatientMetricID}/screening:
 *     post:
 *       summary: Patient Screening Metric Responses Submition
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
 *           name: PatientMetricID
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
 *                   Score:
 *                     type: number
 *                     required: true
 *                     example: 5
 *                   Result:
 *                     type: string
 *                     required: true
 *                     example: Mild Autism
 *                   CompletionStatus:
 *                     type: string
 *                     required: true
 *                     example: Completed
 *                   Responses:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         MetricID:
 *                           type: number
 *                           required: true
 *                           example: 5
 *                         QuestionNumber:
 *                           type: number
 *                           required: true
 *                           example: 5
 *                         ResponseSelected:
 *                           type: string
 *                           required: true
 *                           example: Rarely
 *                         ResponseScore:
 *                           type: number
 *                           required: true
 *                           example: 4
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
 *                         example: Patient Screening metrics response submited successfully
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
  "/:PatientID/metrics/:PatientMetricID/screening",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("Score").isNumeric().withMessage("Value must be a number").trim(),
    body("Result").not().isEmpty().withMessage("Field is required").trim(),
    body("CompletionStatus").not().isEmpty().withMessage("Field is required").trim(),
    body("Responses").isArray().not().isEmpty().withMessage("Value must be an array"),
    body("Responses.*.MetricID").isNumeric().withMessage("Value must be a number"),
    body("Responses.*.QuestionNumber").isNumeric().withMessage("Value must be a number"),
    body("Responses.*.ResponseSelected").not().isEmpty().withMessage("Field is required").trim(),
    body("Responses.*.ResponseScore").isNumeric().withMessage("Value must be a number"),
  ],
  validateRequestSchema,
  patientScreeningMetricResponseCreate
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/metrics/{PatientMetricID}/assessment:
 *     post:
 *       summary: Patient Assessment Metric Responses Submition
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
 *           name: PatientMetricID
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
 *                   CompletionStatus:
 *                     type: string
 *                     required: true
 *                     example: Completed
 *                   Responses:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         MetricID:
 *                           type: number
 *                           required: true
 *                           example: 5
 *                         QuestionNumber:
 *                           type: number
 *                           required: true
 *                           example: 5
 *                         ScoreNumber:
 *                           type: number
 *                           required: true
 *                           example: 3
 *                         NumberOfScore:
 *                           type: number
 *                           required: true
 *                           example: 4
 *                         Colour:
 *                           type: string
 *                           required: true
 *                         Date:
 *                           type: string
 *                           required: true
 *                           example: 01/25/2023
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
 *                         example: Patient Assessment metrics response submited successfully
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
  "/:PatientID/metrics/:PatientMetricID/assessment",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("CompletionStatus").not().isEmpty().withMessage("Field is required").trim(),
    body("Responses").isArray().not().isEmpty().withMessage("Value must be an array"),
    body("Responses.*.MetricID").isNumeric().withMessage("Value must be a number"),
    body("Responses.*.QuestionNumber").isNumeric().withMessage("Value must be a number"),
    body("Responses.*.ScoreNumber").isNumeric().withMessage("Value must be a number"),
    body("Responses.*.NumberOfScore").isNumeric().withMessage("Value must be a number"),
    body("Responses.*.Colour").not().isEmpty().withMessage("Field is required").trim(),
    body("Responses.*.Date")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format"),
  ],
  validateRequestSchema,
  patientAssessmentMetricResponseCreate
);

/**
 * @swagger
 *   /api/v1/patients/comments:
 *     post:
 *       summary: Patient Comment Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Comments
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   PatientID:
 *                     type: number
 *                     example: 8
 *                   Comment:
 *                     type: string
 *                     required: true
 *                     example: Nice! Did you use 8222 ones? Any idea how they look like?
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
 *                         example: Patient comment created successfully
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
  "/comments",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("PatientID").isNumeric().withMessage("Value must be a number"),
    body("Comment").not().isEmpty().withMessage("Field is required").trim(),
  ],
  validateRequestSchema,
  patientCommentCreate
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/plans:
 *     post:
 *       summary: Patient Plan Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Plans
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
 *                   PlanName:
 *                     type: string
 *                     required: true
 *                     example: Primary Plan
 *                   StartDate:
 *                     type: string
 *                     required: true
 *                     example: 01/25/2023
 *                   EndDate:
 *                     type: string
 *                     required: true
 *                     example: 01/25/2023
 *                   PlanGoals:
 *                     type: array
 *                     items:
 *                       type: number
 *                       required: true
 *                       example: 5
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
 *                         example: Patient plan created successfully
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
  "/:PatientID/plans",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("PlanName").not().isEmpty().withMessage("Field is required").trim(),
    body("StartDate").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
    body("EndDate").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
    body("PlanGoals").isArray().not().isEmpty().withMessage("Value must be an array"),
    body("PlanGoals.*").isNumeric().withMessage("Value must be a number"),
  ],
  validateRequestSchema,
  patientPlanCreate
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/plans/{PlanID}/goals/{GoalID}:
 *     post:
 *       summary: Patient Plan Goal Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Plans
 *       parameters:
 *         - in: path
 *           name: PatientID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: path
 *           name: PlanID
 *           required: true
 *           schema:
 *             type: integer
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
 *                   StartDate:
 *                     type: string
 *                     required: true
 *                     example: 01/25/2023
 *                   Progress:
 *                     type: string
 *                     required: true
 *                     example: Pending
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
 *                         example: Patient plan Goal created successfully
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
  "/:PatientID/plans/:PlanID/goals/:GoalID",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("StartDate").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
    body("Progress").not().isEmpty().withMessage("Field is required").trim(),
  ],
  validateRequestSchema,
  patientPlanGoalCreate
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/sessions:
 *     post:
 *       summary: Patient Session Creation
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
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ContentID:
 *                     type: number
 *                     required: true
 *                     example: 5
 *                   SessionName:
 *                     type: string
 *                     required: true
 *                   ScenarioName:
 *                     type: string
 *                     required: false
 *                   SessionDate:
 *                     type: string
 *                     required: false
 *                     example: 01/25/2023
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
 *                         example: Patient session created successfully
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
  "/:PatientID/sessions",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("ContentID").isNumeric().withMessage("Value must be a number").trim(),
    body("SessionName").not().isEmpty().withMessage("Field is required").trim(),
    body("ScenarioName").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("SessionDate").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
  ],
  validateRequestSchema,
  patientSessionCreate
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/sessions/trials/{SessionID}:
 *     get:
 *       summary: Patient Session Trial Creation
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
 *                         example: Patient session trial created successfully
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
router.get(
  "/:PatientID/sessions/trials/:SessionID",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  patientSessionTrialCreate
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/sessions/{SessionID}/trials/{SessionTrialID}:
 *     post:
 *       summary: Patient Session Trial Finish
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
 *         - in: path
 *           name: SessionTrialID
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
 *                   BehaviourData:
 *                     required: false
 *                     example: ["item 1", "item 2"]
 *                     type: array
 *                   MandData:
 *                     required: false
 *                     example: ["item 1", "item 2"]
 *                     type: array
 *       responses:
 *         "200":
 *           description: Finished
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
 *                         example: Patient session trial finished successfully
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
  "/:PatientID/sessions/:SessionID/trials/:SessionTrialID",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("BehaviourData")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("MandData").isArray().not().isEmpty().withMessage("Value must be an array").optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  patientSessionTrialFinish
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}:
 *     put:
 *       summary: Patient Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patients
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
 *                   PatientName:
 *                     type: string
 *                     required: true
 *                     example: John Doe
 *                   DOB:
 *                     type: string
 *                     required: true
 *                     example: 01/01/1990
 *                   Gender:
 *                     type: string
 *                     required: true
 *                     example: Male
 *                   AddressLine1:
 *                     type: string
 *                     required: true
 *                     example: Karamana, Trivandrum
 *                   AddressLine2:
 *                     type: string
 *                     required: true
 *                     example: Kerala, India
 *                   City:
 *                     type: string
 *                     required: true
 *                     example: Karamana
 *                   District:
 *                     type: string
 *                     required: true
 *                     example: Trivandrum
 *                   Pincode:
 *                     type: string
 *                     required: true
 *                     example: 625478
 *                   State:
 *                     type: string
 *                     required: true
 *                     example: Kerala
 *                   Country:
 *                     type: string
 *                     required: true
 *                     example: India
 *                   ParentName:
 *                     type: string
 *                     required: true
 *                     example: William James
 *                   ParentPhone:
 *                     type: string
 *                     required: true
 *                     example: 9876543211
 *                   Relationship:
 *                     type: string
 *                     required: true
 *                     example: Father
 *                   AddIssueList:
 *                     type: array
 *                     example: ["Issue 1", "Issue 2"]
 *                     required: false
 *                   RemoveIssueListID:
 *                     type: array
 *                     example: [1, 2, 3]
 *                     required: false
 *                   PreviousTreatmentHistoryDescription:
 *                     type: string
 *                     required: false
 *                   PreviousTreatmentHistoryURL:
 *                     type: string
 *                     required: false
 *                     example: https://demourl.com
 *                   DocumentsURL:
 *                     type: string
 *                     required: true
 *                     example: https://demourl.com
 *                   ReportsURL:
 *                     type: string
 *                     required: true
 *                     example: https://demourl.com
 *                   Remarks:
 *                     type: string
 *                     required: true
 *                     example: Bad Condition
 *                   Difficulty:
 *                     type: string
 *                     required: false
 *                     example: Struggles to walk
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
 *                         example: Patient updated successfully
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
 *                         example: Patient not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:PatientID",
  verifyAccessToken,
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist", "Patient"]),
  [
    body("PatientName").not().isEmpty().withMessage("Field is required").trim(),
    body("DOB").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
    body("Gender").not().isEmpty().withMessage("Field is required").trim(),
    body("AddressLine1").not().isEmpty().withMessage("Field is required").trim(),
    body("AddressLine2").not().isEmpty().withMessage("Field is required").trim(),
    body("City").not().isEmpty().withMessage("Field is required").trim(),
    body("District").not().isEmpty().withMessage("Field is required").trim(),
    body("Pincode").not().isEmpty().withMessage("Field is required").isNumeric().withMessage("Value must be a digit"),
    body("State").not().isEmpty().withMessage("Field is required").trim(),
    body("Country").not().isEmpty().withMessage("Field is required").trim(),
    body("ParentName").not().isEmpty().withMessage("Field is required").trim(),
    body("ParentPhone").not().isEmpty().withMessage("Field is required"),
    body("Relationship").not().isEmpty().withMessage("Field is required").trim(),
    body("AddIssueList").isArray().not().isEmpty().withMessage("Value must be an array").optional({ checkFalsy: true }),
    body("RemoveIssueListID")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("PreviousTreatmentHistoryDescription").trim().optional({ checkFalsy: true }),
    body("PreviousTreatmentHistoryURL").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
    body("DocumentsURL").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
    body("ReportsURL").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
    body("Remarks").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("Difficulty").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  patientUpdate
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/metrics/{PatientMetricID}:
 *     put:
 *       summary: Patient Assessment & Screening Metric Updation
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
 *           name: PatientMetricID
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
 *                   ScheduleStartDate:
 *                     type: string
 *                     required: false
 *                     example: 01/25/2023
 *                   ScheduleEndDate:
 *                     type: string
 *                     required: false
 *                     example: 01/25/2023
 *                   ActualStartDate:
 *                     type: string
 *                     required: false
 *                     example: 01/25/2023
 *                   ActualEndDate:
 *                     type: string
 *                     required: false
 *                     example: 01/25/2023
 *                   CompletionStatus:
 *                     type: string
 *                     required: false
 *                     example: Cancelled
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
 *                         example: Patient metrics updated successfully
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
 *                         example: Patient not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:PatientID/metrics/:PatientMetricID",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("ScheduleStartDate")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format")
      .optional({ checkFalsy: true }),
    body("ScheduleEndDate")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format")
      .optional({ checkFalsy: true }),
    body("ActualStartDate")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format")
      .optional({ checkFalsy: true }),
    body("ActualEndDate")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format")
      .optional({ checkFalsy: true }),
    body("CompletionStatus")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()

      .optional({ checkFalsy: true }),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  patientMetricsUpdate
);

/**
 * @swagger
 *   /api/v1/patients/comments/{CommentID}:
 *     put:
 *       summary: Patient Comment Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Comments
 *       parameters:
 *         - in: path
 *           name: CommentID
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
 *                   Comment:
 *                     type: string
 *                     required: true
 *                     example: Nice! Did you use 8222 ones? Any idea how they look like?
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
 *                         example: Patient comment updated successfully
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
 *                         example: Patient not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/comments/:CommentID",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("Comment").not().isEmpty().withMessage("Field is required").trim(),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  patientCommentUpdate
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}/plans/{PlanID}:
 *     put:
 *       summary: Patient Plan Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Plans
 *       parameters:
 *         - in: path
 *           name: PatientID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: path
 *           name: PlanID
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
 *                   StartDate:
 *                     type: string
 *                     required: true
 *                     example: 01/25/2023
 *                   EndDate:
 *                     type: string
 *                     required: true
 *                     example: 01/25/2023
 *                   CompletionStatus:
 *                     required: true
 *                     type: string
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
 *                         example: Plan updated successfully
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
 *                         example: Plan not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:PatientID/plans/:PlanID",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("StartDate").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
    body("EndDate").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
    body("CompletionStatus").isBoolean().withMessage("Value must be boolean").trim(),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  patientPlanUpdate
);

/**
 * @swagger
 *   /api/v1/patients/plans/goals/{PlanGoalID}:
 *     put:
 *       summary: Patient Plan Goal Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Plans
 *       parameters:
 *         - in: path
 *           name: PlanGoalID
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
 *                   StartDate:
 *                     type: string
 *                     required: true
 *                     example: 01/25/2023
 *                   Progress:
 *                     required: true
 *                     type: string
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
 *                         example: Plan goal updated successfully
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
 *                         example: Plan goal not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/plans/goals/:PlanGoalID",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("StartDate").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
    body("Progress").not().isEmpty().withMessage("Field is required").trim(),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  patientPlanGoalUpdate
);

/**
 * @swagger
 *   /api/v1/patients/sessions/{SessionID}:
 *     put:
 *       summary: Patient Session Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Session
 *       parameters:
 *         - in: path
 *           name: SessionID
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
 *                   SessionName:
 *                     required: true
 *                     type: string
 *                   SessionDate:
 *                     type: string
 *                     required: true
 *                     example: 01/25/2023
 *                   Feedback:
 *                     type: string
 *                   Rating:
 *                     type: number
 *                     example: 5
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
 *                         example: Patient session updated successfully
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
 *                         example: Patient session not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/sessions/:SessionID",
  verifyAccessToken,
  pageAuthorisation(["Therapist"]),
  [
    body("SessionName").not().isEmpty().withMessage("Field is required").trim(),
    body("SessionDate").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
    body("Feedback").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("Rating")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .isNumeric({ min: 1, max: 5 })
      .withMessage("Value must be a digit")
      .optional({ checkFalsy: true }),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  patientSessionUpdate
);

/**
 * @swagger
 *   /api/v1/patients/{PatientID}:
 *     delete:
 *       summary: Patient Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patients
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
 *                       message:
 *                         type: string
 *                         example: Patient deleted successfully
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
 *                         example: Patient not found
 *         "500":
 *           description: Internal server error
 */
router.delete(
  "/:PatientID",
  verifyAccessToken,
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  patientDelete
);

/**
 * @swagger
 *   /api/v1/patients/comments/{CommentID}:
 *     delete:
 *       summary: Patient Comment Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Comments
 *       parameters:
 *         - in: path
 *           name: CommentID
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
 *                         example: Patient comment deleted successfully
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
 *                         example: Patient not found
 *         "500":
 *           description: Internal server error
 */
router.delete("/comments/:CommentID", verifyAccessToken, pageAuthorisation(["Therapist"]), patientCommentDelete);

/**
 * @swagger
 *   /api/v1/patients/plans/goals/{PlanGoalID}:
 *     delete:
 *       summary: Patient Plan Goal Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Patient Plans
 *       parameters:
 *         - in: path
 *           name: PlanGoalID
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
 *                         example: Plan goal deleted successfully
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
 *                         example: Plan goal not found
 *         "500":
 *           description: Internal server error
 */
router.delete("/plans/goals/:PlanGoalID", verifyAccessToken, pageAuthorisation(["Therapist"]), patientPlanGoalDelete);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         PatientID:
 *           type: number
 *           example: 8
 *         UserID:
 *           type: number
 *           example: 8
 *         DepartmentID:
 *           type: number
 *           example: 8
 *         TherapistID:
 *           type: number
 *           example: 8
 *         ParentEmailID:
 *           type: string
 *           example: contact@auticareweb.com
 *         ParentPhone:
 *           type: string
 *           example: 9876543211
 *         AddressLine1:
 *           type: string
 *           example: Karamana, Trivandrum
 *         AddressLine2:
 *           type: string
 *           example: Kerala, India
 *         City:
 *           type: string
 *           example: Karamana
 *         District:
 *           type: string
 *           example: Trivandrum
 *         Pincode:
 *           type: string
 *           example: 625478
 *         State:
 *           type: string
 *           example: Kerala
 *         Country:
 *           type: string
 *           example: India
 *         RoleId:
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
 *         PatientName:
 *           type: string
 *           example: John Doe
 *         DOB:
 *           type: string
 *           example: 01/01/1990
 *         Gender:
 *           type: string
 *           example: Male
 *         ParentName:
 *           type: string
 *           example: William James
 *         Relationship:
 *           type: string
 *           example: Father
 *         PreviousTreatmentHistoryDescription:
 *           type: string
 *         PreviousTreatmentHistoryURL:
 *           type: string
 *           example: https://demourl.com
 *         DocumentsURL:
 *           type: string
 *           example: https://demourl.com
 *         ReportsURL:
 *           type: string
 *           example: https://demourl.com
 *         Remarks:
 *           type: string
 *           example: Bad Condition
 *         Difficulty:
 *           type: string
 *           example: Struggles to walk
 *         IsAppCreated:
 *           type: number
 *           example: 0
 *         DepartmentName:
 *           type: string
 *         TherapistName:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PatientMetric:
 *       type: object
 *       properties:
 *         PatientMetricID:
 *           type: number
 *           example: 8
 *         PatientID:
 *           type: number
 *           example: 1
 *         TherapistID:
 *           type: number
 *           example: 3
 *         ScaleID:
 *           type: number
 *           example: 5
 *         Score:
 *           type: number
 *           example: 72
 *         Result:
 *           type: string
 *           example: Mild Autism
 *         ScheduleStartDate:
 *           type: string
 *           example: 01/25/2023
 *         ScheduleEndDate:
 *           type: string
 *           example: 01/25/2023
 *         ActualStartDate:
 *           type: string
 *           example: 01/25/2023
 *         ActualEndDate:
 *           type: string
 *           example: 01/25/2023
 *         CompletionStatus:
 *           type: string
 *           example: Pending
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
 *         ScaleName:
 *           type: string
 *           example: ISSA KIMS
 *         ScaleMetric:
 *           type: string
 *           example: Screening
 *         ScaleMetricType:
 *           type: string
 *           example: ISSA
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PatientMetricScreeningResponse:
 *       type: object
 *       properties:
 *         ResponseID:
 *           type: number
 *           example: 8
 *         PatientID:
 *           type: number
 *           example: 1
 *         PatientMetricID:
 *           type: number
 *           example: 8
 *         MetricID:
 *           type: number
 *           example: 3
 *         QuestionNumber:
 *           type: number
 *           example: 5
 *         ResponseSelected:
 *           type: string
 *           example: Rarely
 *         ResponseScore:
 *           type: number
 *           example: 4
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
 *     PatientMetricAssessmentResponse:
 *       type: object
 *       properties:
 *         ResponseID:
 *           type: number
 *           example: 8
 *         PatientID:
 *           type: number
 *           example: 1
 *         PatientMetricID:
 *           type: number
 *           example: 8
 *         MetricID:
 *           type: number
 *           example: 3
 *         QuestionNumber:
 *           type: number
 *           example: 5
 *         ScoreNumber:
 *           type: number
 *           example: 72
 *         NumberOfScore:
 *           type: number
 *           example: 72
 *         Colour:
 *           type: string
 *           example: #1245645
 *         Date:
 *           type: string
 *           example: 01/25/2023
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
 *         CategoryID:
 *           type: number
 *           example: 8
 *         ScaleID:
 *           type: number
 *           example: 8
 *         Question:
 *           type: string
 *         TaskObjective:
 *           type: string
 *         TaskName:
 *           type: string
 *         Example:
 *           type: string
 *         Criteria:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PatientComments:
 *       type: object
 *       properties:
 *         CommentID:
 *           type: number
 *           example: 4
 *         Comment:
 *           type: string
 *           example: Nice! Did you use 8222 ones? Any idea how they look like?
 *         PatientID:
 *           type: number
 *           example: 4
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
 *         Salutation:
 *           type: string
 *           example: Mr
 *         Name:
 *           type: string
 *           example: John Doe
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PatientPlanGoal:
 *       type: object
 *       properties:
 *         PlanGoalID:
 *           type: number
 *           example: 4
 *         PlanID:
 *           type: number
 *           example: 3
 *         GoalID:
 *           type: number
 *           example: 2
 *         PatientID:
 *           type: number
 *           example: 1
 *         StartDate:
 *           type: string
 *           example: 2022-11-08
 *         Progress:
 *           type: string
 *           example: Pending
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
 *         GoalName:
 *           type: string
 *           example: Improve verbal skills
 *         TherapyName:
 *           type: string
 *           example: Verbal
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PatientPlan:
 *       type: object
 *       properties:
 *         PlanID:
 *           type: number
 *           example: 3
 *         PatientID:
 *           type: number
 *           example: 1
 *         PlanName:
 *           type: string
 *           example: Pending
 *         StartDate:
 *           type: string
 *           example: 2022-11-08
 *         EndDate:
 *           type: string
 *           example: 2022-11-08
 *         CompletionStatus:
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
 *     PatientIssues:
 *       type: object
 *       properties:
 *         IssueID:
 *           type: number
 *           example: 3
 *         PatientID:
 *           type: number
 *           example: 1
 *         IssueName:
 *           type: string
 *           example: Pending
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
 *     PatientSession:
 *       type: object
 *       properties:
 *         SessionID:
 *           type: number
 *           example: 8
 *         PatientID:
 *           type: number
 *           example: 1
 *         TherapistID:
 *           type: number
 *           example: 3
 *         ContentID:
 *           type: number
 *           example: 5
 *         SessionName:
 *           type: string
 *         ScenarioName:
 *           type: string
 *         SessionDate:
 *           type: string
 *           example: 01/25/2023
 *         Feedback:
 *           type: string
 *         Rating:
 *           type: number
 *           example: 5
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
 *         ContentActivityName:
 *           type: string
 *         ContentActivityDescription:
 *           type: string
 *         ContentCategory:
 *           type: string
 *           example: Video
 *         FileUploadURL:
 *           type: string
 *         ActivityInstructionTitle:
 *           type: string
 *         ActivityInstructionDescription:
 *           type: string
 *         ContentDescription:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PatientSessionTrial:
 *       type: object
 *       properties:
 *         SessionTrialID:
 *           type: number
 *           example: 8
 *         SessionID:
 *           type: number
 *           example: 8
 *         PatientID:
 *           type: number
 *           example: 1
 *         StartingTime:
 *           type: string
 *           example: 2022-11-08T16:18:11.000Z
 *         CompletionTime:
 *           type: string
 *           example: 2022-11-08T16:18:11.000Z
 *         ReactionTime:
 *           type: string
 *           example: 2022-11-08T16:18:11.000Z
 *         PromptInitiationTime:
 *           type: string
 *           example: 2022-11-08T16:18:11.000Z
 *         PromptReactionTime:
 *           type: string
 *           example: 2022-11-08T16:18:11.000Z
 *         PromptFinishingTime:
 *           type: string
 *           example: 2022-11-08T16:18:11.000Z
 *         Score:
 *           type: number
 *           example: 5
 *         SetOfPrompts:
 *           type: number
 *           example: 5
 *         TypeOfPrompts:
 *           type: string
 *         NoOfPrompts:
 *           type: number
 *           example: 5
 *         NoOfTrials:
 *           type: number
 *           example: 5
 *         NoOfSuccess:
 *           type: number
 *           example: 5
 *         NoOfFail:
 *           type: number
 *           example: 5
 *         TTFF:
 *           type: number
 *           format: double
 *           example: 55.00000
 *         FFD:
 *           type: number
 *           format: double
 *           example: 55.00000
 *         AFD:
 *           type: number
 *           format: double
 *           example: 55.00000
 *         SFC:
 *           type: number
 *           format: double
 *           example: 55.00000
 *         AttentionSpan:
 *           type: number
 *           format: double
 *           example: 55.00000
 *         IsFinished:
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
 *     PatientSessionTrialBehaviour:
 *       type: object
 *       properties:
 *         SessionBehaviourID:
 *           type: number
 *           example: 1
 *         SessionTrialID:
 *           type: number
 *           example: 8
 *         Behaviour:
 *           type: string
 *           example: 5
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
 *     PatientSessionTrialMand:
 *       type: object
 *       properties:
 *         SessionBehaviourID:
 *           type: number
 *           example: 1
 *         SessionTrialID:
 *           type: number
 *           example: 8
 *         Mand:
 *           type: string
 *           example: 5
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
 *     PatientVRSession:
 *       type: object
 *       properties:
 *         PatientID:
 *           type: number
 *           example: 1
 *         PatientName:
 *           type: string
 *           example: 1
 *         DOB:
 *           type: string
 *           example: 1
 *         UserID:
 *           type: number
 *         TherapistID:
 *           type: number
 *         Name:
 *           type: string
 *         SessionID:
 *           type: number
 *           example: 1
 *         ScenarioName:
 *           type: string
 */
