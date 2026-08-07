const {

    executeService

} = require("../../utils/executeService");

const statusCodes = require("../../constants/statusCodes");

const WISHLIST_MESSAGES = require("../../constants/wishlistMessages");

const WishlistService = require("../../services/wishlist");

exports.addWishlist = executeService(

    WishlistService.addWishlist,

    statusCodes.CREATED,

    WISHLIST_MESSAGES.ADDED

);

exports.getWishlist = executeService(

    WishlistService.getWishlist,

    statusCodes.OK,

    WISHLIST_MESSAGES.FETCHED

);

exports.removeWishlist = executeService(

    WishlistService.removeWishlist,

    statusCodes.OK,

    WISHLIST_MESSAGES.REMOVED

);