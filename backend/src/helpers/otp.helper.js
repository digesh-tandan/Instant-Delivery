const otpGenerator = require("otp-generator");

const generateOTP = () => {
    return otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        alphabets: false
    });
};

const generateOTPExpiry = () => {
    const expiry = new Date();
    expiry.setMinutes(
        expiry.getMinutes() + 10
    );
    return expiry;
};

module.exports = {
    generateOTP,
    generateOTPExpiry
};