const router = require("express").Router();
const { body, query } = require("express-validator");
const {
  clientList,
  clientDetails,
  clientCreate,
  clientUpdate,
  clientDelete,
  clientPermanentDelete,
  clientSearch,
  activateClientSubscription,
} = require("../controllers/client.controller");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Clients
 *      description: API to manage clients
 */

/**
 * @swagger
 *   /api/v1/clients:
 *     get:
 *       summary: Clients List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Clients
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
 *                           $ref: '#/components/schemas/Client'
 *                       counts:
 *                         type: array
 *                         items:
 *                           type: object
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
router.get("/", pageAuthorisation(["SuperAdmin"]), clientList);

/**
 * @swagger
 *   /api/v1/clients/{ClientID}:
 *     get:
 *       summary: Client Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Clients
 *       parameters:
 *         - in: path
 *           name: ClientID
 *           required: true
 *           description: Not required if the user is client, instead pass any integer
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
 *                           $ref: '#/components/schemas/Client'
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
 *                         example: Client not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:ClientID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin"]),
  clientDetails
);

/**
 * @swagger
 *   /api/v1/clients/search:
 *     post:
 *       summary: Client Search
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Clients
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ClientName:
 *                     type: string
 *                     required: false
 *                     example: Josef Kennedy
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
 *                           $ref: '#/components/schemas/Client'
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
  pageAuthorisation(["SuperAdmin"]),
  [body("ClientName").trim().escape(), body("EmailId").trim().escape()],
  validateRequestSchema,
  clientSearch
);

/**
 * @swagger
 *   /api/v1/clients:
 *     post:
 *       summary: Client Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Clients
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ClientName:
 *                     type: string
 *                     required: true
 *                     example: Josef Kennedy
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
 *                     required: false
 *                     example: Kerala, India
 *                   City:
 *                     type: string
 *                     required: true
 *                     example: Karamana
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
 *                     required: false
 *                     type: string
 *                     example: Kennedy@Client#1
 *                   ClientLogo:
 *                     type: string
 *                     required: true
 *                     example: https://pngimg.com/uploads/github/github_PNG28.png
 *                   WebsiteURL:
 *                     type: string
 *                     required: false
 *                     example: www.auticareweb.com
 *                   ClientType:
 *                     type: string
 *                     required: true
 *                     example: Default
 *                   OrganizationType:
 *                     type: string
 *                     required: true
 *                     example: Government
 *                   ContactPersonName:
 *                     type: string
 *                     required: true
 *                     example: Williams
 *                   ContactPersonDesignation:
 *                     type: string
 *                     required: true
 *                     example: Doctor
 *                   ContactEmailId:
 *                     type: string
 *                     required: true
 *                     example: contact@auticareweb.com
 *                   IncorporationCertificateURL:
 *                     type: string
 *                     required: true
 *                     example: https://cdn11.bigcommerce.com/s-x7muwsaa/images/stencil/2048x2048/products/925/3354/Acceptance-Certificates-Demo-proof2__48247.1535117880.jpg?c=2
 *                   RegistrationCertificateURL:
 *                     type: string
 *                     required: true
 *                     example: https://cdn11.bigcommerce.com/s-x7muwsaa/images/stencil/2048x2048/products/925/3354/Acceptance-Certificates-Demo-proof2__48247.1535117880.jpg?c=2
 *                   SubscriptionPlanId:
 *                     type: integer
 *                     required: true
 *                     example: 1
 *                   SubscriptionPlanStatus:
 *                     type: string
 *                     required: true
 *                     example: Payment Success
 *                   PaymentId:
 *                     type: string
 *                     required: true
 *                     example: f45d6sa45a6df
 *                   BillingAddressLine1:
 *                     type: string
 *                     required: false
 *                     example: Karamana, Trivandrum
 *                   BillingAddressLine2:
 *                     type: string
 *                     required: false
 *                     example: Kerala, India
 *                   BillingCity:
 *                     type: string
 *                     required: false
 *                     example: Karamana
 *                   BillingDistrict:
 *                     type: string
 *                     required: false
 *                     example: Trivandrum
 *                   BillingPincode:
 *                     type: string
 *                     required: false
 *                     example: 625478
 *                   BillingState:
 *                     type: string
 *                     required: false
 *                     example: Kerala
 *                   BillingCountry:
 *                     type: string
 *                     required: false
 *                     example: India
 *                   GSTNumber:
 *                     type: string
 *                     required: true
 *                     example: GST5484564
 *                   Bank:
 *                     type: string
 *                     required: false
 *                   BankAccountNumber:
 *                     type: string
 *                     required: false
 *                   Branch:
 *                     type: string
 *                     required: false
 *                     example: Karamana
 *                   IFSCCode:
 *                     type: string
 *                     required: false
 *                     example: SBI123456
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
 *                         example: Client created successfully
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
    body("ClientName").not().isEmpty().withMessage("Field is required").trim(),
    body("EmailId").isEmail().normalizeEmail(),
    body("UserName").not().isEmpty().withMessage("Field is required").trim(),
    body("Phone").trim(),
    body("AddressLine1")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("AddressLine2").trim(),
    body("City").not().isEmpty().withMessage("Field is required").trim(),
    body("Pincode")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .isNumeric()
      .withMessage("Value must be a digit"),
    body("State").not().isEmpty().withMessage("Field is required").trim(),
    body("Country").not().isEmpty().withMessage("Field is required").trim(),
    body("Password").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("WebsiteURL").isURL({ require_protocol: false }).optional({ checkFalsy: true }),
    body("ClientType").not().isEmpty().withMessage("Field is required").trim(),
    body("OrganizationType")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ContactPersonName")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ContactPersonDesignation")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ContactEmailId").isEmail().normalizeEmail(),
    body("IncorporationCertificateURL")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("Value must be a url"),
    body("RegistrationCertificateURL")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("Value must be a url"),
    body("SubscriptionPlanId")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("SubscriptionPlanStatus")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("PaymentId").not().isEmpty().withMessage("Field is required").trim(),
    body("BillingAddressLine1").trim(),
    body("BillingAddressLine2").trim(),
    body("BillingCity").trim(),
    body("BillingDistrict").trim(),
    body("BillingPincode").trim(),
    body("BillingState").trim(),
    body("BillingCountry").trim(),
    body("GSTNumber").not().isEmpty().withMessage("Field is required").trim(),
    body("Bank").trim(),
    body("BankAccountNumber").trim(),
    body("Branch").trim(),
    body("IFSCCode").trim(),
  ],
  validateRequestSchema,
  clientCreate
);

/**
 * @swagger
 *   /api/v1/clients/{ClientID}:
 *     put:
 *       summary: Client Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Clients
 *       parameters:
 *         - in: path
 *           name: ClientID
 *           description: Not required if the user is client, instead pass any integer
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
 *                   ClientName:
 *                     type: string
 *                     required: true
 *                     example: Josef Kennedy
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
 *                     required: false
 *                     example: Kerala, India
 *                   City:
 *                     type: string
 *                     required: true
 *                     example: Karamana
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
 *                   ClientLogo:
 *                     type: string
 *                     required: true
 *                     example: https://pngimg.com/uploads/github/github_PNG28.png
 *                   WebsiteURL:
 *                     type: string
 *                     required: false
 *                     example: www.auticareweb.com
 *                   ClientType:
 *                     type: string
 *                     required: true
 *                     example: Default
 *                   OrganizationType:
 *                     type: string
 *                     required: true
 *                     example: Government
 *                   ContactPersonName:
 *                     type: string
 *                     required: true
 *                     example: Williams
 *                   ContactPersonDesignation:
 *                     type: string
 *                     required: true
 *                     example: Doctor
 *                   ContactEmailId:
 *                     type: string
 *                     required: true
 *                     example: contact@auticareweb.com
 *                   IncorporationCertificateURL:
 *                     type: string
 *                     required: true
 *                     example: https://cdn11.bigcommerce.com/s-x7muwsaa/images/stencil/2048x2048/products/925/3354/Acceptance-Certificates-Demo-proof2__48247.1535117880.jpg?c=2
 *                   RegistrationCertificateURL:
 *                     type: string
 *                     required: true
 *                     example: https://cdn11.bigcommerce.com/s-x7muwsaa/images/stencil/2048x2048/products/925/3354/Acceptance-Certificates-Demo-proof2__48247.1535117880.jpg?c=2
 *                   UpdateSubscriptionPlan:
 *                     required: true
 *                     type: boolean
 *                   SubscriptionPlanId:
 *                     type: integer
 *                     required: true
 *                     example: 1
 *                   SubscriptionPlanStatus:
 *                     type: string
 *                     required: true
 *                     example: Payment Success
 *                   PaymentId:
 *                     type: string
 *                     required: true
 *                     example: f45d6sa45a6df
 *                   BillingAddressLine1:
 *                     type: string
 *                     required: false
 *                     example: Karamana, Trivandrum
 *                   BillingAddressLine2:
 *                     type: string
 *                     required: false
 *                     example: Kerala, India
 *                   BillingCity:
 *                     type: string
 *                     required: false
 *                     example: Karamana
 *                   BillingDistrict:
 *                     type: string
 *                     required: false
 *                     example: Trivandrum
 *                   BillingPincode:
 *                     type: string
 *                     required: false
 *                     example: 625478
 *                   BillingState:
 *                     type: string
 *                     required: false
 *                     example: Kerala
 *                   BillingCountry:
 *                     type: string
 *                     required: false
 *                     example: India
 *                   GSTNumber:
 *                     type: string
 *                     required: true
 *                     example: GST5484564
 *                   Bank:
 *                     type: string
 *                     required: false
 *                   BankAccountNumber:
 *                     type: string
 *                     required: false
 *                   Branch:
 *                     type: string
 *                     required: false
 *                     example: Karamana
 *                   IFSCCode:
 *                     type: string
 *                     required: false
 *                     example: SBI123456
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
 *                         example: Client updated successfully
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
 *                         example: Client not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:ClientID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin"]),
  [
    body("ClientName").not().isEmpty().withMessage("Field is required").trim(),
    body("Phone").trim(),
    body("AddressLine1")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("AddressLine2").trim(),
    body("City").not().isEmpty().withMessage("Field is required").trim(),
    body("Pincode")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .isNumeric()
      .withMessage("Value must be a digit"),
    body("State").not().isEmpty().withMessage("Field is required").trim(),
    body("Country").not().isEmpty().withMessage("Field is required").trim(),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
    body("WebsiteURL").isURL({ require_protocol: false }),
    body("ClientType").not().isEmpty().withMessage("Field is required").trim(),
    body("OrganizationType")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ContactPersonName")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ContactPersonDesignation")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ContactEmailId").isEmail().normalizeEmail(),
    body("IncorporationCertificateURL")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("Value must be a url"),
    body("RegistrationCertificateURL")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("Value must be a url"),
    body("UpdateSubscriptionPlan").isBoolean().withMessage("Value must be boolean").trim(),
    body("SubscriptionPlanId")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("SubscriptionPlanStatus")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("PaymentId").not().isEmpty().withMessage("Field is required").trim(),
    body("BillingAddressLine1").trim(),
    body("BillingAddressLine2").trim(),
    body("BillingCity").trim(),
    body("BillingDistrict").trim(),
    body("BillingPincode").trim(),
    body("BillingState").trim(),
    body("BillingCountry").trim(),
    body("GSTNumber").not().isEmpty().withMessage("Field is required").trim(),
    body("Bank").trim(),
    body("BankAccountNumber").trim(),
    body("Branch").trim(),
    body("IFSCCode").trim(),
  ],
  validateRequestSchema,
  clientUpdate
);

/**
 * @swagger
 *   /api/v1/clients/{ClientID}:
 *     delete:
 *       summary: Client Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Clients
 *       parameters:
 *         - in: path
 *           name: ClientID
 *           required: true
 *           schema:
 *             type: integer
 *         - in: query
 *           name: Status
 *           required: false
 *           description: Pass 1/true for enabling and 0/false/undefined(value not required) for disabling
 *           schema:
 *             type: boolean
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
 *                         example: Client deleted successfully
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
 *                         example: Client not found
 *         "500":
 *           description: Internal server error
 */
