const router = require("express").Router();
const { body } = require("express-validator");
const {
  contentList,
  contentDetails,
  contentCreate,
  contentUpdate,
  contentDelete,
  contentSearch,
  contentMappingList,
  contentMediaDataCreate,
  contentMediaDatasList,
  contentTutorialLinkCreate,
  contentTutorialLinkList,
  contentTutorialLinkDelete,
  contentMediaDataUpdate,
} = require("../controllers/content.controller");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");
const { pageAuthorisation } = require("../middleware/authorization");

/**
 *  @swagger
 *    tags:
 *      name: Contents
 *      description: API to manage contents
 */

/**
 * @swagger
 *   /api/v1/contents:
 *     get:
 *       summary: Contents List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
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
 *                           $ref: '#/components/schemas/Content'
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
  contentList
);

/**
 * @swagger
 *   /api/v1/contents/mappings:
 *     get:
 *       summary: Contents Mapping List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
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
 *                         $ref: '#/components/schemas/ContentMappings'
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
  "/mappings",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  contentMappingList
);

/**
 * @swagger
 *   /api/v1/contents/{ContentID}/medias:
 *     get:
 *       summary: Content Media Data List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
 *       parameters:
 *         - in: path
 *           name: ContentID
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
 *                           $ref: '#/components/schemas/ContentMediaData'
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
router.get(
  "/:ContentID/medias",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  contentMediaDatasList
);

/**
 * @swagger
 *   /api/v1/contents/{ContentID}/tutorial-links:
 *     get:
 *       summary: Content Tutorial Links List
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
 *       parameters:
 *         - in: path
 *           name: ContentID
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
 *                           $ref: '#/components/schemas/ContentTutorialLink'
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
router.get(
  "/:ContentID/tutorial-links",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  contentTutorialLinkList
);

/**
 * @swagger
 *   /api/v1/contents/{ContentID}:
 *     get:
 *       summary: Content Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
 *       parameters:
 *         - in: path
 *           name: ContentID
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
 *                           $ref: '#/components/schemas/Content'
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
 *                         example: Content not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/:ContentID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  contentDetails
);

/**
 * @swagger
 *   /api/v1/contents/search:
 *     post:
 *       summary: Content Search
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ContentActivityName:
 *                     type: string
 *                     required: false
 *                     example: Therapy
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
 *                           $ref: '#/components/schemas/Content'
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
  [body("ContentActivityName").trim().escape()],
  validateRequestSchema,
  contentSearch
);

/**
 * @swagger
 *   /api/v1/contents:
 *     post:
 *       summary: Content Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ContentActivityName:
 *                     type: string
 *                     required: true
 *                     example: Therapy
 *                   ContentActivityDescription:
 *                     type: string
 *                     required: true
 *                   ContentCategory:
 *                     type: string
 *                     required: true
 *                     example: VR
 *                   TherapyIDs:
 *                     example: [1,2,3]
 *                     type: array
 *                   SkillIDs:
 *                     example: [1,2,3]
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
 *                         example: Content created successfully
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
    body("ContentActivityName")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ContentActivityDescription").optional({ nullable: true }).trim(),
    body("ContentCategory")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("FileUploadURL").optional({ nullable: true }).trim(),
    body("ThumbnailURL").optional({ nullable: true }).trim(),
    body("Duration").optional({ nullable: true }).trim(),
    body("ContentDescription").optional({ nullable: true }).trim(),
    body("TherapyIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("SkillIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
  ],
  validateRequestSchema,
  contentCreate
);

/**
 * @swagger
 *   /api/v1/contents/{ContentID}/medias:
 *     post:
 *       summary: Content Media Data Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
 *       parameters:
 *         - in: path
 *           name: ContentID
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
 *                   MediaDatas:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         StartPosition:
 *                           type: number
 *                           format: double
 *                           example: 55.0
 *                         EndPosition:
 *                           type: number
 *                           format: double
 *                           example: 5.0
 *                         Description:
 *                           type: string
 *                           required: true
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
 *                         example: Content media data added successfully
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
  "/:ContentID/medias",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("MediaDatas")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array"),
    body("MediaDatas.*.StartPosition")
      .isDecimal()
      .withMessage("Value must be a decimal number")
      .optional({ checkFalsy: true }),
    body("MediaDatas.*.EndPosition")
      .isDecimal()
      .withMessage("Value must be a decimal number")
      .optional({ checkFalsy: true }),
    body("MediaDatas.*.Description")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
  ],
  validateRequestSchema,
  contentMediaDataCreate
);

/**
 * @swagger
 *   /api/v1/contents/{ContentID}/tutorial-links:
 *     post:
 *       summary: Content Tutorial Link Creation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
 *       parameters:
 *         - in: path
 *           name: ContentID
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
 *                   TutorialLinks:
 *                     type: array
 *                     items:
 *                       type: string
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
 *                         example: Content tutorial links added successfully
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
  "/:ContentID/tutorial-links",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("TutorialLinks")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array"),
    body("TutorialLinks.*").isURL({ require_protocol: false }),
  ],
  validateRequestSchema,
  contentTutorialLinkCreate
);

/**
 * @swagger
 *   /api/v1/contents/{ContentID}:
 *     put:
 *       summary: Content Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
 *       parameters:
 *         - in: path
 *           name: ContentID
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
 *                   ContentActivityName:
 *                     type: string
 *                     required: true
 *                     example: Therapy
 *                   ContentActivityDescription:
 *                     type: string
 *                     required: true
 *                   ActivityInstructionTitle:
 *                     type: string
 *                   ActivityInstructionDescription:
 *                     type: string
 *                   ContentDescription:
 *                     type: string
 *                   ContentCategory:
 *                     type: string
 *                     required: true
 *                     example: VR
 *                   FileUploadURL:
 *                     type: string
 *                   AddTherapyIDs:
 *                     example: [1,2,3]
 *                     type: array
 *                   AddSkillIDs:
 *                     example: [1,2,3]
 *                     type: array
 *                   RemoveTherapyIDs:
 *                     example: [1,2,3]
 *                     type: array
 *                   RemoveSkillIDs:
 *                     example: [1,2,3]
 *                     type: array
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
 *                         example: Content updated successfully
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
 *                         example: Content not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/:ContentID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("ContentActivityName")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ContentActivityDescription")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("ContentCategory")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim(),
    body("FileUploadURL")
      .isURL({ require_protocol: false })
      .withMessage("Value must be a url")
      .optional({ checkFalsy: true }),
    body("ActivityInstructionTitle")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      .optional({ checkFalsy: true }),
    body("ActivityInstructionDescription")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      .optional({ checkFalsy: true }),
    body("ContentDescription")
      .not()
      .isEmpty()
      .withMessage("Field is required")
      .trim()
      .optional({ checkFalsy: true }),
    body("AddTherapyIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("AddSkillIDs")
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
    body("RemoveSkillIDs")
      .isArray()
      .not()
      .isEmpty()
      .withMessage("Value must be an array")
      .optional({ checkFalsy: true }),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  contentUpdate
);

/**
 * @swagger
 *   /api/v1/contents/medias/{MediaID}:
 *     put:
 *       summary: Content Media Data Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
 *       parameters:
 *         - in: path
 *           name: MediaID
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
 *                   StartPosition:
 *                     type: number
 *                     format: double
 *                     example: 10.25
 *                   EndPosition:
 *                     type: number
 *                     format: double
 *                     example: 20.0
 *                   Description:
 *                     type: string
 *                     required: true
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
 *                         example: Content media data updated successfully
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
 *                         example: Content media data not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/medias/:MediaID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  [
    body("StartPosition")
      .isDecimal()
      .withMessage("Value must be a decimal number")
      .optional({ checkFalsy: true }),
    body("EndPosition")
      .isDecimal()
      .withMessage("Value must be a decimal number")
      .optional({ checkFalsy: true }),
    body("Description").not().isEmpty().withMessage("Field is required").trim(),
    body("Status").isBoolean().withMessage("Value must be boolean").trim(),
  ],
  validateRequestSchema,
  contentMediaDataUpdate
);

/**
 * @swagger
 *   /api/v1/contents/{ContentID}:
 *     delete:
 *       summary: Content Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
 *       parameters:
 *         - in: path
 *           name: ContentID
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
 *                         example: Content deleted successfully
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
 *                         example: Content not found
 *         "500":
 *           description: Internal server error
 */
