const StoreManagerApplication =
require("../../models/storeManagerApplication.model");

module.exports = async (

    query

) => {

    const page =
        Number(query.page) || 1;

    const limit =
        Number(query.limit) || 10;

    const offset =
        (page - 1) * limit;

    const applications =
        await StoreManagerApplication.getAll(

            query.status,

            limit,

            offset

        );

    return {

        success: true,

        page,

        limit,

        count: applications.length,

        data: applications

    };

};