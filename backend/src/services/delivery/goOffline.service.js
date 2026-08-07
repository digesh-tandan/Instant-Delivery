const { pool } = require("../../config/database");

const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const DELIVERY_MESSAGES = require("../../constants/deliveryMessages");

const goOffline = async (req) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const partner =
            await DeliveryPartnerModel.findByUserId(

                req.user.id,

                connection

            );

        if (!partner) {

            throw new Error(

                DELIVERY_MESSAGES.DELIVERY_PARTNER_NOT_FOUND

            );

        }

        if (!partner.is_online) {

            throw new Error(

                DELIVERY_MESSAGES.DELIVERY_PARTNER_ALREADY_OFFLINE

            );

        }

        const active =
            await DeliveryPartnerModel.hasActiveOrder(

                partner.id,

                connection

            );

        if (active) {

            throw new Error(

                DELIVERY_MESSAGES.DELIVERY_PARTNER_BUSY

            );

        }

        await DeliveryPartnerModel.setOffline(

            partner.id,

            connection

        );

        await connection.commit();

        return null;

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = goOffline;