const express = require('express');
const router = express.Router();
const civilians_controller = require('../controller/civilian');
const { auth_jwt } = require('../middleware');


router.get('/alerts',[
    auth_jwt.verify_token,
    auth_jwt.is_civilian,
],civilians_controller.get_alerts)

    // router.post('/search-civilian', [
    //     auth_jwt.verify_token,
    //     auth_jwt.is_healthcare,
    // ], civilians_controller.post_search_civilian);

router.post('/search-civilian', [
    auth_jwt.verify_token,
    auth_jwt.is_organisation,
], civilians_controller.post_search_civilian);

router.put('/promote-civilian', [
    auth_jwt.verify_token,
    auth_jwt.is_organisation,    
], civilians_controller.post_promote_civilian);

router.post('/search-healthcare', [
    auth_jwt.verify_token,
    auth_jwt.is_organisation,
], civilians_controller.post_search_healthcare);

router.put('/demote-healthcare', [
    auth_jwt.verify_token,
    auth_jwt.is_organisation,    
], civilians_controller.post_demote_healthcare);

router.post('/healthcare-search-user', [
    auth_jwt.verify_token,
    auth_jwt.is_healthcare,
], civilians_controller.post_healthcare_search_civilian);

router.post('/retrieve-vaccination-status', [
    auth_jwt.verify_token,
    auth_jwt.is_healthcare,
], civilians_controller.post_retrieve_vaccination_status);

router.put('/update-vaccination-status', [
    auth_jwt.verify_token,
    auth_jwt.is_healthcare,
], civilians_controller.put_update_vaccine_status);

router.post('/civ-create-alerts', [
    auth_jwt.verify_token,
    auth_jwt.is_healthcare,
], civilians_controller.post_civ_alerts);



module.exports = router;