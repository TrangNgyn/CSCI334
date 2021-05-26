const express = require('express');
const router = express.Router();
const organisation_controller = require('../controller/organisation');
const { auth_jwt } = require('../middleware');

// protected routes
router.put('/update-org-status', [
    auth_jwt.verify_token,
    auth_jwt.is_admin, 
], organisation_controller.post_update_org_verification_status);

router.post('/get-org-by-status', [
    auth_jwt.verify_token,
    auth_jwt.is_admin, 
], organisation_controller.get_org_by_status);

router.get('/get-business-details', [
    auth_jwt.verify_token,
    auth_jwt.is_organisation, 
],organisation_controller.get_org_buss)

router.post('/create-alert', [
    auth_jwt.verify_token,
    auth_jwt.is_organisation, 
],organisation_controller.post_create_alert)

router.post('/get-org-employees', [
    auth_jwt.verify_token,
    auth_jwt.is_organisation, 
],organisation_controller.get_org_employees)

module.exports = router;
