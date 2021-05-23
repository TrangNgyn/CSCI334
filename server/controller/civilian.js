const db = require('../models/db.js')

const empty_field = {
    success: false,
    message: "All fields must be filled"
}

class Civilian{

    // @route   GET api/civilian/:email
    // @desc    Get specific civ
    // @access  Protected

    async get_civ_by_email(req, res){
        try{
            let {email} = req.params;

            // check for empty field
            if(!email){
                return res.json(empty_field);
            }
            
            // find the civ by email
            db.civilian.find({email: email})
            .populate('alerts')
            .exec()
            .then((civ) => {
                if (!civ) {
                    res.status(404)
                    return res.json({success: false})
                }
                // this is temp till we figure out what we are doing with the dependents
                var dependents_to_alert = []
                civ.alerts.forEach(element => {
                    db.check_in.find({business: element.business_id })
                    .then(check_in => {
                        check_in.dependant.forEach(element => {
                            dependents_to_alert.push(element)
                        })
                    })
                })
                return res.json({
                    user, 
                    dependents_to_alert
                })
            })
            .catch(err => res.json(err))

        }catch(err){
            console.log(err)
        }
    }

    // @route   POST api/civilian/search-civilian
    // @desc    Find a civilian with a specific email
    // @access  Protected

    async post_search_civilian(req,res){
        try{
            const {email} = req.body;

            // check for empty field
            if(!email){
                return res.json(empty_field);
            }

            db.civilian
                .find({
                    email: email,
                    is_healthcare_worker: false
                })
                .then(doc => {
                    if(!doc){
                        return res.status(404).send({
                            success: true,
                            message: 'No civilian found.'
                        })
                    }

                    return res.json({
                        success: true,
                        civilian: {
                            first_name: doc.first_name,
                            last_name: doc.last_name,
                            email: doc.email
                        }
                    })

                })
                .catch(err => res.status(500).send({
                    success: false,
                    message: `Error finding the civilian with email ${email}`
                }))
        }catch(err){
            res.status(500).send({
                success: false,
                message: err.message
            })
        }
        
    }

    // @route   POST api/civilian/search-healthcare-worker
    // @desc    Find a healthcare worker with a specific email
    // @access  Protected

    async post_search_civilian(req,res){
        try{
            const {email} = req.body;

            // check for empty field
            if(!email){
                return res.json(empty_field);
            }

            db.civilian
                .find({
                    email: email,
                    is_healthcare_worker: true
                })
                .then(doc => {
                    if(!doc){
                        return res.status(404).send({
                            success: true,
                            message: 'No healthcare worker found.'
                        })
                    }

                    return res.json({
                        success: true,
                        civilian: {
                            first_name: doc.first_name,
                            last_name: doc.last_name,
                            email: doc.email
                        }
                    })

                })
                .catch(err => res.status(500).send({
                    success: false,
                    message: `Error finding the healthcare worker with email ${email}`
                }))
        }catch(err){
            res.status(500).send({
                success: false,
                message: err.message
            })
        }
        
    }

    // @route   POST api/civilian/promote-civilian
    // @desc    Make a civilian a healthcare worker
    // @access  Protected
    
    async post_promote_civilian(req,res){
        try{
            const {email} = req.body;

            // check for empty field
            if(!email){
                return res.json(empty_field);
            }
            
            // find the civ by email
            db.civilian
                .findOne({email: email, is_healthcare_worker: false})
                .then((civ) => {
                    console.log(civ)
                    if (!civ) {
                        res.status(404)
                        return res.json({
                            success: false,
                            message: `No civilian with email ${email} found`
                        })
                    }
                    
                    // set is healthcare to true
                    db.civilian
                        .findOneAndUpdate({email: civ.email}, {is_healthcare_worker: true})
                        .then(doc => {
                            if(!doc){
                                res.status(404)
                                return res.json({
                                    success: false,
                                    message: `Error promoting civilian with email ${email}`
                                })
                            }
                            
                            // return res.json({
                            //     success: true,
                            //     civilian: {
                            //         first_name: doc.first_name,
                            //         last_name: doc.last_name,
                            //         email: doc.email,
                            //         is_healthcare_worker: doc.is_healthcare_worker
                            //     }
                            // })       
                        })
                        .catch(err => res.status(500).json(err))
                    
                    // add to org's employee list
                    db.organisation
                        .findOne({ "_id": req.user_id }, function(error, org) {

                            if (error) {
                                res.status(404)
                                return res.json({
                                    success: false,
                                    message: `Error promoting civilian with email ${email}`
                                })
                            }

                            org.employees = [...org.employees, civ._id];
                        })
                        .catch(err => res.status(500).json(err));
                })
                .catch(err => res.status(500).json(err))            
        }catch(err){
            res.status(500).send({
                success: false,
                message: err.message
            })
        }
    }

    // @route   POST api/civilian/demote-healthcare-worker
    // @desc    Make a healthcare worker a civilian
    // @access  Protected
    
    async post_demote_civilian(req,res){
        try{
            const {email} = req.body;

            // check for empty field
            if(!email){
                return res.json(empty_field);
            }
            
            // find the civ by email
            db.civilian
                .findOne({email: email, is_healthcare_worker: true})
                .then((civ) => {
                    console.log(civ)
                    if (!civ) {
                        res.status(404)
                        return res.json({
                            success: false,
                            message: `No healthcare worker with email ${email} found`
                        })
                    }
                    
                    // set is healthcare to true
                    db.civilian
                        .findOneAndUpdate({email: civ.email }, {is_healthcare_worker: false})
                        .then(doc => {
                            if(!doc){
                                res.status(404)
                                return res.json({
                                    success: false,
                                    message: `Error demoting civilian with email ${email}`
                                })
                            }
                            
                            return res.json({
                                success: true,
                                civilian: {
                                    first_name: doc.first_name,
                                    last_name: doc.last_name,
                                    email: doc.email,
                                    is_healthcare_worker: doc.is_healthcare_worker
                                }
                            })       

                        })
                        .catch(err => res.status(500).json(err))
                    })
                    .catch(err => res.status(500).json(err))            
        }catch(err){
            res.status(500).send({
                success: false,
                message: err.message
            })
        }
    }
}

const civilians_controller = new Civilian;
module.exports = civilians_controller;