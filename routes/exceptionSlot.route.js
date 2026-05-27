const router = require("express").Router();
const { body } = require("express-validator");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");
const {
  exceptionSlotCreate,
  exceptionSlotList,
  exceptionSlotUpdate,
} = require("../controllers/exceptionSlot.controller");

/**
 *  @swagger
 *    tags:
 *      name: Exception Slots
 *      description: API to manage exceptionSlots
 */

/**
 * @swagger
 *   /api/v1/exceptionSlots:
 *     get:
 *       summary: Exception Slots List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Exception Slots
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
 *                           $ref: '#/components/schemas/ExceptionSlot'
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
router.get("/", pageAuthorisation(["Therapist"]), exceptionSlotList);

/**
 * @swagger
 *   /api/v1/exceptionSlots:
 *     post:
 *       summary: Exception Slots Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Exception Slots
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ExceptionSlots:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Date:
 *                           type: string
 *                           required: true
 *                           example: 12/23/2023
 *                         AppointmentSlotID:
 *                           required: true
 *                           type: number
 *                         IsLeaveFullDay:
 *                           required: true
 *                           type: boolean
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
 *                         example: Exception slots created successfully
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
    body("ExceptionSlots")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array"),
    body("ExceptionSlots.*.Date")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format"),
    body("ExceptionSlots.*.AppointmentSlotID")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("ExceptionSlots.*.IsLeaveFullDay")
      .isBoolean()
      .withMessage("Value must be boolean")
      .trim(),
  ],
  validateRequestSchema,
  exceptionSlotCreate
);

/**
 * @swagger
 *   /api/v1/exceptionSlots/{ExceptionSlotID}:
 *     put:
 *       summary: Exception Slot Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Exception Slots
 *       parameters:
 *         - in: path
 *           name: ExceptionSlotID
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
 *                   Date:
 *                     type: string
 *                     required: true
 *                     example: 12/23/2023
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
 *                         example: Exception slot updated successfully
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
 *                         example: Exception slot not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:ExceptionSlotID",
  pageAuthorisation(["Therapist"]),
  [
    body("Date")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Value must be a date with MM/DD/YYYY format"),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  exceptionSlotUpdate
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     ExceptionSlot:
 *       type: object
 *       properties:
 *         ExceptionSlotID:
 *           type: number
 *           example: 8
 *         AppointmentSlotID:
 *           type: number
 *           example: 8
 *         TherapistID:
 *           type: number
 *           example: 8
 *         Date:
 *           type: string
 *         IsLeaveFullDay:
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
