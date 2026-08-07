const express = require("express");

const router = express.Router();

const ProductController = require("../../controllers/product/product.controller");

const authMiddleware = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/role.middleware");

const validate = require("../../middleware/validation.middleware");

const {

    searchProductsValidation

} = require("../../validations/product/search.validation");

const {

    addProductValidation,

    updateProductValidation,

    productIdValidation

} = require("../../validations/product/product.validation");

const {

    productOfferValidation

} = require("../../validations/product/productOffer.validation");

const {

    updateStockValidation

} = require("../../validations/product/updateStock.validation");

// Add Product

router.post(

    "/",

    authMiddleware,

    authorize(1, 4),

    validate(addProductValidation),

    ProductController.addProduct

);

// Get All Products

router.get(

    "/",

    ProductController.getProducts

);

// Search Products

router.get(

    "/search",

    validate(

        searchProductsValidation

    ),

    ProductController.searchProducts

);

// Get Product By ID

router.get(

    "/:id",

    validate(productIdValidation),

    ProductController.getProductById

);

// Update Product

router.put(

    "/:id",

    authMiddleware,

    authorize(1, 4),

    validate(updateProductValidation),

    ProductController.updateProduct

);

// Set Offer

router.patch(

    "/:id/offer",

    authMiddleware,

    authorize(1, 4),

    validate([

        ...productIdValidation,

        ...productOfferValidation

    ]),

    ProductController.setProductOffer

);

// Remove Offer

router.delete(

    "/:id/offer",

    authMiddleware,

    authorize(1, 4),

    validate(

        productIdValidation

    ),

    ProductController.removeProductOffer

);

// Update Stock

router.patch(

    "/:id/stock",

    authMiddleware,

    authorize(1, 4),

    validate([

        ...productIdValidation,

        ...updateStockValidation

    ]),

    ProductController.updateStock

);

// Delete Product

router.delete(

    "/:id",

    authMiddleware,

    authorize(1, 4),

    validate(productIdValidation),

    ProductController.deleteProduct

);

module.exports = router;