const { pool } =
require("../../config/database");

const StoreManagerApplication =
require("../../models/storeManagerApplication.model");

const StoreManager =
require("../../models/storeManager.model");

const User =
require("../../models/user.model");

const STORE_MANAGER_MESSAGES =
require("../../constants/storeManager.messages");

module.exports = async (

    applicationId,

    adminId,

    body

) => {

    const application =
        await StoreManagerApplication.findById(

            applicationId

        );

    if (!application) {

        throw new Error(

            STORE_MANAGER_MESSAGES.APPLICATION_NOT_FOUND

        );

    }

    if (application.status !== "PENDING") {

        throw new Error(

            STORE_MANAGER_MESSAGES.APPLICATION_ALREADY_REVIEWED

        );

    }

    const connection =
        await pool.getConnection();

    try {

        await connection.beginTransaction();

        await StoreManagerApplication
            .updateStatusWithConnection(

                connection,

                applicationId,

                {

                    status: body.status,

                    remarks: body.remarks,

                    approved_by: adminId

                }

            );

        if (body.status === "APPROVED") {

            const alreadyManager =
                await StoreManager.findByUserId(

                    application.user_id,

                    connection

                );

            if (alreadyManager) {

                throw new Error(

                    "User is already a Store Manager."

                );

            }

            await User.updateRole(

                connection,

                application.user_id,

                4

            );

            await StoreManager.create(

                connection,

                {

                    user_id:
                        application.user_id,

                    store_name:
                        application.store_name,

                    store_address:
                        application.store_address,

                    experience_years:
                        application.experience_years

                }

            );

        }

        await connection.commit();

        return {

            success: true,

            message:

                body.status === "APPROVED"

                    ? STORE_MANAGER_MESSAGES.APPLICATION_APPROVED

                    : STORE_MANAGER_MESSAGES.APPLICATION_REJECTED

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