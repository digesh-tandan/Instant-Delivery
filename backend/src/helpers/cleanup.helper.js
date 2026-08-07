const OTPModel = require("../models/otp.model");
const PendingRegistrationModel = require("../models/pendingRegistration.model");
const RefreshTokenModel = require("../models/refreshToken.model");

const cleanupExpiredAuthData = async () => {

    await OTPModel.deleteExpired();

    await PendingRegistrationModel.deleteExpired();

    await RefreshTokenModel.deleteExpired();

};

module.exports = cleanupExpiredAuthData;