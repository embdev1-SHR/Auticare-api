const router = require("express").Router();
const { body } = require("express-validator");
const {
  departmentList,
  departmentDetails,
  departmentCreate,
  departmentUpdate,
  departmentDelete,
  departmentSearch,
} = require("../controllers/department.controller");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Departments
 *      description: API to manage departments
 */

/**
 * @swagger
 *   /api/v1/departments:
 *     get:
 *       summary: Departments List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Departments
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
 *                           $ref: '#/components/schemas/Department'
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
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  departmentList
);

/**
 * @swagger
 *   /api/v1/departments/{DepartmentID}:
 *     get:
 *       summary: Department Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Departments
 *       parameters:
 *         - in: path
 *           name: DepartmentID
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
 *                           $ref: '#/components/schemas/Department'
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
 *                         example: Department not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:DepartmentID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  departmentDetails
);

/**
 * @swagger
 *   /api/v1/departments/search:
 *     post:
 *       summary: Department Search
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Departments
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
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
 *                           $ref: '#/components/schemas/Department'
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
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [body("DepartmentName").trim().escape()],
  validateRequestSchema,
  departmentSearch
);

/**
 * @swagger
 *   /api/v1/departments:
 *     post:
 *       summary: Department Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Departments
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   DepartmentName:
 *                     type: string
 *                     required: true
 *                     example: Audiology
 *                   DepartmentHeadName:
 *                     type: string
 *                     required: true
 *                     example: Mr. John Doe
 *                   DepartmentHeadDesignation:
 *                     type: string
 *                     required: true
 *                     example: Doctor
 *                   DepartmentHeadQualification:
 *                     type: string
 *                     required: true
 *                     example: MBBS
 *                   DepartmentHeadEmailId:
 *                     type: string
 *                     required: true
 *                     example: contact@auticareweb.com
 *                   DepartmentHeadPhone:
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
 *                         example: Department created successfully
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
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("DepartmentName")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("DepartmentHeadName")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("DepartmentHeadDesignation")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("DepartmentHeadQualification")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("DepartmentHeadEmailId").isEmail().normalizeEmail(),
    body("DepartmentHeadPhone")
      .not()
      .isEmpty()
      .withMessage("Field is required"),
  ],
  validateRequestSchema,
  departmentCreate
);

/**
 * @swagger
 *   /api/v1/departments/{DepartmentID}:
 *     put:
 *       summary: Department Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Departments
 *       parameters:
 *         - in: path
 *           name: DepartmentID
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
 *                   DepartmentName:
 *                     type: string
 *                     required: true
 *                     example: Audiology
 *                   DepartmentHeadName:
 *                     type: string
 *                     required: true
 *                     example: Mr. John Doe
 *                   DepartmentHeadDesignation:
 *                     type: string
 *                     required: true
 *                     example: Doctor
 *                   DepartmentHeadQualification:
 *                     type: string
 *                     required: true
 *                     example: MBBS
 *                   DepartmentHeadEmailId:
 *                     type: string
 *                     required: true
 *                     example: contact@auticareweb.com
 *                   DepartmentHeadPhone:
 *                     type: string
 *                     required: true
 *                     example: 9876543211
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
 *                         example: Department updated successfully
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
 *                         example: Department not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:DepartmentID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("DepartmentHeadName")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("DepartmentHeadDesignation")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("DepartmentHeadQualification")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("DepartmentHeadEmailId").isEmail().normalizeEmail(),
    body("DepartmentHeadPhone")
      .not()
      .isEmpty()
      .withMessage("Field is required"),
    body("Status").not().isEmpty().withMessage("Field is required").trim(),
  ],
  validateRequestSchema,
  departmentUpdate
);

/**
 * @swagger
 *   /api/v1/departments/{DepartmentID}:
 *     delete:
 *       summary: Department Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Departments
 *       parameters:
 *         - in: path
 *           name: DepartmentID
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
 *                         example: Department deleted successfully
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
 *                         example: Department not found
 *         "500":
 *           description: Internal server error
 */
router.delete(
  "/:DepartmentID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  departmentDelete
);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       properties:
 *         DepartmentID:
 *           type: number
 *           example: 3
 *         DepartmentName:
 *           type: string
 *           example: Audiology
 *         DepartmentHeadName:
 *           type: string
 *           example: Williams
 *         DepartmentHeadDesignation:
 *           type: string
 *           example: Doctor
 *         DepartmentHeadQualification:
 *           type: string
 *           example: MBBS
 *         DepartmentHeadEmailID:
 *           type: string
 *           example: contact@auticareweb.com
 *         DepartmentHeadPhone:
 *           type: string
 *           example: 9876543211
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
