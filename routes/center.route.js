const router = require("express").Router();
const { body } = require("express-validator");
const {
  centerList,
  centerDetails,
  centerCreate,
  centerUpdate,
  centerDelete,
  centerSearch,
} = require("../controllers/center.controller");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Centers
 *      description: API to manage centers
 */

/**
 * @swagger
 *   /api/v1/centers:
 *     get:
 *       summary: Centers List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Centers
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
 *                           $ref: '#/components/schemas/Center'
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
router.get("/", pageAuthorisation(["SuperAdmin", "ClientAdmin"]), centerList);

/**
 * @swagger
 *   /api/v1/centers/{CenterID}:
 *     get:
 *       summary: Center Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Centers
 *       parameters:
 *         - in: path
 *           name: CenterID
 *           description: Not required if the user is center, instead pass any integer
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
 *                           $ref: '#/components/schemas/Center'
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
 *                         example: Center not found
 *         "500":
 *           description: Internal server error
 */
router.get("/:CenterID", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center"]), centerDetails);

/**
 * @swagger
 *   /api/v1/centers/search:
 *     post:
 *       summary: Center Search
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Centers
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   CenterName:
 *                     type: string
 *                     required: false
 *                     example: KIMS
 *                   EmailId:
 *                     type: string
 *                     required: false
 *                     example: contact@example.com
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
 *                           $ref: '#/components/schemas/Center'
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
  pageAuthorisation(["SuperAdmin", "ClientAdmin"]),
  [body("CenterName").trim().escape(), body("EmailId").trim().escape()],
  validateRequestSchema,
  centerSearch
);

/**
 * @swagger
 *   /api/v1/centers:
 *     post:
 *       summary: Center Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Centers
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   EmailId:
 *                     required: true
 *                     type: string
 *                     example: contact@example.in
 *                   UserName:
 *                     required: true
 *                     type: string
 *                     example: kennedy
 *                   Phone:
 *                     required: true
 *                     type: string
 *                     example: 9876543210
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
 *                   Password:
 *                     required: true
 *                     type: string
 *                     example: Kennedy@Center#1
 *                   ClientID:
 *                     type: integer
 *                     required: true
 *                     description: ClientID is only required when the user is SuperAdmin, for other users, pass zero or any other value.
 *                     example: 2
 *                   CenterName:
 *                     type: string
 *                     required: true
 *                     example: KIMS
 *                   CenterType:
 *                     type: string
 *                     required: true
 *                     example: Partner
 *                   CenterHeadSalutation:
 *                     type: string
 *                     required: true
 *                     example: Mr
 *                   CenterHeadName:
 *                     type: string
 *                     required: true
 *                     example: John Doe
 *                   CenterHeadDesignation:
 *                     type: string
 *                     required: true
 *                     example: Doctor
 *                   CenterHeadEmailId:
 *                     type: string
 *                     required: true
 *                     example: contact@auticareweb.com
 *                   CenterHeadPhone:
 *                     type: string
 *                     required: true
 *                     example: 9876543211
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
 *                         example: Center created successfully
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
 *                         example: Center not found
 *         "500":
 *           description: Internal server error
 */
router.post(
  "/",
  pageAuthorisation(["SuperAdmin", "ClientAdmin"]),
  [
    body("EmailId").isEmail().normalizeEmail(),
    body("UserName").not().isEmpty().withMessage("Field is required").trim(),
    body("Phone").trim(),
    body("AddressLine1").not().isEmpty().withMessage("Field is required").trim(),
    body("AddressLine2").not().isEmpty().withMessage("Field is required").trim(),
    body("City").not().isEmpty().withMessage("Field is required").trim(),
    body("District").not().isEmpty().withMessage("Field is required").trim(),
    body("Pincode").not().isEmpty().withMessage("Field is required").isNumeric().withMessage("Value must be a digit"),
    body("State").not().isEmpty().withMessage("Field is required").trim(),
    body("Country").not().isEmpty().withMessage("Value must be a string").trim(),
    body("Password").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("ClientID").isNumeric().withMessage("Value must be a number"),
    body("CenterName").not().isEmpty().withMessage("Field is required").trim(),
    body("CenterType").not().isEmpty().withMessage("Field is required").trim(),
    body("CenterHeadSalutation").not().isEmpty().withMessage("Field is required").trim(),
    body("CenterHeadName").not().isEmpty().withMessage("Field is required").trim(),
    body("CenterHeadDesignation").not().isEmpty().withMessage("Field is required").trim(),
    body("CenterHeadEmailId").isEmail().normalizeEmail(),
    body("CenterHeadPhone").not().isEmpty().withMessage("Field is required"),
  ],
  validateRequestSchema,
  centerCreate
);

/**
 * @swagger
 *   /api/v1/centers/{CenterID}:
 *     put:
 *       summary: Center Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Centers
 *       parameters:
 *         - in: path
 *           name: CenterID
 *           description: Not required if the user is center, instead pass any integer
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
 *                   Phone:
 *                     required: true
 *                     type: string
 *                     example: 9876543210
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
 *                   Status:
 *                     required: true
 *                     type: boolean
 *                   CenterName:
 *                     type: string
 *                     required: true
 *                     example: KIMS
 *                   CenterType:
 *                     type: string
 *                     required: true
 *                     example: Partner
 *                   CenterHeadSalutation:
 *                     type: string
 *                     required: true
 *                     example: Mr
 *                   CenterHeadName:
 *                     type: string
 *                     required: true
 *                     example: Mr. John Doe
 *                   CenterHeadDesignation:
 *                     type: string
 *                     required: true
 *                     example: Doctor
 *                   CenterHeadEmailId:
 *                     type: string
 *                     required: true
 *                     example: contact@auticareweb.com
 *                   CenterHeadPhone:
 *                     type: string
 *                     required: true
 *                     example: 9876543211
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
 *                         example: Center updated successfully
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
 *                         example: Center not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:CenterID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center"]),
  [
    body("Phone").trim(),
    body("AddressLine1").not().isEmpty().withMessage("Field is required").trim(),
    body("AddressLine2").not().isEmpty().withMessage("Field is required").trim(),
    body("City").not().isEmpty().withMessage("Field is required").trim(),
    body("District").not().isEmpty().withMessage("Field is required").trim(),
    body("Pincode").not().isEmpty().withMessage("Field is required").isNumeric().withMessage("Value must be a digit"),
    body("State").not().isEmpty().withMessage("Field is required").trim(),
    body("Country").not().isEmpty().withMessage("Field is required").trim(),
    body("Status").not().isEmpty().withMessage("Field is required").trim(),
    body("CenterName").not().isEmpty().withMessage("Field is required").trim(),
    body("CenterType").not().isEmpty().withMessage("Field is required").trim(),
    body("CenterHeadSalutation").not().isEmpty().withMessage("Field is required").trim(),
    body("CenterHeadName").not().isEmpty().withMessage("Field is required").trim(),
    body("CenterHeadDesignation").not().isEmpty().withMessage("Field is required").trim(),
    body("CenterHeadEmailId").isEmail().normalizeEmail(),
    body("CenterHeadPhone").not().isEmpty().withMessage("Field is required"),
  ],
  validateRequestSchema,
  centerUpdate
);

/**
 * @swagger
 *   /api/v1/centers/{CenterID}:
 *     delete:
 *       summary: Center Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Centers
 *       parameters:
 *         - in: path
 *           name: CenterID
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
 *                         example: Center deleted successfully
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
 *                         example: Center not found
 *         "500":
 *           description: Internal server error
 */
router.delete("/:CenterID", pageAuthorisation(["SuperAdmin", "ClientAdmin"]), centerDelete);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Center:
 *       type: object
 *       properties:
 *         UserID:
 *           type: number
 *           example: 8
 *         EmailId:
 *           type: string
 *           example: contact@example.in
 *         UserName:
 *           type: string
 *           example: kennedy
 *         Phone:
 *           type: string
 *           example: 9876543210
 *         AddressLine1:
 *           type: string
 *           example: Karamana Trivandrum
 *         AddressLine2:
 *           type: string
 *           example: Kerala India
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
 *           example: 2
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
 *         CenterID:
 *           type: number
 *           example: 3
 *         ClientID:
 *           type: number
 *           example: 3
 *         CenterName:
 *           type: string
 *           example: KIMS
 *         CenterType:
 *           type: string
 *           example: Partner
 *         CenterHeadSalutation:
 *           type: string
 *           example: Mr
 *         CenterHeadName:
 *           type: string
 *           example: Williams
 *         CenterHeadDesignation:
 *           type: string
 *           example: Doctor
 *         CenterHeadEmailID:
 *           type: string
 *           example: contact@auticareweb.com
 *         CenterHeadPhone:
 *           type: string
 *           example: 9876543211
 *         ClientName:
 *           type: string
 */