router.delete(
  "/:ContentID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  contentDelete
);

/**
 * @swagger
 *   /api/v1/contents/tutorial-links/{TutorialLinkID}:
 *     delete:
 *       summary: Content Tutorial Link Deletion
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Contents
 *       parameters:
 *         - in: path
 *           name: TutorialLinkID
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
 *                         example: Content tutorial link deleted successfully
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
 *                         example: Content tutorial link not found
 *         "500":
 *           description: Internal server error
 */
router.delete(
  "/tutorial-links/:TutorialLinkID",
  pageAuthorisation(["SuperAdmin", "ClientAdmin", "Center", "Therapist"]),
  contentTutorialLinkDelete
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       properties:
 *         ContentID:
 *           type: number
 *           example: 8
 *         ContentActivityName:
 *           type: string
 *           example: Therapy
 *         ContentActivityDescription:
 *           type: string
 *         ContentCategory:
 *           type: string
 *           example: VR
 *         ContentType:
 *           type: string
 *           example: Default
 *         FileUploadURL:
 *           type: string
 *           format: nullable
 *         ActivityInstructionTitle:
 *           type: string
 *           format: nullable
 *         ActivityInstructionDescription:
 *           type: string
 *           format: nullable
 *         ContentDescription:
 *           type: string
 *           format: nullable
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
 *     ContentMappings:
 *       type: object
 *       properties:
 *         ContentSkillMappings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               SkillID:
 *                 type: number
 *               ContentID:
 *                 type: number
 *               SkillName:
 *                 type: string
 *         ContentTherapyMappings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               TherapyID:
 *                 type: number
 *               ContentID:
 *                 type: number
 *               TherapyName:
 *                 type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ContentMediaData:
 *       type: object
 *       properties:
 *         MediaID:
 *           type: number
 *           example: 8
 *         ContentID:
 *           type: number
 *           example: 8
 *         StartPosition:
 *           type: number
 *           format: double
 *           example: 10.25
 *         EndPosition:
 *           type: number
 *           format: double
 *           example: 20.0
 *         Description:
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

/**
 * @swagger
 * components:
 *   schemas:
 *     ContentTutorialLink:
 *       type: object
 *       properties:
 *         TutorialLinkID:
 *           type: number
 *           example: 8
 *         ContentID:
 *           type: number
 *           example: 8
 *         TutorialLink:
 *           type: string
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
