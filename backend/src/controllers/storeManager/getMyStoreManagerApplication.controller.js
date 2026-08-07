const getMyStoreManagerApplicationService =
require("../../services/storeManager/getMyStoreManagerApplication.service");

module.exports = async (

    req,

    res,

    next

) => {

    try {

        const application =

            await getMyStoreManagerApplicationService(

                req.user.id

            );

        return res.status(200).json({

            success: true,

            data: application

        });

    }

    catch (error) {

        next(error);

    }

};