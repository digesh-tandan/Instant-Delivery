const {

    executeService

} = require("../../utils/executeService");

const ProfileService = require("../../services/profile/profile.service");

const statusCodes = require("../../constants/statusCodes");

const {

    successResponse

} = require("../../helpers/response.helper");

const PROFILE_MESSAGES = require("../../constants/profileMessages");

// Get Profile

exports.getProfile = executeService(

    ProfileService.getProfile,

    statusCodes.OK,

    PROFILE_MESSAGES.PROFILE_FETCHED

);

// Update Profile

exports.updateProfile = executeService(

    ProfileService.updateProfile,

    statusCodes.OK,

    PROFILE_MESSAGES.PROFILE_UPDATED

);

// Change Password

exports.changePassword = executeService(

    ProfileService.changePassword,

    statusCodes.OK,

    PROFILE_MESSAGES.PASSWORD_CHANGED

);

// Upload Profile Image

exports.uploadProfileImage = executeService(

    ProfileService.uploadProfileImage,

    statusCodes.OK,

    PROFILE_MESSAGES.PROFILE_IMAGE_UPDATED

);

// Request Delete Account

exports.requestDeleteAccount = executeService(

    ProfileService.requestDeleteAccount,

    statusCodes.OK,

    PROFILE_MESSAGES.OTP_SENT

);

// Verify Delete Account

exports.verifyDeleteAccount = executeService(

    ProfileService.verifyDeleteAccount,

    statusCodes.OK,

    PROFILE_MESSAGES.ACCOUNT_DELETED

);

// Get Sessions

exports.getSessions = executeService(

    ProfileService.getSessions,

    statusCodes.OK,

    PROFILE_MESSAGES.SESSIONS_FETCHED

);

// Logout One Session

exports.logoutSession = executeService(

    ProfileService.logoutSession,

    statusCodes.OK,

    PROFILE_MESSAGES.SESSION_LOGGED_OUT

);

// Logout All Other Sessions

exports.logoutAllSessions = executeService(

    ProfileService.logoutAllSessions,

    statusCodes.OK,

    PROFILE_MESSAGES.ALL_SESSIONS_LOGGED_OUT

);

// Get Users

exports.getUsers = executeService(

    ProfileService.getUsers,

    statusCodes.OK,

    PROFILE_MESSAGES.USERS_FETCHED

);

// Get User By ID

exports.getUserById = executeService(

    ProfileService.getUserById,

    statusCodes.OK,

    PROFILE_MESSAGES.USER_FETCHED

);

// Suspend User

exports.suspendUser = executeService(

    ProfileService.suspendUser,

    statusCodes.OK,

    PROFILE_MESSAGES.USER_SUSPENDED

);

// Activate User

exports.activateUser = executeService(

    ProfileService.activateUser,

    statusCodes.OK,

    PROFILE_MESSAGES.USER_ACTIVATED

);

// Delete User

exports.deleteUser = executeService(

    ProfileService.deleteUser,

    statusCodes.OK,

    PROFILE_MESSAGES.USER_DELETED

);