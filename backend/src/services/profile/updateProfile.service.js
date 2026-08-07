const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");

const AUTH_MESSAGES = require("../../constants/authMessages");

// Validate Phone

const validatePhone = async (

    userId,

    phone

) => {

    if (!phone) return;

    const existingUser = await UserModel.findByPhone(phone);

    if (

        existingUser &&

        existingUser.id !== userId

    ) {

        throw new Error(

            AUTH_MESSAGES.PHONE_ALREADY_EXISTS

        );

    }

};

// Validate Profile Data

const validateProfile = async (

    req

) => {

    const {

        first_name,

        last_name,

        phone,

        gender,

        date_of_birth

    } = req.body;

    await validatePhone(

        req.user.id,

        phone

    );

    return {

        first_name: first_name?.trim(),

        last_name: last_name?.trim(),

        phone,

        gender,

        date_of_birth

    };

};

// Update Profile

const updateProfile = async (req) => {

    const connection = await pool.getConnection();

    try {

        const profileData = await validateProfile(req);

        await connection.beginTransaction();

        await UserModel.updateProfile(

            connection,

            req.user.id,

            profileData

        );

        await connection.commit();

        return await UserModel.findProfileById(

            req.user.id

        );

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = updateProfile;