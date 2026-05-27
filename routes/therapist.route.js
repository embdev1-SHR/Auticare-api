const router = require("express").Router();
const { body } = require("express-validator");
const {
  therapistList,
  therapistDetails,
  therapistCreate,
  therapistUpdate,
  therapistDelete,
  therapistSearch,
} = require("../controllers/therapist.controller");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Therapists
 *      description: API to manage therapists
 */

/**
 * @swagger
 *   /api/v1/therapists:
 *     get:
 *       summary: Therapists List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapists
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
 *                             - $ref: '#/components/schemas/Therapist'
 *                             - $ref: '#/components/schemas/TherapistForPublic'
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
router.get("/", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Patient"]), therapistList);

/**
 * @swagger
 *   /api/v1/therapists/{TherapistID}:
 *     get:
 *       summary: Therapist Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapists
 *       parameters:
 *         - in: path
 *           name: TherapistID
 *           description: Not required if the user is therapist, instead pass any integer
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
 *                           $ref: '#/components/schemas/Therapist'
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
 *                         example: Therapist not found
 *         "500":
 *           description: Internal server error
 */
router.get("/:TherapistID", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), therapistDetails);

/**
 * @swagger
 *   /api/v1/therapists/search:
 *     post:
 *       summary: Therapist Search
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapists
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                     required: false
 *                     example: Josef Kennedy
 *                   EmailId:
 *                     type: string
 *                     required: false
 *                     example: contact@example.com
 *                   Phone:
 *                     type: string
 *                     required: false
 *                     example: 9876543210
 *                   FacilitatorType:
 *                     type: string
 *                     required: false
 *                     example: Doctor
 *                   DepartmentName:
 *                     type: string
 *                     required: false
 *                     example: Audiology
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
 *                             - $ref: '#/components/schemas/Therapist'
 *                             - $ref: '#/components/schemas/TherapistForPublic'
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
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Patient"]),
  [
    body("Name").trim().escape(),
    body("EmailId").trim().escape(),
    body("Phone").trim().escape(),
    body("FacilitatorType").trim().escape(),
    body("DepartmentName").trim().escape(),
  ],
  validateRequestSchema,
  therapistSearch
);

/**
 * @swagger
 *   /api/v1/therapists:
 *     post:
 *       summary: Therapist Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapists
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
 *                     example: contact@therapist.in
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
 *                     required: false
 *                     type: string
 *                     example: Kennedy@Therapist#1
 *                   CenterID:
 *                     type: integer
 *                     required: false
 *                     description: CenterID is only required when the user is SuperAdmin, for other users, pass zero or any other value.
 *                     example: 2
 *                   DepartmentID:
 *                     type: integer
 *                     required: true
 *                     example: 2
 *                   FacilitatorType:
 *                     type: string
 *                     required: true
 *                   Salutation:
 *                     type: string
 *                     required: true
 *                     example: Mr
 *                   Name:
 *                     type: string
 *                     required: true
 *                     example: John Doe
 *                   Designation:
 *                     type: string
 *                     required: true
 *                     example: Doctor
 *                   Language:
 *                     type: string
 *                     required: true
 *                     example: English
 *                   Photo:
 *                     type: string
 *                     required: true
 *                   Qualification:
 *                     type: string
 *                     required: true
 *                     example: MBBS
 *                   Experience:
 *                     type: integer
 *                     required: true
 *                     example: 2
 *                   Profile:
 *                     type: string
 *                     required: true
 *                   DocumentsURL:
 *                     type: string
 *                     required: true
 *                   TherapistType:
 *                     type: string
 *                     required: true
 *                     example: Special Educator
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
 *                         example: Therapist created successfully
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
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center"]),
  [
    body("EmailId").isEmail().normalizeEmail(),
    body("UserName").not().isEmpty().withMessage("Field is required").trim(),
    body("Phone").trim(),
    body("AddressLine1").not().isEmpty().withMessage("Field is required").trim(),
    body("AddressLine2").trim().optional({ checkFalsy: true }),
    body("City").not().isEmpty().withMessage("Field is required").trim(),
    body("District").not().isEmpty().withMessage("Field is required").trim(),
    body("Pincode").not().isEmpty().withMessage("Field is required").isNumeric().withMessage("Value must be a digit"),
    body("State").not().isEmpty().withMessage("Field is required").trim(),
    body("Country").not().isEmpty().withMessage("Field is required").trim(),
    body("Password").not().isEmpty().withMessage("Field is required").trim().optional({ checkFalsy: true }),
    body("CenterID").isNumeric().withMessage("Value must be a number"),
    body("DepartmentID").isNumeric().withMessage("Value must be a number"),
    body("FacilitatorType").not().isEmpty().withMessage("Field is required").trim(),
    body("Salutation").not().isEmpty().withMessage("Field is required").trim(),
    body("Name").not().isEmpty().withMessage("Field is required").trim(),
    body("Designation").not().isEmpty().withMessage("Field is required").trim(),
    body("Language").not().isEmpty().withMessage("Field is required").trim(),
    body("Photo").not().isEmpty().withMessage("Field is required").trim(),
    body("Qualification").not().isEmpty().withMessage("Field is required").trim(),
    body("Experience").isNumeric().withMessage("Value must be a number"),
    body("Profile").not().isEmpty().withMessage("Field is required").trim(),
    body("DocumentsURL").isURL().withMessage("Value must be a url"),
    body("TherapistType").not().isEmpty().withMessage("Field is required").trim(),
  ],
  validateRequestSchema,
  therapistCreate
);

/**
 * @swagger
 *   /api/v1/therapists/{TherapistID}:
 *     put:
 *       summary: Therapist Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapists
 *       parameters:
 *         - in: path
 *           name: TherapistID
 *           description: Not required if the user is therapist, instead pass any integer
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
 *                     required: false
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
 *                   Salutation:
 *                     type: string
 *                     required: true
 *                     example: Mr
 *                   Name:
 *                     type: string
 *                     required: true
 *                     example: John Doe
 *                   Designation:
 *                     type: string
 *                     required: true
 *                     example: Doctor
 *                   Language:
 *                     type: string
 *                     required: true
 *                     example: English
 *                   Photo:
 *                     type: string
 *                     required: true
 *                   Qualification:
 *                     type: string
 *                     required: true
 *                     example: MBBS
 *                   Experience:
 *                     type: integer
 *                     required: true
 *                     example: 2
 *                   Profile:
 *                     type: string
 *                     required: true
 *                   DocumentsURL:
 *                     type: string
 *                     required: true
 *                   DepartmentID:
 *                     type: integer
 *                     required: true
 *                     example: 2
 *                   TherapistType:
 *                     type: string
 *                     required: true
 *                     example: Special Educator
 *                   FacilitatorType:
 *                     type: string
 *                     required: true
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
 *                         example: Therapist updated successfully
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
 *                         example: Therapist not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:TherapistID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("Phone").trim(),
    body("AddressLine1").not().isEmpty().withMessage("Field is required").trim(),
    body("AddressLine2").trim(),
    body("City").not().isEmpty().withMessage("Field is required").trim(),
    body("District").not().isEmpty().withMessage("Field is required").trim(),
    body("Pincode").not().isEmpty().withMessage("Field is required").isNumeric().withMessage("Value must be a digit"),
    body("State").not().isEmpty().withMessage("Field is required").trim(),
    body("Country").not().isEmpty().withMessage("Field is required").trim(),
    body("Status").not().isEmpty().withMessage("Field is required").trim(),
    body("Salutation").not().isEmpty().withMessage("Field is required").trim(),
    body("Name").not().isEmpty().withMessage("Field is required").trim(),
    body("Designation").not().isEmpty().withMessage("Field is required").trim(),
    body("Language").not().isEmpty().withMessage("Field is required").trim(),
    body("Photo").not().isEmpty().withMessage("Field is required").trim(),
    body("Qualification").not().isEmpty().withMessage("Field is required").trim(),
    body("Experience").isNumeric().withMessage("Value must be a number"),
    body("Profile").not().isEmpty().withMessage("Field is required").trim(),
    body("DocumentsURL").isURL().withMessage("Value must be a url"),
    body("DepartmentID").isNumeric().withMessage("Value must be a number"),
    body("TherapistType").not().isEmpty().withMessage("Field is required").trim(),
    body("FacilitatorType").not().isEmpty().withMessage("Field is required").trim(),
  ],
  validateRequestSchema,
  therapistUpdate
);

/**
 * @swagger
 *   /api/v1/therapists/{TherapistID}:
 *     delete:
 *       summary: Therapist Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Therapists
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
 *                       message:
 *                         type: string
 *                         example: Therapist deleted successfully
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
 *                         example: Therapist not found
 *         "500":
 *           description: Internal server error
 */
router.delete("/:TherapistID", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center"]), therapistDelete);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Therapist:
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
 *         TherapistID:
 *           type: number
 *           example: 3
 *         CenterID:
 *           type: number
 *           example: 3
 *         DepartmentID:
 *           type: number
 *           example: 3
 *         FacilitatorType:
 *           type: string
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
 *         Qualification:
 *           type: string
 *           example: MBBS
 *         Experience:
 *           type: integer
 *           example: 2
 *         Profile:
 *           type: string
 *         DocumentsURL:
 *           type: string
 *         TherapistType:
 *           type: string
 *           example: Special Educator
 *         CenterName:
 *           type: string
 *         DepartmentName:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TherapistForPublic:
 *       type: object
 *       properties:
 *         UserID:
 *           type: number
 *           example: 8
 *         TherapistID:
 *           type: number
 *           example: 3
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
 *         DepartmentName:
 *           type: string
 */
