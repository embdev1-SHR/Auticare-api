const router = require("express").Router();
const { body } = require("express-validator");
const {
  login,
  forgotPassword,
  resetPassword,
  confirmOtp,
  refreshToken,
  logout,
  logoutAll,
  centerSignup,
  getPendingCentersList,
  approvePendingCenter,
  rejectPendingCenterRegistration,
} = require("../controllers/auth.controller");
const { pageAuthorisation } = require("../middleware/authorization");
const { verifyConfirmOtpToken } = require("../middleware/authentication");
const {
  validateRequestSchema,
} = require("../middleware/validateRequestSchema");

/**
 *  @swagger
 *    tags:
 *      name: Authentication
 *      description: API to manage user authentication
 */

/**
 * @swagger
 *   /api/v1/auth/login:
 *     post:
 *       summary: Login
 *       tags:
 *         - Authentication
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
 *                   Password:
 *                     type: string
 *                     description: User password
 *                     minLength: 6
 *                     example: Kennedy@Client#1
 *                 required:
 *                   - EmailId
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
 *                     description: User object and token
 *                     properties:
 *                       accessToken:
 *                         type: string
 *                         example: IkoJODL?ofrH0VEpRZBWsshGgzgR2JDhNDxYrcd9fGOkHNH7P!4MzDPAtaph4jRUdXOF5PYModdDhstI7ixpfft?wtU735D38mvJ1EJtopnL!oJO3n?ew10NFOIhUZj0UJqIER95X=cS7QBoKesIJWjIwlp3FmD=6RA=cG1JsMEntz6QeLQt4o?CbdH28TQ5eFKoB!ZA5YFAFuJKtC=fY4ggza751oDWJEFBE?fCoJcu/YX=0q0AO5XZsZ5hbsLK
 *                       refreshToken:
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
 *   /api/v1/auth/logout:
 *     post:
 *       summary: Logout
 *       description: Invalidate the provided RefreshToken
 *       tags:
 *         - Authentication
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   RefreshToken:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIkVtYWlsSWQiOiJkZXZAYnl0ZS5pbiIsImlhdCI6MTY2Nzg5MTQwNywiZXhwIjoxNjY4MzIzNDA3fQ.OlmUfpA4eNTOTrEvveYwno9QR8XG7wdIkUuL0ywwf8w
 *                 required:
 *                   - RefreshToken
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
 *                         example: Logged successfully
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
  "/logout",
  [body("RefreshToken").not().isEmpty().withMessage("Field is required")],
  validateRequestSchema,
  logout
);

/**
 * @swagger
 *   /api/v1/auth/logout-all:
 *     post:
 *       summary: Logout from all devices
 *       description: Invalidate all RefreshTokens generated by the user
 *       tags:
 *         - Authentication
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   RefreshToken:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIkVtYWlsSWQiOiJkZXZAYnl0ZS5pbiIsImlhdCI6MTY2Nzg5MTQwNywiZXhwIjoxNjY4MzIzNDA3fQ.OlmUfpA4eNTOTrEvveYwno9QR8XG7wdIkUuL0ywwf8w
 *                 required:
 *                   - RefreshToken
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
 *                       accessToken:
 *                       message:
 *                         type: string
 *                         example: Logged out from all devices successfully
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
  "/logout-all",
  [body("RefreshToken").not().isEmpty().withMessage("Field is required")],
  validateRequestSchema,
  logoutAll
);

/**
 * @swagger
 *   /api/v1/auth/refresh-token:
 *     post:
 *       summary: Refresh Token
 *       description: Return a new accessToken
 *       tags:
 *         - Authentication
 *       requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   RefreshToken:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIkVtYWlsSWQiOiJkZXZAYnl0ZS5pbiIsImlhdCI6MTY2Nzg5MTQwNywiZXhwIjoxNjY4MzIzNDA3fQ.OlmUfpA4eNTOTrEvveYwno9QR8XG7wdIkUuL0ywwf8w
 *                 required:
 *                   - RefreshToken
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
 *                       accessToken:
 *                         type: string
 *                         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIkVtYWlsSWQiOiJkZXZAYnl0ZS5pbiIsImlhdCI6MTY2Nzg5MTQwNywiZXhwIjoxNjY4MzIzNDA3fQ.OlmUfpA4eNTOTrEvveYwno9QR8XG7wdIkUuL0ywwf8w
 *                       refreshToken:
 *                         type: string
 *                         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIkVtYWlsSWQiOiJkZXZAYnl0ZS5pbiIsImlhdCI6MTY2Nzg5MTQwNywiZXhwIjoxNjY4MzIzNDA3fQ.OlmUfpA4eNTOTrEvveYwno9QR8XG7wdIkUuL0ywwf8w
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
  "/refresh-token",
  [body("RefreshToken").not().isEmpty().withMessage("Field is required")],
  validateRequestSchema,
  refreshToken
);

/**
 * @swagger
 *   /api/v1/auth/forgot-password:
 *     post:
 *       summary: Forgot Password
 *       tags:
 *         - Authentication
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
 *   /api/v1/auth/confirm-otp:
 *     post:
 *       summary: Confirm OTP
 *       tags:
 *         - Authentication
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
 *   /api/v1/auth/reset-password:
 *     post:
 *       summary: Reset Password
 *       security:
 *        - bearerAuth: []
 *       tags:
 *         - Authentication
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

router.get("/pending-centers", pageAuthorisation(["SuperAdmin", "Admin", "ClientAdmin"]), getPendingCentersList);

router.post("/approve-center", pageAuthorisation(["SuperAdmin", "Admin", "ClientAdmin"]), approvePendingCenter);

router.delete("/reject-center/:UserID", pageAuthorisation(["SuperAdmin", "Admin", "ClientAdmin"]), rejectPendingCenterRegistration);

router.post(
  "/center-signup",
  [
    body("EmailId").isEmail().normalizeEmail(),
    body("Password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("CenterName").not().isEmpty().withMessage("Center name is required"),
  ],
  validateRequestSchema,
  centerSignup
);

module.exports = router;
