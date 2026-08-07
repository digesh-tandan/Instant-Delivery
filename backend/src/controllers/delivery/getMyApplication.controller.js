const service = require("../../services/delivery/apply/getMyApplication.service");

module.exports = async (req, res, next) => {

    try {

        const application = await service(req.user.id);

        return res.status(200).json({

            success: true,

            data: application

        });

    }

    catch (error) {

        next(error);

    }

};