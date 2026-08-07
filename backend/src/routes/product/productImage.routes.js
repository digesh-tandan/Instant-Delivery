const express = require("express");

const router = express.Router();

const ProductImageController = require("../../controllers/product/productImage.controller");

const authMiddleware = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/role.middleware");

const validate = require("../../middleware/validation.middleware");

const upload = require("../../middleware/cloudinaryUpload.middleware");

const {

    addProductImageValidation,

    updateProductImageValidation,

    imageIdValidation,

    variantIdValidation

} = require("../../validations/product/productImage.validation");

router.post(

    "/var/:variantId/img",

    authMiddleware,

    authorize(1, 4),

    upload.single("image"),

    validate(addProductImageValidation),

    ProductImageController.addProductImage

);

router.get(

    "/var/:variantId/img",

    validate(variantIdValidation),

    ProductImageController.getProductImages

);
        
router.put(

    "/var/:imageId",

    authMiddleware,

    authorize(1, 4),

    upload.single("image"),

    validate(updateProductImageValidation),

    ProductImageController.updateProductImage

);

router.delete(

    "/var/:imageId",

    authMiddleware,

    authorize(1, 4),

    validate(imageIdValidation),

    ProductImageController.deleteProductImage

);

module.exports = router;