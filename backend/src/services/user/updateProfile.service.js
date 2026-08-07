const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");

const AUTH_MESSAGES = require("../../constants/authMessages");

// Get User

const getUser = async (userId) => {

    const user = await UserModel.findById(userId);

    if (!user) {

        throw new Error(
            AUTH_MESSAGES.ACCOUNT_NOT_FOUND
        );

    }

    return user;

};


// Update Profile

const updateProfile = async (req) => {

    const connection = await pool.getConnection();

    try {

        const userId = req.user.id;

        const {

            first_name,

            last_name,

            phone,

            gender,

            date_of_birth,

            profile_image

        } = req.body;

        await getUser(userId);

        await connection.beginTransaction();

        await UserModel.updateProfile(

            connection,

            userId,

            {

                first_name,

                last_name,

                phone,

                gender,

                date_of_birth,

                profile_image

            }

        );

        await connection.commit();

        const updatedUser = await UserModel.findById(userId);

        return {

            id: updatedUser.id,

            first_name: updatedUser.first_name,

            last_name: updatedUser.last_name,

            email: updatedUser.email,

            phone: updatedUser.phone,

            profile_image: updatedUser.profile_image,

            gender: updatedUser.gender,

            date_of_birth: updatedUser.date_of_birth

        };

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