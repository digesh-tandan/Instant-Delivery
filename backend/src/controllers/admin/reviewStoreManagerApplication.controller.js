const { validationResult } =
require("express-validator");

const reviewStoreManagerApplicationService =
require("../../services/admin/reviewStoreManagerApplication.service");

module.exports = async (

    req,

    res,

    next

) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({

                success: false,

                errors: errors.array()

            });

        }

        const result =

            await reviewStoreManagerApplicationService(

                req.params.id,

                req.user.id,

                req.body

            );

        return res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};