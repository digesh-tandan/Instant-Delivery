const express = require("express");

const router = express.Router();

const WishlistController = require("../../controllers/wishlist/wishlist.controller");

const authenticate = require("../../middleware/auth.middleware");

router.post(

    "/:variantId",

    authenticate,

    WishlistController.addWishlist

);

router.get(

    "/",

    authenticate,

    WishlistController.getWishlist

);

router.delete(

    "/:variantId",

    authenticate,

    WishlistController.removeWishlist

);

module.exports = router;