router.post(
  "/:ClientID/activate-subscription",
  pageAuthorisation(["SuperAdmin"]),
  activateClientSubscription
);

router.delete(
  "/:ClientID",
  pageAuthorisation(["SuperAdmin"]),
  [
    query("Status")
      .isBoolean()
      .withMessage("Value must be boolean")
      .optional({ checkFalsy: true, nullable: true }),
  ],
  clientDelete
);

router.delete(
  "/:ClientID/permanent",
  pageAuthorisation(["SuperAdmin"]),
  clientPermanentDelete
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         UserID:
 *           type: number
 *           example: 8
 *         ClientName:
 *           type: string
 *           example: Josef Kennedy
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
 *         ClientID:
 *           type: number
 *           example: 3
 *         ClientLogo:
 *           type: string
 *           example: https://pngimg.com/uploads/github/github_PNG28.png
 *         WebsiteURL:
 *           type: string
 *           example: www.auticareweb.com
 *         ClientType:
 *           type: string
 *           example: Default
 *         OrganizationType:
 *           type: string
 *           example: Government
 *         ContactPersonName:
 *           type: string
 *           example: Williams
 *         ContactPersonDesignation:
 *           type: string
 *           example: Doctor
 *         ContactEmailId:
 *           type: string
 *           example: contact@auticareweb.com
 *         IncorporationCertificateURL:
 *           type: string
 *           example: https://cdn11.bigcommerce.com/s-x7muwsaa/images/stencil/2048x2048/products/925/3354/Acceptance-Certificates-Demo-proof2__48247.1535117880.jpg?c=2
 *         RegistrationCertificateURL:
 *           type: string
 *           example: https://cdn11.bigcommerce.com/s-x7muwsaa/images/stencil/2048x2048/products/925/3354/Acceptance-Certificates-Demo-proof2__48247.1535117880.jpg?c=2
 *         SubscriptionPlanId:
 *           type: number
 *           example: 1
 *         SubscriptionPlanStatus:
 *           type: string
 *           example: Payment Success
 *         SubscriptionPlanActivatedDate:
 *           type: string
 *           example: 2021-12-31T18:30:00.000Z
 *         SubcriptionPlanEndDate:
 *           type: string
 *           example: 2023-09-30T18:30:00.000Z
 *         PaymentId:
 *           type: string
 *           example: f45d6sa45a6df
 *         BillingAddressLine1:
 *           type: string
 *           example: Karamana, Trivandrum
 *         BillingAddressLine2:
 *           type: string
 *           example: Kerala, India
 *         BillingCity:
 *           type: string
 *           example: Karamana
 *         BillingDistrict:
 *           type: string
 *           example: Trivandrum
 *         BillingPincode:
 *           type: string
 *           example: 625478
 *         BillingState:
 *           type: string
 *           example: Kerala
 *         BillingCountry:
 *           type: string
 *           example: India
 *         GSTNumber:
 *           type: string
 *           example: GST5484564
 *         Bank:
 *           type: string
 *         BankAccountNumber:
 *           type: string
 *         Branch:
 *           type: string
 *           example: Karamana
 *         IFSCCode:
 *           type: string
 *           example: SBI123456
 *         PlanName:
 *           type: string
 *           format: nullable
 *           example: Gold
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     400:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: If the request is falied or not
 *           example: false
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 example: 654789
 *               msg:
 *                 type: string
 *                 example: Value must be a string
 *               param:
 *                 type: string
 *                 example: Name
 *               location:
 *                 type: string
 *                 example: body
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     401:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: If the request is falied or not
 *           example: false
 *         errors:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: The user must authenticated to get the requested response
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     403:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: If the request is falied or not
 *           example: false
 *         errors:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: The user does not have access rights to the content
 */
