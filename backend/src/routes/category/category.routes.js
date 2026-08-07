const express = require("express");

const router = express.Router();

const CategoryController = require("../../controllers/category/category.controller");

const authMiddleware = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/role.middleware");

const validate = require("../../middleware/validation.middleware");

const {

    addCategoryValidation,

    updateCategoryValidation,

    categoryIdValidation

} = require("../../validations/category/category.validation");

// Add Category

router.post(

    "/",

    authMiddleware,

    authorize(1, 4),

    validate(addCategoryValidation),

    CategoryController.addCategory

);

// Get All Categories

router.get(

    "/",

    CategoryController.getCategories

);

// Search Categories

router.get(

    "/search",

    CategoryController.searchCategories

);

// Get Category By ID

router.get(

    "/:id",

    validate(categoryIdValidation),

    CategoryController.getCategoryById

);

// Update Category

router.put(

    "/:id",

    authMiddleware,

    authorize(1, 4),

    validate(updateCategoryValidation),

    CategoryController.updateCategory

);

// Delete Category

router.delete(

    "/:id",

    authMiddleware,

    authorize(1, 4),

    validate(categoryIdValidation),

    CategoryController.deleteCategory

);

module.exports = router;