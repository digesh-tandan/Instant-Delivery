const { pool } = require("../../config/database");

const DeliveryApplication = require("../../models/deliveryPartnerApplication.model");

const {

    DeliveryPartner

} = require("../../models/deliveryPartner.model");

const User = require("../../models/user.model");

module.exports = async (

    applicationId,

    adminId,

    body

) => {

    const application = await DeliveryApplication.findById(applicationId);

    if (!application) {
    
        throw new Error("Application not found.");
    
    }
    
    // Prevent reviewing an already reviewed application
    if (application.status !== "PENDING") {
    
        throw new Error(
            `Application is already ${application.status.toLowerCase()}.`
        );
    
    }

    const connection = await pool.getConnection();

    try{

        await connection.beginTransaction();

        await DeliveryApplication.updateStatusWithConnection(

            connection,

            applicationId,

            {

                status:body.status,

                remarks:body.remarks,

                approved_by:adminId

            }

        );

        if(body.status==="APPROVED"){

            await User.updateRole(

                connection,

                application.user_id,

                3

            );

            await DeliveryPartner.create(

                connection,

                {

                    user_id:application.user_id,

                    vehicle_type:application.vehicle_type,

                    vehicle_number:application.vehicle_number,

                    driving_license:application.driving_license

                }

            );

        }

        await connection.commit();

        return{

            success:true,

            message:`Application ${body.status.toLowerCase()}.`

        };

    }

    catch(error){

        await connection.rollback();

        throw error;

    }

    finally{

        connection.release();

    }

};