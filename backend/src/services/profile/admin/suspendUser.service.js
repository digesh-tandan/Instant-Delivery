const { pool } = require("../../../config/database");

const UserModel = require("../../../models/user.model");

const AUTH_MESSAGES = require("../../../constants/authMessages");

const NotificationService =
require("../../../services/notification");

const validateUser = require("./helpers/validateUser.service");

const suspendUser = async (req) => {

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

        if (!user.is_active) {

            throw new Error(

                AUTH_MESSAGES.ACCOUNT_ALREADY_SUSPENDED

            );

        }

        await connection.beginTransaction();

        await UserModel.updateStatus(

            connection,

            user.id,

            false

        );

        await connection.commit();

        await NotificationService.sendAccountSuspendedEmail(

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

module.exports = suspendUser;