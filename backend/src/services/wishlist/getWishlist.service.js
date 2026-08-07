const WishlistModel = require("../../models/wishlist.model");

const getWishlist = async (req) => {

    return await WishlistModel.getWishlist(

        req.user.id

    );

};

module.exports = getWishlist;