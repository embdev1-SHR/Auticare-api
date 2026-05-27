const router = require("express").Router();
const { body } = require("express-validator");
const {
  login,
  registerUser,
  logout,
  logoutAll,
  userDetails,
  tokenUpdate,
} = require("../../controllers/app/auth.controller");
const {
  forgotPassword,
  confirmOtp,
  resetPassword,
} = require("../../controllers/auth.controller");
const {
  verifyAccessToken,
  verifyConfirmOtpToken,
} = require("../../middleware/authentication");
const { pageAuthorisation } = require("../../middleware/authorization");
const {
  validateRequestSchema,
} = require("../../middleware/validateRequestSchema");

/**
 *  @swagger
 *    tags:
 *      name: App Authentication
 *      description: API to manage mobile app user authentication
 */

/**
 * @swagger
 *   /api/v1/app/auth/register:
 *     post:
 *       summary: User (Patient) Registration
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - App Authentication
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   PatientName:
 *                     type: string
 *                     required: true
 *                     example: John William
 *                   ParentName:
 *                     type: string
 *                     required: true
 *                     example: William James
 *                   ParentEmailID:
 *                     type: string
 *                     required: true
 *                     example: contact@auticareweb.com
 *                   ParentPhone:
 *                     type: string
 *                     required: true
 *                     example: 9876543211
 *                   Password:
 *                     type: string
 *                     required: true
 *                     minLength: 6
 *                     example: Kennedy@Patient#1
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
 *                         example: User registered successfully
 *                       data:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/PatientUserData'
 *                       accessToken:
 *                         type: string
 *                         example: IkoJODL?ofrH0VEpRZBWssJfAdASdsgFNDxYrcd9fGOkHNH7P!4MzDPAtaph4jRUdXOF5PYModdDhstI7ixpfft?wtU735D38mvJ1EJtopnL!oJO3n?ew10NFOIhUZj0UJqIER95X=cS7QBoKesIJWjIwlp3FmD=6RA=cG1JsMEntz6QeLQt4o?CbdH28TQ5eFKoB!ZA5YFAFuJKtC=fY4ggza751oDWJEFBE?fCoJcu/YX=0q0AO5XZsZ5hbsLK
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
  "/register",
  [
    body("PatientName").not().isEmpty().withMessage("Field is required").trim(),
    body("ParentName").not().isEmpty().withMessage("Field is required").trim(),
    body("ParentEmailID").isEmail().normalizeEmail(),
    body("ParentPhone").not().isEmpty().withMessage("Field is required"),
    body("Password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ],
  validateRequestSchema,
  registerUser
);

/**
 * @swagger
 *   /api/v1/app/auth/token-update:
 *     put:
 *       summary: User Token Updation
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - App Authentication
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Token:
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
 *                         example: Token updated successfully
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
 *                         example: User not found
 *         "500":
 *           description: Internal server error
 */
router.put(
  "/token-update",
  verifyAccessToken,
  pageAuthorisation(["Therapist", "Patient"]),
  [body("Token").not().isEmpty().withMessage("Field is required").trim()],
  validateRequestSchema,
  tokenUpdate
);

/**
 * @swagger
 *   /api/v1/app/auth/login:
 *     post:
 *       summary: Mobile User Login
 *       tags:
 *         - App Authentication
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   EmailId:
 *                     type: string
 *                     description: User email id
 *                     example: dev@example.in
 *                     required: true
 *                   Password:
 *                     type: string
 *                     description: User password
 *                     required: true
 *                     example: Kennedy@Patient#1
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
 *                     description: User object and token
 *                     properties:
 *                       data:
 *                         type: array
 *                         description: Array contains Therapist or Patient data based on login user.
 *                         items:
 *                           oneOf:
 *                             - $ref: '#/components/schemas/TherapistUserData'
 *                             - $ref: '#/components/schemas/PatientUserData'
 *                       accessToken:
 *                         type: string
 *                         example: IkoJODL?ofrH0VEpRZBWsshGgzgR2JDhNDxYrcd9fGOkHNH7P!4MzDPAtaph4jRUdXOF5PYModdDhstI7ixpfft?wtU735D38mvJ1EJtopnL!oJO3n?ew10NFOIhUZj0UJqIER95X=cS7QBoKesIJWjIwlp3FmD=6RA=cG1JsMEntz6QeLQt4o?CbdH28TQ5eFKoB!ZA5YFAFuJKtC=fY4ggza751oDWJEFBE?fCoJcu/YX=0q0AO5XZsZ5hbsLK
 *         "400":
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/400'
 *         "500":
 *           description: Internal server error
 */
