const express = require('express');
const router = express.Router();
const organisation_controller = require('../controller/organisation');
const { auth_jwt } = require('../middleware');

// protected routes
router.put('/update-org-status', [
    auth_jwt.verify_token,
    auth_jwt.is_admin, 
], organisation_controller.post_update_org_verification_status);

router.post('/get-org-by-email-status', [
    auth_jwt.verify_token,
    auth_jwt.is_admin, 
], organisation_controller.get_org_by_email_status);

router.get('/get_business_details', organisation_controller.get_org_buss)

module.exports = router;
