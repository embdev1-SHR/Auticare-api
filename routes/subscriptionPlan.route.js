const router = require("express").Router();
const { body } = require("express-validator");
const {
  subscriptionPlanList,
  subscriptionPlanDetails,
  subscriptionPlanCreate,
  subscriptionPlanUpdate,
  subscriptionPlanDelete,
} = require("../controllers/subscriptionPlan.controller");

const { pageAuthorisation } = require("../middleware/authorization");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");

/**
 *  @swagger
 *    tags:
 *      name: Subscription Plans
 *      description: API to manage Subscription Plans
 */

/**
 * @swagger
 *   /api/v1/subscriptionPlans:
 *     get:
 *       summary: Subscription Plan List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Subscription Plans
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
 *                           $ref: '#/components/schemas/SubscriptionPlan'
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
  subscriptionPlanList
);

/**
 * @swagger
 *   /api/v1/subscriptionPlans/{SubscriptionPlanId}:
 *     get:
 *       summary: Subscription Plan Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Subscription Plans
 *       parameters:
 *         - in: path
 *           name: SubscriptionPlanId
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
 *                           $ref: '#/components/schemas/SubscriptionPlan'
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
 *                         example: Subscription Plan not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:SubscriptionPlanId",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  subscriptionPlanDetails
);

/**
 * @swagger
 *   /api/v1/subscriptionPlans:
 *     post:
 *       summary: Subscription Plan Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Subscription Plans
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   PlanName:
 *                     type: string
 *                     required: true
 *                     example: Gold
 *                   Contents:
 *                     type: string
 *                     required: true
 *                   NumberOfPlanActiveDays:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   Frequency:
 *                     type: string
 *                     required: true
 *                     example: Monthly
 *                   NumberofTherapists:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   NumberofPatients:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   NumberofCustomScales:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   NumberofCustomSkills:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   NumberofCustomAssessment:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   NumberofCustomContents:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   Price:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   OnetimeFee:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   PlanType:
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
 *                         example: Subscription Plan created successfully
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
    body("PlanName").not().isEmpty().withMessage("Field is required").trim(),
    body("Contents").not().isEmpty().withMessage("Field is required").trim(),
    body("NumberOfPlanActiveDays")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("Frequency").not().isEmpty().withMessage("Field is required").trim(),
    body("NumberofTherapists")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("NumberofPatients")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("NumberofCustomScales")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("NumberofCustomSkills")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("NumberofCustomAssessment")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("NumberofCustomContents")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("Price").isNumeric().withMessage("Value must be a number").trim(),
    body("Price").isNumeric().withMessage("Value must be a number").trim(),
    body("OnetimeFee").isNumeric().withMessage("Value must be a number").trim(),
    body("PlanType").not().isEmpty().withMessage("Field is required").trim(),
  ],
  validateRequestSchema,
  subscriptionPlanCreate
);

/**
 * @swagger
 *   /api/v1/subscriptionPlans/{SubscriptionPlanId}:
 *     put:
 *       summary: Subscription Plans Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Subscription Plans
 *       parameters:
 *         - in: path
 *           name: SubscriptionPlanId
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
 *                   PlanName:
 *                     type: string
 *                     required: true
 *                     example: Gold
 *                   Contents:
 *                     type: string
 *                   NumberOfPlanActiveDays:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   Frequency:
 *                     type: string
 *                     required: true
 *                     example: Monthly
 *                   NumberofTherapists:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   NumberofPatients:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   NumberofCustomScales:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   NumberofCustomSkills:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   NumberofCustomAssessment:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   NumberofCustomContents:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   Price:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   OnetimeFee:
 *                     type: number
 *                     required: true
 *                     example: 1
 *                   PlanType:
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
 *                         example: Subscription Plan updated successfully
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
 *                         example: Subscription Plan not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:SubscriptionPlanId",
  pageAuthorisation(["SuperAdmin"]),
  [
    body("PlanName").not().isEmpty().withMessage("Field is required").trim(),
    body("Contents").not().isEmpty().withMessage("Field is required").trim(),
    body("NumberOfPlanActiveDays")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("Frequency").not().isEmpty().withMessage("Field is required").trim(),
    body("NumberofTherapists")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("NumberofPatients")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("NumberofCustomScales")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("NumberofCustomSkills")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("NumberofCustomAssessment")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("NumberofCustomContents")
      .isNumeric()
      .withMessage("Value must be a number")
      .trim(),
    body("Price").isNumeric().withMessage("Value must be a number").trim(),
    body("Price").isNumeric().withMessage("Value must be a number").trim(),
    body("OnetimeFee").isNumeric().withMessage("Value must be a number").trim(),
    body("PlanType").not().isEmpty().withMessage("Field is required").trim(),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  subscriptionPlanUpdate
);

router.delete(
  "/:SubscriptionPlanId",
  pageAuthorisation(["SuperAdmin"]),
  subscriptionPlanDelete
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     SubscriptionPlan:
 *       type: object
 *       properties:
 *         SubscriptionPlanId:
 *           type: number
 *           example: 8
 *         PlanName:
 *           type: string
 *           example: Gold
 *         Contents:
 *           type: string
 *         NumberOfPlanActiveDays:
 *           type: number
 *           example: 1
 *         Frequency:
 *           type: string
 *           example: Monthly
 *         NumberofTherapists:
 *           type: number
 *           example: 1
 *         NumberofPatients:
 *           type: number
 *           example: 1
 *         NumberofCustomScales:
 *           type: number
 *           example: 1
 *         NumberofCustomSkills:
 *           type: number
 *           example: 1
 *         NumberofCustomAssessment:
 *           type: number
 *           example: 1
 *         NumberofCustomContents:
 *           type: number
 *           example: 1
 *         Price:
 *           type: number
 *           example: 1
 *         OnetimeFee:
 *           type: number
 *           example: 1
 *         PlanType:
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
 */
