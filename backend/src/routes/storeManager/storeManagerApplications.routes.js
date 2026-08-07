const express = require("express");

const router = express.Router();

const authenticate = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/role.middleware");

const applyController = require("../../controllers/storeManager/applyStoreManager.controller");

const getMyApplicationController = require("../../controllers/storeManager/getMyStoreManagerApplication.controller");

const getAllApplicationsController = require("../../controllers/admin/getStoreManagerApplications.controller");

const reviewApplicationController = require("../../controllers/admin/reviewStoreManagerApplication.controller");

const {

    applyStoreManagerValidation,

    reviewStoreManagerValidation

} = require("../../validations/storeManager/StoreManager.validation");

// Customer

router.post(

    "/apply",

    authenticate,
    
    authorize(2),
    
    applyStoreManagerValidation,

    applyController

);

router.get(

    "/application",

    authenticate,

    authorize(2,4),

    getMyApplicationController

);

// Admin

router.get(

    "/applications",

    authenticate,

    authorize(1),

    getAllApplicationsController

);

router.patch(

    "/applications/:id",

    authenticate,

    authorize(1),

    reviewStoreManagerValidation,

    reviewApplicationController

);

module.exports = router;