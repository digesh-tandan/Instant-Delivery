const service = require("../../services/admin/getDeliveryApplications.service");

module.exports = async (req, res, next) => {

    try {

        const data = await service(req.query);

        return res.status(200).json({

            success: true,

            count: data.length,

            data

        });

    }

    catch (error) {

        next(error);

    }

};