const router = require("express").Router();
const { body } = require("express-validator");
const {
  homeSessionList,
  homeSessionCreate,
  homeSessionUpdate,
  homeSessionReadUpdate,
} = require("../controllers/homeSession.controller");

const { pageAuthorisation } = require("../middleware/authorization");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");

/**
 *  @swagger
 *    tags:
 *      name: Home Sessions
 *      description: API to manage Home Sessions
 */

/**
 * @swagger
 *   /api/v1/homeSessions/{PatientID}:
 *     get:
 *       summary: Home Session List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Home Sessions
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
 *                           $ref: '#/components/schemas/HomeSession'
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
  "/:PatientID",
  pageAuthorisation(["Therapist", "Patient"]),
  homeSessionList
);

/**
 * @swagger
 *   /api/v1/homeSessions:
 *     post:
 *       summary: Home Session Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Home Sessions
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   PatientID:
 *                     type: integer
 *                     required: true
 *                     example: 2
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
 *                         example: Home Session created successfully
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
    body("ResourceTitle")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ResourceDescription")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ResourceType")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ResourceURL")
      .isURL()
      .withMessage("Value must be a url")
      .optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  homeSessionCreate
);

/**
 * @swagger
 *   /api/v1/homeSessions/{HomeSessionID}:
 *     put:
 *       summary: Home Session Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Home Sessions
 *       parameters:
 *         - in: path
 *           name: HomeSessionID
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
 *                         example: Home Session updated successfully
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
 *                         example: Home Session not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:HomeSessionID",
  pageAuthorisation(["Therapist"]),
  [
    body("ResourceTitle")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ResourceDescription")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ResourceType")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ResourceURL")
      .isURL()
      .withMessage("Value must be a url")
      .optional({ checkFalsy: true }),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  homeSessionUpdate
);

/**
 * @swagger
 *   /api/v1/homeSessions/{HomeSessionID}/read:
 *     put:
 *       summary: Home Session Mark As Read
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Home Sessions
 *       parameters:
 *         - in: path
 *           name: HomeSessionID
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
 *                   Rating:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   Read:
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
 *                         example: Home session updated successfully
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
 *                         example: Home session not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:HomeSessionID/read",
  pageAuthorisation(["Patient"]),
  [
    body("Rating").isNumeric().withMessage("Value must be a number").trim(),
    body("Read").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  homeSessionReadUpdate
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     HomeSession:
 *       type: object
 *       properties:
 *         HomeSessionID:
 *           type: number
 *           example: 8
 *         ResourceTitle:
 *           type: string
 *         ResourceDescription:
 *           type: string
 *         ResourceType:
 *           type: string
 *         ResourceURL:
 *           type: string
 *         Rating:
 *           type: number
 *           example: 1.5
 *         IsRead:
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
