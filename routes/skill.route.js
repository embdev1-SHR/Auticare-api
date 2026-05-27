const router = require("express").Router();
const { body } = require("express-validator");
const {
  skillList,
  skillDetails,
  skillCreate,
  skillUpdate,
  skillDelete,
  skillSearch,
  skillMappingList,
  skillListByScaleID,
} = require("../controllers/skill.controller");
const { validateRequestSchema } = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Skills
 *      description: API to manage skills
 */

/**
 * @swagger
 *   /api/v1/skills:
 *     get:
 *       summary: Skills List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Skills
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
 *                           $ref: '#/components/schemas/Skill'
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
router.get("/", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), skillList);

/**
 * @swagger
 *   /api/v1/skills/scales/{ScaleID}:
 *     get:
 *       summary: Skills List By ScaleID
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Skills
 *       parameters:
 *         - in: path
 *           name: ScaleID
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
 *                       SkillID:
 *                         type: number
 *                         example: 8
 *                       SkillName:
 *                         type: string
 *                         example: Memorize
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
  "/scales/:ScaleID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  skillListByScaleID
);

/**
 * @swagger
 *   /api/v1/skills/mappings:
 *     get:
 *       summary: Skills Mapping List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Skills
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
 *                         $ref: '#/components/schemas/SkillMappings'
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
router.get("/mappings", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), skillMappingList);

/**
 * @swagger
 *   /api/v1/skills/{SkillID}:
 *     get:
 *       summary: Skill Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Skills
 *       parameters:
 *         - in: path
 *           name: SkillID
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
 *                           $ref: '#/components/schemas/Skill'
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
 *                         example: Skill not found
 *         "500":
 *           description: Internal server error
 */
router.get("/:SkillID", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), skillDetails);

/**
 * @swagger
 *   /api/v1/skills/search:
 *     post:
 *       summary: Skill Search
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Skills
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   SkillName:
 *                     type: string
 *                     required: false
 *                     example: Communication
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
 *                           $ref: '#/components/schemas/Skill'
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
  [body("SkillName").trim().escape()],
  validateRequestSchema,
  skillSearch
);

/**
 * @swagger
 *   /api/v1/skills:
 *     post:
 *       summary: Skill Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Skills
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   SkillName:
 *                     type: string
 *                     required: true
 *                     example: Communication
 *                   ReferenceVideoURL:
 *                     type: string
 *                     required: false
 *                     example: https://youtu.be/v-NQkdoiCQ8
 *                   SubSkills:
 *                     example: ["Speech", "Walk", "Read"]
 *                     required: true
 *                     type: array
 *                   ScaleIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   DepartmentIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   GoalIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   ActivityIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   TherapyIDs:
 *                     example: [1, 2, 3]
 *                     type: array
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
 *                         example: Skill created successfully
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
    body("SkillName").not().isEmpty().withMessage("Field is required").trim(),
    body("ReferenceVideoURL").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
    body("SubSkills").isArray().not().isEmpty().withMessage("Value must be an array").optional({ checkFalsy: true }),
    body("ScaleIDs").isArray().not().isEmpty().withMessage("Value must be an array").optional({ checkFalsy: true }),
    body("DepartmentIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("GoalIDs").isArray().not().isEmpty().withMessage("Value must be an array").optional({ checkFalsy: true }),
    body("ActivityIDs").isArray().not().isEmpty().withMessage("Value must be an array").optional({ checkFalsy: true }),
    body("TherapyIDs").isArray().not().isEmpty().withMessage("Value must be an array").optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  skillCreate
);

/**
 * @swagger
 *   /api/v1/skills/{SkillID}:
 *     put:
 *       summary: Skill Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Skills
 *       parameters:
 *         - in: path
 *           name: SkillID
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
 *                   SkillName:
 *                     type: string
 *                     required: true
 *                     example: Communication
 *                   ReferenceVideoURL:
 *                     type: string
 *                     required: false
 *                     example: https://youtu.be/v-NQkdoiCQ8
 *                   AddSubSkills:
 *                     example: ["Speech", "Walk", "Read"]
 *                     type: array
 *                   AddScaleIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   AddDepartmentIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   AddGoalIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   AddActivityIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   AddTherapyIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   RemoveSubSkills:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   RemoveScaleIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   RemoveDepartmentIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   RemoveGoalIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   RemoveActivityIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   RemoveTherapyIDs:
 *                     example: [1, 2, 3]
 *                     type: array
 *                   Status:
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
 *                         example: Skill updated successfully
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
 *                         example: Skill not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:SkillID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("SkillName").not().isEmpty().withMessage("Field is required").trim(),
    body("ReferenceVideoURL").isURL().withMessage("Value must be a url").optional({ checkFalsy: true }),
    body("AddSubSkills").isArray().not().isEmpty().withMessage("Value must be an array").optional({ checkFalsy: true }),
    body("AddScaleIDs").isArray().not().isEmpty().withMessage("Value must be an array").optional({ checkFalsy: true }),
    body("AddDepartmentIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("AddGoalIDs").isArray().not().isEmpty().withMessage("Value must be an array").optional({ checkFalsy: true }),
    body("AddActivityIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("AddTherapyIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("RemoveSubSkills")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("RemoveScaleIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("RemoveDepartmentIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("RemoveGoalIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("RemoveActivityIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("RemoveTherapyIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  skillUpdate
);

/**
 * @swagger
 *   /api/v1/skills/{SkillID}:
 *     delete:
 *       summary: Skill Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Skills
 *       parameters:
 *         - in: path
 *           name: SkillID
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
 *                         example: Skill deleted successfully
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
 *                         example: Skill not found
 *         "500":
 *           description: Internal server error
 */
router.delete("/:SkillID", pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]), skillDelete);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Skill:
 *       type: object
 *       properties:
 *         SkillID:
 *           type: number
 *           example: 8
 *         SkillName:
 *           type: string
 *           example: Memorize
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

/**
 * @swagger
 * components:
 *   schemas:
 *     SkillMappings:
 *       type: object
 *       properties:
 *         SubSkills:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               SkillID:
 *                 type: number
 *               SubSkillID:
 *                 type: number
 *               SubSkillName:
 *                 type: string
 *         SkillContentMappings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               SkillID:
 *                 type: number
 *               ContentID:
 *                 type: number
 *               ContentActivityName:
 *                 type: string
 *         SkillDepartmentMappings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               SkillID:
 *                 type: number
 *               DepartmentID:
 *                 type: number
 *               DepartmentName:
 *                 type: string
 *         SkillGoalMappings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               SkillID:
 *                 type: number
 *               GoalID:
 *                 type: number
 *               GoalName:
 *                 type: string
 *         SkillScaleMappings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               SkillID:
 *                 type: number
 *               ScaleID:
 *                 type: number
 *               ScaleName:
 *                 type: string
 *         SkillTherapyMappings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               SkillID:
 *                 type: number
 *               TherapyID:
 *                 type: number
 *               TherapyName:
 *                 type: string
 */
