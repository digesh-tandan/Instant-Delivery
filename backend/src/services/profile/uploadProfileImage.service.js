const fs = require("fs");

const path = require("path");

const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");

const PROFILE_MESSAGES = require("../../constants/profileMessages");

const uploadProfileImage = async (req) => {

    const connection = await pool.getConnection();

    try {

        if (!req.file) {

            throw new Error(

                PROFILE_MESSAGES.PROFILE_IMAGE_REQUIRED

            );

        }

        const user = await UserModel.findById(

            req.user.id

        );

        if (!user) {

            throw new Error(

                PROFILE_MESSAGES.PROFILE_NOT_FOUND

            );

        }

        // Delete old image

        if (user.profile_image) {

            const oldImage = path.join(

                __dirname,

                "../../../uploads/profile",

                user.profile_image

            );

            if (fs.existsSync(oldImage)) {

                fs.unlinkSync(oldImage);

            }

        }

        await connection.beginTransaction();

        await UserModel.updateProfileImage(

            connection,

            user.id,

            req.file.filename

        );

        await connection.commit();

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/profile/${req.file.filename}`;

        return {
        
            profile_image: req.file.filename,
        
            image_url: imageUrl
        
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

module.exports = uploadProfileImage;