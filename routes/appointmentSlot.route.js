const router = require("express").Router();
const { body } = require("express-validator");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");
const {
  appointmentSlotCreate,
  appointmentSlotList,
  appointmentSlotUpdate,
  appointmentSlotListByTherapistID,
} = require("../controllers/appointmentSlot.controller");

/**
 *  @swagger
 *    tags:
 *      name: Appointment Slots
 *      description: API to manage appointmentSlots
 */

/**
 * @swagger
 *   /api/v1/appointmentSlots:
 *     get:
 *       summary: Appointment Slot List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointment Slots
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
 *                             - $ref: '#/components/schemas/AppointmentSlotPatient'
 *                             - $ref: '#/components/schemas/AppointmentSlotTherapist'
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
  pageAuthorisation(["Therapist", "Patient"]),
  appointmentSlotList
);

/**
 * @swagger
 *   /api/v1/appointmentSlots/{TherapistID}:
 *     get:
 *       summary: Appointment Slot List By TherapistID
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointment Slots
 *       parameters:
 *         - in: path
 *           name: TherapistID
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
 *                           $ref: '#/components/schemas/AppointmentSlotPatient'
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
  "/:TherapistID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist", "Patient"]),
  appointmentSlotListByTherapistID
);

/**
 * @swagger
 *   /api/v1/appointmentSlots:
 *     post:
 *       summary: Appointment Slots Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointment Slots
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   TherapistID:
 *                     type: number
 *                   AppointmentSlots:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         StartTime:
 *                           type: string
 *                           required: true
 *                           example: 05:13
 *                         EndTime:
 *                           type: string
 *                           required: true
 *                           example: 18:13
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
 *                         example: Appointment slots created successfully
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
    body("TherapistID")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim()
      .optional({ checkFalsy: true }),
    body("AppointmentSlots")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array"),
    body("AppointmentSlots.*.StartTime")
      .matches("([01]?[0-9]|2[0-3]):[0-5][0-9]")
      .withMessage("Value must be time with HH:MM format"),
    body("AppointmentSlots.*.EndTime")
      .matches("([01]?[0-9]|2[0-3]):[0-5][0-9]")
      .withMessage("Value must be time with HH:MM format"),
  ],
  validateRequestSchema,
  appointmentSlotCreate
);

/**
 * @swagger
 *   /api/v1/appointmentSlots/{AppointmentSlotID}:
 *     put:
 *       summary: Appointment Slot Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Appointment Slots
 *       parameters:
 *         - in: path
 *           name: AppointmentSlotID
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
 *                   StartTime:
 *                     type: string
 *                     required: true
 *                     example: 05:13
 *                   EndTime:
 *                     type: string
 *                     required: true
 *                     example: 18:13
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
 *                         example: Appointment slot updated successfully
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
 *                         example: Appointment slot not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:AppointmentSlotID",
  pageAuthorisation(["Therapist"]),
  [
    body("StartTime")
      .matches("([01]?[0-9]|2[0-3]):[0-5][0-9]")
      .withMessage("Value must be time with HH:MM format"),
    body("EndTime")
      .matches("([01]?[0-9]|2[0-3]):[0-5][0-9]")
      .withMessage("Value must be time with HH:MM format"),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  appointmentSlotUpdate
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     AppointmentSlotPatient:
 *       type: object
 *       properties:
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
 *         CenterName:
 *           type: string
 *           example: KIMS
 *         Token:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AppointmentSlotTherapist:
 *       type: object
 *       properties:
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
 *         Token:
 *           type: string
 */
