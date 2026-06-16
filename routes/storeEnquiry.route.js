const router = require("express").Router();
const { body } = require("express-validator");
const {
  storeEnquiryList,
  storeEnquiryDetails,
  storeEnquiryCreate,
  storeEnquiryUpdate,
  storeEnquiryDelete,
} = require("../controllers/storeEnquiry.controller");

const { pageAuthorisation } = require("../middleware/authorization");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");

/**
 *  @swagger
 *    tags:
 *      name: Store Enquiries
 *      description: API to manage Store Enquiries
 */

/**
 * @swagger
 *   /api/v1/storeEnquiries:
 *     get:
 *       summary: Store Enquiry List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Store Enquiries
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
 *                           $ref: '#/components/schemas/StoreEnquiry'
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
router.get("/", pageAuthorisation(["SuperAdmin"]), storeEnquiryList);

/**
 * @swagger
 *   /api/v1/storeEnquiries/{StoreEnquiryID}:
 *     get:
 *       summary: Store Enquiry Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Store Enquiries
 *       parameters:
 *         - in: path
 *           name: StoreEnquiryID
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
 *                           $ref: '#/components/schemas/StoreEnquiry'
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
 *                         example: Store Enquiry not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:StoreEnquiryID",
  pageAuthorisation(["SuperAdmin"]),
  storeEnquiryDetails
);

/**
 * @swagger
 *   /api/v1/storeEnquiries:
 *     post:
 *       summary: Store Enquiry Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Store Enquiries
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ProductID:
 *                     type: number
 *                     required: true
 *                   Enquiry:
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
 *                         example: Store Enquiry created successfully
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
  pageAuthorisation(["ClientAdmin", "Center", "Therapist"]),
  [
    body("ProductID").isNumeric().withMessage("Value must be a number").trim(),
    body("Enquiry").not().isEmpty().withMessage("Field is required").trim(),
  ],
  validateRequestSchema,
  storeEnquiryCreate
);

/**
 * @swagger
 *   /api/v1/storeEnquiries/{StoreEnquiryID}:
 *     put:
 *       summary: Store Enquiry Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Store Enquiries
 *       parameters:
 *         - in: path
 *           name: StoreEnquiryID
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
 *                   IsAdminViewed:
 *                     type: number
 *                     required: true
 *                     example: 1
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
 *                         example: Store Enquiry updated successfully
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
 *                         example: Store Enquiry not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:StoreEnquiryID",
  pageAuthorisation(["SuperAdmin"]),
  [
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
    body("IsAdminViewed")
      .isBoolean()
      .withMessage("Value must be boolean")
      .trim(),
  ],
  validateRequestSchema,
  storeEnquiryUpdate
);

router.delete(
  "/:StoreEnquiryID",
  pageAuthorisation(["SuperAdmin"]),
  storeEnquiryDelete
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     StoreEnquiry:
 *       type: object
 *       properties:
 *         StoreEnquiryID:
 *           type: number
 *           example: 8
 *         Enquiry:
 *           type: string
 *         IsAdminViewed:
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
 *         Name:
 *           type: string
 *         EmailId:
 *           type: string
 *         Phone:
 *           type: string
 *         ProductName:
 *           type: string
 */
