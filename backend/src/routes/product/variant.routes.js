const express = require("express");

const router = express.Router();

const VariantController = require("../../controllers/product/variant.controller");

const authMiddleware = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/role.middleware");

const validate = require("../../middleware/validation.middleware");

const {

    addVariantValidation,

    updateVariantValidation,

    productIdValidation,

    variantIdValidation

} = require("../../validations/product/variant.validation");

// Add Variant

router.post(

    "/prod/:id/var",

    authMiddleware,

    authorize(1, 4),

    validate(addVariantValidation),

    VariantController.addVariant

);

// Get Variants

router.get(

    "/prod/:id/var",

    validate(productIdValidation),

    VariantController.getVariants

);

// Get Variant By ID

router.get(

    "/prod/var/:variantId",

    validate(variantIdValidation),

    VariantController.getVariantById

);

// Update Variant

router.put(

    "/prod/var/:variantId",

    authMiddleware,

    authorize(1, 4),

    validate(updateVariantValidation),

    VariantController.updateVariant

);

// Delete Variant

router.delete(

    "/prod/var/:variantId",

    authMiddleware,

    authorize(1, 4),

    validate(variantIdValidation),

    VariantController.deleteVariant

);

module.exports = router;