const router = require("express").Router();
const { body } = require("express-validator");
const {
  paymentList,
  paymentDetails,
  paymentCreate,
  paymentUpdate,
} = require("../controllers/payment.controller");

const { pageAuthorisation } = require("../middleware/authorization");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");

/**
 *  @swagger
 *    tags:
 *      name: Payments
 *      description: API to manage Payments
 */

/**
 * @swagger
 *   /api/v1/payments:
 *     get:
 *       summary: Payment List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Payments
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
 *                           $ref: '#/components/schemas/Payment'
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
router.get("/", pageAuthorisation(["SuperAdmin"]), paymentList);

/**
 * @swagger
 *   /api/v1/payments/{PaymentID}:
 *     get:
 *       summary: Payment Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Payments
 *       parameters:
 *         - in: path
 *           name: PaymentID
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
 *                           $ref: '#/components/schemas/Payment'
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
 *                         example: Payment not found
 *         "500":
 *           description: Internal server error
 */
router.get("/:PaymentID", pageAuthorisation(["SuperAdmin"]), paymentDetails);

/**
 * @swagger
 *   /api/v1/payments:
 *     post:
 *       summary: Payment Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Payments
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ClientID:
 *                     type: integer
 *                     required: true
 *                     example: 2
 *                   Amount:
 *                     type: integer
 *                     required: true
 *                     example: 2
 *                   Description:
 *                     type: string
 *                     required: true
 *                   PaymentType:
 *                     type: string
 *                     required: true
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
 *                         example: Payment created successfully
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
  pageAuthorisation(["SuperAdmin"]),
  [
    body("ClientID").isNumeric().withMessage("Value must be a number"),
    body("Amount").isNumeric().withMessage("Value must be a number"),
    body("Description").not().isEmpty().withMessage("Field is required").trim(),
    body("PaymentType").not().isEmpty().withMessage("Field is required").trim(),
  ],
  validateRequestSchema,
  paymentCreate
);

/**
 * @swagger
 *   /api/v1/payments/{PaymentID}:
 *     put:
 *       summary: Payment Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Payments
 *       parameters:
 *         - in: path
 *           name: PaymentID
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
 *                   ResourceTitle:
 *                     type: string
 *                     required: true
 *                   ResourceDescription:
 *                     type: string
 *                     required: true
 *                   ResourceType:
 *                     type: string
 *                     required: true
 *                   ResourceURL:
 *                     type: string
 *                   Status:
 *                     type: number
 *                     required: true
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
 *                         example: Payment updated successfully
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
 *                         example: Payment not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:PaymentID",
  pageAuthorisation(["SuperAdmin"]),
  [
    body("ClientID").isNumeric().withMessage("Value must be a number"),
    body("Amount").isNumeric().withMessage("Value must be a number"),
    body("Description").not().isEmpty().withMessage("Field is required").trim(),
    body("PaymentType").not().isEmpty().withMessage("Field is required").trim(),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  paymentUpdate
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         PaymentID:
 *           type: number
 *           example: 8
 *         ClientID:
 *           type: number
 *           example: 8
 *         Amount:
 *           type: number
 *           example: 8
 *         Description:
 *           type: string
 *         PaymentType:
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
 *         ClientName:
 *           type: string
 */
