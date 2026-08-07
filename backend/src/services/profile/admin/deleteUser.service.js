const { pool } = require("../../../config/database");

const UserModel = require("../../../models/user.model");

const AUTH_MESSAGES = require("../../../constants/authMessages");

const NotificationService =
require("../../../services/notification");

const validateUser = require("./helpers/validateUser.service");

const deleteUser = async (req) => {

    const connection = await pool.getConnection();

    try {

        const user = await validateUser(

            req.params.id

        );

        if (

            user.deleted_at !== null ||
                
            user.scheduled_deletion_at !== null
                
        ) {
        
            throw new Error(
            
                AUTH_MESSAGES.ACCOUNT_SCHEDULED_FOR_DELETION
            
            );
        
        }

        await connection.beginTransaction();

        await UserModel.softDelete(

            connection,

            user.id,

            req.user.id

        );

        await connection.commit();

        await NotificationService.sendAccountDeletedEmail(

            user.email,
                
            user.first_name
                
        );

        return null;

    }

    catch (error) {

        if (connection) {

            await connection.rollback();

        }

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = deleteUser;