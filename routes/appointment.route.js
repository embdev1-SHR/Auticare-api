const router = require("express").Router();
const { body } = require("express-validator");
const {
  appointmentList,
  appointmentCreate,
  appointmentUpdate,
  appointmentApprove,
  appointmentUpcoming,
  appointmentUploadsCreate,
  appointmentUploadsList,
  appointmentUploadsDelete,
} = require("../controllers/appointment.controller");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Appointments
 *      description: API to manage appointments
 */

/**
 * @swagger
 *   /api/v1/appointments:
 *     get:
 *       summary: Appointments List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointments
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
 *                         description: Array contains Therapist or Patient data based on login user.
 *                         items:
 *                           oneOf:
 *                             - $ref: '#/components/schemas/TherapistAppointment'
 *                             - $ref: '#/components/schemas/PatientAppointment'
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
router.get("/", pageAuthorisation(["SuperAdmin", "Center", "Therapist", "Patient"]), appointmentList);

/**
 * @swagger
 *   /api/v1/appointments/upcoming:
 *     get:
 *       summary: Appointment Upcoming
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointments
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
 *                           oneOf:
 *                             - $ref: '#/components/schemas/TherapistAppointment'
 *                             - $ref: '#/components/schemas/PatientAppointment'
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
router.get("/upcoming", pageAuthorisation(["Therapist", "Patient"]), appointmentUpcoming);

/**
 * @swagger
 *   /api/v1/appointments/{AppointmentID}/uploads:
 *     get:
 *       summary: Appointment Uploads List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointments
 *       parameters:
 *         - in: path
 *           name: AppointmentID
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
 *                           $ref: '#/components/schemas/TherapistAppointmentUpload'
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
router.get("/:AppointmentID/uploads", pageAuthorisation(["Therapist", "Patient"]), appointmentUploadsList);

/**
 * @swagger
 *   /api/v1/appointments:
 *     post:
 *       summary: Appointment Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointments
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   TherapistID:
 *                     type: number
 *                     required: true
 *                   AppointmentSlotID:
 *                     type: number
 *                     required: true
 *                   ScheduledDate:
 *                     type: string
 *                     required: true
 *                     example: 12/23/2023
 *                   PaymentID:
 *                     type: string
 *                   PaymentStatus:
 *                     type: string
 *                   AppointmentStatus:
 *                     type: string
 *                     example: Completed
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
 *                         example: Appointment created successfully
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
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist", "Patient"]),
  [
    body("TherapistID").isNumeric().withMessage("Value must be a number").trim(),
    body("AppointmentSlotID").isNumeric().withMessage("Value must be a number").trim(),
    body("ScheduledDate").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
    body("PatientID").optional({ nullable: true }).isNumeric().withMessage("Value must be a number"),
    body("PaymentID").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("PaymentStatus").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("AppointmentStatus").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  appointmentCreate
);

/**
 * @swagger
 *   /api/v1/appointments/{AppointmentID}/uploads:
 *     post:
 *       summary: Appointment Upload Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointments
 *       parameters:
 *         - in: path
 *           name: AppointmentID
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
 *                   UploadURL:
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
 *                         example: Appointment upload created successfully
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
  "/:AppointmentID/uploads",
  pageAuthorisation(["Therapist", "Patient"]),
  [
    body("UploadURL")
      .isURL({ require_protocol: false })
      .withMessage("Value must be a url")
      .optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  appointmentUploadsCreate
);

/**
 * @swagger
 *   /api/v1/appointments/{AppointmentID}:
 *     put:
 *       summary: Appointment Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointments
 *       parameters:
 *         - in: path
 *           name: AppointmentID
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
 *                   AppointmentStatus:
 *                     type: string
 *                     required: true
 *                     example: Completed
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
 *                         example: Appointment updated successfully
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
 *                         example: Appointment not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:AppointmentID",
  pageAuthorisation(["Therapist", "Patient"]),
  [body("AppointmentStatus").not().isEmpty().withMessage("Field is required").trim()],
  validateRequestSchema,
  appointmentUpdate
);

/**
 * @swagger
 *   /api/v1/appointments/{AppointmentID}/approve:
 *     put:
 *       summary: Appointment Approve
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointments
 *       parameters:
 *         - in: path
 *           name: AppointmentID
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
 *                   AppointmentSlotID:
 *                     type: number
 *                     required: true
 *                   ScheduledDate:
 *                     type: string
 *                     required: true
 *                     example: 12/23/2023
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
 *                         example: Appointment approved successfully
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
 *                         example: Appointment not found or already approved
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:AppointmentID/approve",
  pageAuthorisation(["Therapist"]),
  [
    body("AppointmentSlotID").isNumeric().withMessage("Value must be a number").trim(),
    body("ScheduledDate").isDate({ format: "MM/DD/YYYY" }).withMessage("Value must be a date with MM/DD/YYYY format"),
  ],
  validateRequestSchema,
  appointmentApprove
);

/**
 * @swagger
 *   /api/v1/appointments/{AppointmentID}/uploads:
 *     delete:
 *       summary: Appointment Upload Delete
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointments
 *       parameters:
 *         - in: path
 *           name: AppointmentID
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
 *                         example: Appointment uploads deleted successfully
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
router.delete("/:AppointmentID/uploads", pageAuthorisation(["Therapist", "Patient"]), appointmentUploadsDelete);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     TherapistAppointment:
 *       type: object
 *       properties:
 *         AppointmentID:
 *           type: number
 *           example: 8
 *         PatientID:
 *           type: number
 *           example: 8
 *         TherapistID:
 *           type: number
 *           example: 8
 *         AppointmentSlotID:
 *           type: number
 *           example: 8
 *         ScheduledDate:
 *           type: string
 *           example: 2022-11-08
 *         PaymentID:
 *           type: number
 *           example: 8
 *         PaymentStatus :
 *           type: string
 *           example: Completed
 *         AppointmentStatus:
 *           type: string
 *           example: Completed
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
 *         StartTime:
 *           type: string
 *           example: 16:18:11
 *         EndTime:
 *           type: string
 *           example: 16:18:11
 *         PatientName:
 *           type: string
 *           example: John Doe
 *         ParentName:
 *           type: string
 *           example: William James
 *         Token:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PatientAppointment:
 *       type: object
 *       properties:
 *         AppointmentID:
 *           type: number
 *           example: 8
 *         PatientID:
 *           type: number
 *           example: 8
 *         ScheduledDate:
 *           type: string
 *           example: 2022-11-08
 *         PaymentID:
 *           type: number
 *           example: 8
 *         PaymentStatus :
 *           type: string
 *           example: Completed
 *         AppointmentStatus:
 *           type: string
 *           example: Completed
 *         AppointmentSlotID:
 *           type: number
 *           example: 8
 *         TherapistID:
 *           type: number
 *           example: 8
 *         StartTime:
 *           type: string
 *           example: 16:18:11
 *         EndTime:
 *           type: string
 *           example: 16:18:11
 *         Status:
 *           type: number
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
 *         Designation:
 *           type: string
 *           example: Doctor
 *         Language:
 *           type: string
 *           example: English
 *         Photo:
 *           type: string
 *         TherapistType:
 *           type: string
 *           example: Special Educator
 *         Token:
 *           type: string
 *         CenterName:
 *           type: string
 *         DepartmentName:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TherapistAppointmentUpload:
 *       type: object
 *       properties:
 *         AppointmentUploadID:
 *           type: number
 *           example: 8
 *         AppointmentID:
 *           type: number
 *           example: 8
 *         UploadURL:
 *           type: string
 *         UserType:
 *           type: string
 *           example: Patient
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
