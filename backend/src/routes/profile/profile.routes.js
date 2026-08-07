const createRouter = require("../../utils/routerFactory");

const router = createRouter("/api/v1/users");

const authenticate = require("../../middleware/auth.middleware");

const validate = require("../../middleware/validation.middleware");

const ProfileController = require("../../controllers/profile/profile.controller");

const profileValidation = require("../../validations/profile/profile.validation");

const changePasswordValidation = require("../../validations/profile/changePassword.validation");

const upload = require("../../utils/uploadFactory");

const deleteAccountValidation = require("../../validations/profile/deleteAccount.validation");

const verifyDeleteAccountValidation = require("../../validations/profile/verifyDeleteAccount.validation");

const authorize = require("../../middleware/role.middleware");

const adminValidation = require("../../validations/profile/admin.validation");

// Get Profile

router.get(

    "/profile",

    authenticate,

    ProfileController.getProfile

);

// Update Profile

router.patch(

    "/profile",

    authenticate,

    validate(profileValidation),

    ProfileController.updateProfile

);
// Upload Profile Image

router.patch(

    "/profile-image",

    authenticate,

    upload.profile.single("profile_image"),

    ProfileController.uploadProfileImage

);

// Change Password

router.patch(

    "/change-password",

    authenticate,

    validate(changePasswordValidation),

    ProfileController.changePassword

);

// Request Delete Account

router.delete(

    "/delete-account",

    authenticate,

    validate(deleteAccountValidation),

    ProfileController.requestDeleteAccount

);

// Verify Delete Account

router.post(

    "/delete-account/verify-otp",

    authenticate,

    validate(verifyDeleteAccountValidation),

    ProfileController.verifyDeleteAccount

);

// Get Active Sessions

router.get(

    "/sessions",

    authenticate,

    ProfileController.getSessions

);

// Logout One Session

router.delete(

    "/sessions/:id",

    authenticate,

    ProfileController.logoutSession

);

// Logout All Other Sessions

router.delete(

    "/sessions",

    authenticate,

    ProfileController.logoutAllSessions

);
// Admin Routes
// Get All Users

router.get(

    "/",

    authenticate,

    authorize(1),

    ProfileController.getUsers

);

// Get User By ID

router.get(

    "/:id",

    authenticate,

    authorize(1),

    validate(adminValidation),

    ProfileController.getUserById

);

// Suspend User

router.patch(

    "/:id/suspend",

    authenticate,

    authorize(1),

    validate(adminValidation),

    ProfileController.suspendUser

);

// Activate User

router.patch(

    "/:id/activate",

    authenticate,

    authorize(1),

    validate(adminValidation),

    ProfileController.activateUser

);

// Delete User

router.delete(

    "/:id",

    authenticate,

    authorize(1),

    validate(adminValidation),

    ProfileController.deleteUser

);

module.exports = router;