const router = require("express").Router();
const { body } = require("express-validator");
const { productList, productDetails, productCreate, productUpdate, productDelete, productBulkCreate } = require("../controllers/products.controller");

const { pageAuthorisation } = require("../middleware/authorization");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");

/**
 *  @swagger
 *    tags:
 *      name: Products
 *      description: API to manage Products
 */

/**
 * @swagger
 *   /api/v1/products:
 *     get:
 *       summary: Product List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Products
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
 *                           $ref: '#/components/schemas/Product'
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
router.get("/", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), productList);

/**
 * @swagger
 *   /api/v1/products/{ProductID}:
 *     get:
 *       summary: Product Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Products
 *       parameters:
 *         - in: path
 *           name: ProductID
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
 *                           $ref: '#/components/schemas/Product'
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
 *                         example: Product not found
 *         "500":
 *           description: Internal server error
 */
router.get("/:ProductID", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), productDetails);

/**
 * @swagger
 *   /api/v1/products:
 *     post:
 *       summary: Product Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Products
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ProductName:
 *                     type: string
 *                     required: true
 *                     example: Full sleeve T-shirt
 *                   Category:
 *                     type: string
 *                     required: true
 *                     example: T-Shirt
 *                   Price:
 *                     type: number
 *                     required: true
 *                     example: 300
 *                   DiscountedPrice:
 *                     type: number
 *                     required: true
 *                     example: 300
 *                   Highlights:
 *                     type: string
 *                     required: true
 *                   ProductDescription:
 *                     type: string
 *                     required: true
 *                   ImageURL:
 *                     type: string
 *                     required: true
 *                   ImageURL1:
 *                     type: string
 *                     required: true
 *                   ImageURL2:
 *                     type: string
 *                     required: true
 *                   ImageURL3:
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
 *                         example: Product created successfully
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
  "/bulk",
  pageAuthorisation(["SuperAdmin"]),
  productBulkCreate
);

router.post(
  "/",
  pageAuthorisation(["SuperAdmin"]),
  [
    body("ProductName").not().isEmpty().withMessage("Field is required").trim(),
    body("Category").not().isEmpty().withMessage("Field is required").trim(),
    body("Price").isNumeric().withMessage("Value must be a number").trim(),
    body("DiscountedPrice").isNumeric().withMessage("Value must be a number").trim(),
    body("Highlights").not().isEmpty().withMessage("Field is required").trim(),
    body("ProductDescription").not().isEmpty().withMessage("Field is required").trim(),
    body("ImageURL").isURL().withMessage("Value must be a url"),
    body("ImageURL1").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
    body("ImageURL2").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
    body("ImageURL3").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
    body("BuyURL").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  productCreate
);

/**
 * @swagger
 *   /api/v1/products/{ProductID}:
 *     put:
 *       summary: Products Updation & Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Products
 *       parameters:
 *         - in: path
 *           name: ProductID
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
 *                   ProductName:
 *                     type: string
 *                     required: true
 *                     example: Full sleeve T-shirt
 *                   Category:
 *                     type: string
 *                     required: true
 *                     example: T-Shirt
 *                   Price:
 *                     type: number
 *                     required: true
 *                     example: 300
 *                   DiscountedPrice:
 *                     type: number
 *                     required: true
 *                     example: 300
 *                   Highlights:
 *                     type: string
 *                     required: true
 *                   ProductDescription:
 *                     type: string
 *                     required: true
 *                   ImageURL:
 *                     type: string
 *                     required: true
 *                   ImageURL1:
 *                     type: string
 *                     required: true
 *                   ImageURL2:
 *                     type: string
 *                     required: true
 *                   ImageURL3:
 *                     type: string
 *                     required: true
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
 *                         example: Product updated successfully
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
 *                         example: Product not found
 *         "500":
 *           description: Internal server error
 */
router.delete("/:ProductID", pageAuthorisation(["SuperAdmin"]), productDelete);

router.put(
  "/:ProductID",
  pageAuthorisation(["SuperAdmin"]),
  [
    body("ProductName").not().isEmpty().withMessage("Field is required").trim(),
    body("Category").not().isEmpty().withMessage("Field is required").trim(),
    body("Price").isNumeric().withMessage("Value must be a number").trim(),
    body("DiscountedPrice").isNumeric().withMessage("Value must be a number").trim(),
    body("Highlights").not().isEmpty().withMessage("Field is required").trim(),
    body("ProductDescription").not().isEmpty().withMessage("Field is required").trim(),
    body("ImageURL").not().isEmpty().withMessage("Field is required").trim(),
    body("ImageURL1").optional({ checkFalsy: true }).trim(),
    body("ImageURL2").optional({ checkFalsy: true }).trim(),
    body("ImageURL3").optional({ checkFalsy: true }).trim(),
    body("BuyURL").optional({ checkFalsy: true }).trim(),
    body("Status").isIn([0, 1, "0", "1", true, false, "true", "false"]).withMessage("Value must be 0 or 1"),
  ],
  validateRequestSchema,
  productUpdate
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         ProductID:
 *           type: number
 *           example: 8
 *         ProductName:
 *           type: string
 *           required: true
 *           example: Full sleeve T-shirt
 *         Category:
 *           type: string
 *           required: true
 *           example: T-Shirt
 *         Price:
 *           type: number
 *           required: true
 *           example: 300
 *         DiscountedPrice:
 *           type: number
 *           required: true
 *           example: 300
 *         Highlights:
 *           type: string
 *           required: true
 *         ProductDescription:
 *           type: string
 *           required: true
 *         ImageURL:
 *           type: string
 *           required: true
 *         ImageURL1:
 *           type: string
 *           required: true
 *         ImageURL2:
 *           type: string
 *           required: true
 *         ImageURL3:
 *           type: string
 *           required: true
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