router.post(
  "/login",
  [
    body("EmailId").isEmail().normalizeEmail(),
    body("Password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ],
  validateRequestSchema,
  login
);

/**
 * @swagger
 *   /api/v1/app/auth/user-details:
 *     get:
 *       summary: Mobile User Details
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - App Authentication
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
 *                         description: Array contains Therapist or Patient data based on login user.
 *                         items:
 *                           oneOf:
 *                             - $ref: '#/components/schemas/TherapistUserData'
 *                             - $ref: '#/components/schemas/PatientUserData'
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
 *                         example: User not found
 *         "500":
 *           description: Internal server error
 */
router.get(
  "/user-details",
  verifyAccessToken,
  pageAuthorisation(["Therapist", "Patient"]),
  userDetails
);

/**
 * @swagger
 *   /api/v1/app/auth/logout:
 *     get:
 *       summary: Logout
 *       description: Invalidate the provided AccessToken
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - App Authentication
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
 *                         example: Logged out successfully
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
router.get("/logout", verifyAccessToken, logout);

/**
 * @swagger
 *   /api/v1/app/auth/logout-all:
 *     get:
 *       summary: Logout from all devices
 *       description: Invalidate all AccessTokens generated by the user
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - App Authentication
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
 *                         example: Logged out from all devices successfully
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
router.get("/logout-all", verifyAccessToken, logoutAll);

/**
 * @swagger
 *   /api/v1/app/auth/forgot-password:
 *     post:
 *       summary: Forgot Password
 *       tags:
 *         - App Authentication
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   EmailId:
 *                     type: string
 *                     description: User email id
 *                     example: john@example.com
 *                 required:
 *                   - EmailId
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
 *                         example: Email Send Successfully
 *         "400":
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/400'
 *
 *         "500":
 *           description: Internal server error
 */
router.post(
  "/forgot-password",
  [body("EmailId").isEmail().normalizeEmail()],
  validateRequestSchema,
  forgotPassword
);

/**
 * @swagger
 *   /api/v1/app/auth/confirm-otp:
 *     post:
 *       summary: Confirm OTP
 *       tags:
 *         - App Authentication
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   EmailId:
 *                     type: string
 *                     description: User email id
 *                     example: john@example.com
 *                   PasswordResetOtp:
 *                     type: integer
 *                     minLength: 6
 *                     description: OTP
 *                     example: 245684
 *                 required:
 *                   - EmailId
 *                   - PasswordResetOtp
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
 *                       token:
 *                         type: string
 *                         example: IkoJODL?ofrH0VEpRZBWsshGgzgR2JDhNDxYrcd9fGOkHNH7P!4MzDPAtaph4jRUdXOF5PYModdDhstI7ixpfft?wtU735D38mvJ1EJtopnL!oJO3n?ew10NFOIhUZj0UJqIER95X=cS7QBoKesIJWjIwlp3FmD=6RA=cG1JsMEntz6QeLQt4o?CbdH28TQ5eFKoB!ZA5YFAFuJKtC=fY4ggza751oDWJEFBE?fCoJcu/YX=0q0AO5XZsZ5hbsLK
 *         "400":
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/400'
 *
 *         "500":
 *           description: Internal server error
 */
router.post(
  "/confirm-otp",
  [
    body("EmailId").isEmail().normalizeEmail(),
    body("PasswordResetOtp")
      .isLength({ min: 6 })
      .withMessage("Otp must be atleast 6 characters")
      .isNumeric()
      .withMessage("Otp must be a digit"),
  ],
  validateRequestSchema,
  confirmOtp
);

/**
 * @swagger
 *   /api/v1/app/auth/reset-password:
 *     post:
 *       summary: Reset Password
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - App Authentication
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Password:
 *                     type: string
 *                     description: User password
 *                     minLength: 6
 *                     example: "Demo@Password#1"
 *                 required:
 *                   - Password
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
 *                         example: Password updated successfully
 *         "400":
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/400'
 *
 *         "500":
 *           description: Internal server error
 */
router.post(
  "/reset-password",
  [
    body("Password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ],
  validateRequestSchema,
  verifyConfirmOtpToken,
  resetPassword
);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     PatientUserData:
 *       type: object
 *       properties:
 *         UserID:
 *           type: number
 *           example: 8
 *         EmailID:
 *           type: string
 *           example: contact@auticareweb.com
 *         UserName:
 *           type: string
 *           example: contact@auticareweb.com
 *         Phone:
 *           type: string
 *           example: 9876543211
 *         AddressLine1:
 *           type: string
 *           example: Karamana, Trivandrum
 *         AddressLine2:
 *           type: string
 *           example: Kerala, India
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
 *           example: 1
 *         Status:
 *           type: number
 *           example: 1
 *         PasswordResetOtp:
 *           type: number
 *         OtpCreate_TS:
 *           type: string
 *           example: 2022-11-08T16:18:11.000Z
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
 *         PatientID:
 *           type: number
 *           example: 8
 *         PatientName:
 *           type: string
 *           example: John Doe
 *         DOB:
 *           type: string
 *           example: 01/01/1990
 *         Gender:
 *           type: string
 *           example: Male
 *         ParentName:
 *           type: string
 *           example: William James
 *         Relationship:
 *           type: string
 *           example: Father
 *         PreviousTreatmentHistoryDescription:
 *           type: string
 *         PreviousTreatmentHistoryURL:
 *           type: string
 *           example: https://demourl.com
 *         Difficulty:
 *           type: string
 *         ReportsURL:
 *           type: string
 *           example: https://demourl.com
 *         Remarks:
 *           type: string
 *           example: Bad Condition
 *         IsAppCreated:
 *           type: number
 *           example: 0
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TherapistUserData:
 *       type: object
 *       properties:
 *         UserID:
 *           type: number
 *           example: 8
 *         EmailID:
 *           type: string
 *           example: contact@auticareweb.com
 *         UserName:
 *           type: string
 *           example: contact@auticareweb.com
 *         Phone:
 *           type: string
 *           example: 9876543211
 *         AddressLine1:
 *           type: string
 *           example: Karamana, Trivandrum
 *         AddressLine2:
 *           type: string
 *           example: Kerala, India
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
 *           example: 1
 *         Status:
 *           type: number
 *           example: 1
 *         PasswordResetOtp:
 *           type: number
 *         OtpCreate_TS:
 *           type: string
 *           example: 2022-11-08T16:18:11.000Z
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
 *           example: 8
 *         CenterName:
 *           type: string
 *           example: KIMS
 *         FacilitatorType:
 *           type: string
 *           example: Nurse
 *         Salutation:
 *           type: string
 *           example: Mr
 *         Name:
 *           type: string
 *           example: William James
 *         Designation:
 *           type: string
 *           example: Therapist
 *         Photo:
 *           type: string
 *           example: https://demourl.com
 *         Profile:
 *           type: string
 *         Qualification:
 *           type: string
 *           example: BSC Nursing
 *         Experience:
 *           type: string
 *         DocumentsURL:
 *           type: string
 *           example: https://demourl.com
 *         TherapistType:
 *           type: string
 */
