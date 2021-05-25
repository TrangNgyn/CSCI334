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
            if(!email) {
                return res.json(empty_field);
            }

            db.civilian
                .findOne({
                    email: email,
                    is_healthcare_worker: false
                })
                .then(civ => {
                    if(!civ){
                        return res.status(404).send({
                            success: false,
                            message: 'No civilian found.'
                        })
                    }
                    
                    return res.json({
                        success: true,
                        civilian: {
                            first_name: civ.first_name,
                            last_name: civ.last_name,
                            email: civ.email
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

    // @route   POST api/civilian/healthcare-search-user
    // @desc    Find a user with a specific email
    // @access  Protected

    async post_healthcare_search_civilian(req,res) {
        try{
            const {email} = req.body;

            // check for empty field
            if(!email){
                return res.json(empty_field);
            }

            db.civilian
                .findOne({
                    _id: { $ne: req.user_id },
                    email: email
                })
                .then(civ => {
                    if(!civ){
                        return res.status(404).send({
                            success: false,
                            message: 'No user found.'
                        })
                    }

                    return res.json({
                        success: true,
                        civilian: {
                            first_name: civ.first_name,
                            last_name: civ.last_name,
                            email: civ.email
                        }
                    })

                })
                .catch(err => res.status(500).send({
                    success: false,
                    message: `Error finding the user with email ${email}`
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

    async post_search_healthcare(req,res) {
        try{
            const {email} = req.body;

            // check for empty field
            if(!email){
                return res.json(empty_field);
            }

            db.civilian
                .findOne({
                    email: email,
                    is_healthcare_worker: true
                })
                .then(civ => {
                    if(!civ){
                        return res.status(404).send({
                            success: false,
                            message: 'No healthcare worker found.'
                        })
                    }

                    return res.json({
                        success: true,
                        civilian: {
                            first_name: civ.first_name,
                            last_name: civ.last_name,
                            email: civ.email
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

            db.civilian.findOne({email: email, is_healthcare_worker: false}, (err, user) => {
                if(err)
                    return res.status(500).send({
                        message: err.message
                    })
                if(!user)
                    return res.status(404).json({
                        success: false,
                        message: "User was not found"
                    })
                db.role.findOne({name: 'healthcare'})
                    .orFail(new Error('error finding role'))
                    .then(role => {
                        user.is_healthcare_worker = true
                        user.roles.push(role._id)
                        user.save(err => {
                            if(err)
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                })
                        })
                        
                    })
                
                db.organisation.findById(req.user_id)
                    .orFail(new Error('error finding organisation'))
                    .then(org => {
                        org.employees.push(user._id)
                        org.save()
                        return res.send({
                            message: "User was added to healthcare org"
                        })
                    })
            })
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
    
    async post_demote_healthcare(req,res){
        try{
            const {email} = req.body;

            // check for empty field
            if(!email){
                return res.json(empty_field);
            }
            
            // find the civ by email          
            // and set is healthcare to fase
            db.civilian
                .findOneAndUpdate(
                    {email: email, is_healthcare_worker: true}, 
                    {is_healthcare_worker: false}
                )
                .then(civ => {
                    if(!civ){
                        res.status(404)
                        return res.json({
                            success: false,
                            message: `Civilian with email ${email} not found`
                        })
                    }
                            
                    // remove from org's employee list
                    db.organisation
                        .findByIdAndUpdate(req.user_id, function(error, org) {
                            if (error) {
                                res.status(404)
                                return res.json({
                                    success: false,
                                    message: `Error demoting civilian with email ${email}`
                                })
                            }

                            org.employees = org.employees
                                .filter(emp => emp !== civ._id);

                            return res.json({
                                success: true,
                                civilian: {
                                    first_name: civ.first_name,
                                    last_name: civ.last_name,
                                    email: civ.email,
                                    is_healthcare_worker: civ.is_healthcare_worker,
                                    org: org.employees
                                }
                            })  
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
}

const civilians_controller = new Civilian;
module.exports = civilians_controller;