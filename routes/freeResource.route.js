const router = require("express").Router();
const { body } = require("express-validator");
const {
  freeResourceList,
  freeResourceDetails,
  freeResourceCreate,
  freeResourceUpdate,
  freeResourceClickUpdate,
} = require("../controllers/freeResource.controller");

const { pageAuthorisation } = require("../middleware/authorization");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");

/**
 *  @swagger
 *    tags:
 *      name: Free Resources
 *      description: API to manage Free Resources
 */

/**
 * @swagger
 *   /api/v1/freeResources:
 *     get:
 *       summary: Free Resource List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Free Resources
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
 *                           $ref: '#/components/schemas/FreeResource'
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
  pageAuthorisation([
    "SuperAdmin",
    "ClientAdmin",
    "Center",
    "Therapist",
    "Patient",
  ]),
  freeResourceList
);

/**
 * @swagger
 *   /api/v1/freeResources/{FreeResourceID}:
 *     get:
 *       summary: Free Resource Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Free Resources
 *       parameters:
 *         - in: path
 *           name: FreeResourceID
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
 *                           $ref: '#/components/schemas/FreeResource'
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
 *                         example: Free Resource not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:FreeResourceID",
  pageAuthorisation([
    "SuperAdmin",
    "ClientAdmin",
    "Center",
    "Therapist",
    "Patient",
  ]),
  freeResourceDetails
);

/**
 * @swagger
 *   /api/v1/freeResources:
 *     post:
 *       summary: Free Resource Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Free Resources
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
 *                         example: Free Resource created successfully
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
  freeResourceCreate
);

/**
 * @swagger
 *   /api/v1/freeResources/{FreeResourceID}:
 *     put:
 *       summary: Free Resource Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Free Resources
 *       parameters:
 *         - in: path
 *           name: FreeResourceID
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
 *                         example: Free Resource updated successfully
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
 *                         example: Free Resource not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:FreeResourceID",
  pageAuthorisation(["SuperAdmin"]),
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
  freeResourceUpdate
);

/**
 * @swagger
 *   /api/v1/freeResources/{FreeResourceID}/click:
 *     put:
 *       summary: Free Resource Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Free Resources
 *       parameters:
 *         - in: path
 *           name: FreeResourceID
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
 *                         example: Free Resource updated successfully
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
 *                         example: Free Resource not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:FreeResourceID/click",
  pageAuthorisation(["Patient"]),
  freeResourceClickUpdate
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     FreeResource:
 *       type: object
 *       properties:
 *         FreeResourceID:
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
 *         MaxClicks:
 *           type: number
 *           example: 1
 *         Clicks:
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
