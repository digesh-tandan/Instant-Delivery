const express = require("express");

const router = express.Router();

const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const applyController = require("../../controllers/delivery/applyDeliveryPartner.controller");
const getMyApplicationController = require("../../controllers/delivery/getMyApplication.controller");

const getAllApplicationsController = require("../../controllers/admin/getDeliveryApplications.controller");
const reviewApplicationController = require("../../controllers/admin/reviewApplication.controller");

const {
    applyDeliveryPartnerValidation,
    reviewApplicationValidation
} = require("../../validations/delivery/apply/delivery.validation");

// =====================
// Customer
// =====================

router.post(
    "/apply",
    authenticate,
    applyDeliveryPartnerValidation,
    applyController
);

router.get(
    "/application",
    authenticate,
    getMyApplicationController
);

// =====================
// Admin
// =====================

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
    reviewApplicationValidation,
    reviewApplicationController
);

module.exports = router;