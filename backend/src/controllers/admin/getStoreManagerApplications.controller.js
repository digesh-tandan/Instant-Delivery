const getStoreManagerApplicationsService =
require("../../services/storeManager/getStoreManagerApplications.service");

module.exports = async (

    req,

    res,

    next

) => {

    try {

        const result =

            await getStoreManagerApplicationsService(

                req.query

            );

        return res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};