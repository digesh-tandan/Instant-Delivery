const getProfile = require("./getProfile.service");

const updateProfile = require("./updateProfile.service");

const changePassword = require("./changePassword.service");

const uploadProfileImage = require("./uploadProfileImage.service");

const getSessions = require("./getSessions.service");

const logoutSession = require("./logoutSession.service");

const logoutAllSessions = require("./logoutAllSessions.service");

const AdminService = require("./admin");

module.exports = {

    getProfile,

    updateProfile,

    changePassword,

    uploadProfileImage,

    getSessions,

    logoutSession,

    logoutAllSessions,

    ...AdminService

};