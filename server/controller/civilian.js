const db = require('../models/db.js')

const empty_field = {
    success: false,
    message: "All fields must be filled"
}

class Civilian{

    //middleware functions 

    // find business by ID and create a new alert at that location
    static find_bus(id) {
        return new Promise(async resolve => {
            await db.business.findById(id)
            .orFail(new Error("Error finding Business"))
            .then(async business => {
                var alert = await new db.alert({
                    business_name: business.business_name,
                    business_id: business._id,
                    gps: business.gps
                })
                resolve(alert)
            })
        })
    }

    // find all check ins where at the same location within 24 hours
    static find_check_in(check_in) {
        return new Promise(async resolve => {
            // create date that is 24 hours in the future
            var check_end = new Date(check_in.date) 
            check_end.setDate(check_end.getDate() + 1)
            await db.check_in.find({
                business: check_in.business,
                civilian: {$ne: check_in.civilian },
                date: {$gte: check_in.date, 
                         $lte: check_end}
            })
            .then(found_civs => {
                resolve(found_civs)
            })
        })
    }

    // @route   GET api/civilian/alerts
    // @desc    get civ alerts
    // @access  Restricted to signed in civs

    async get_alerts(req,res) {
        try{
            await db.civilian.findById(req.user_id).populate('alerts').select('alerts')
                .orFail(new Error('No user found'))
                .then(found => {
                    return res.send(found)
                })
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }


    // @route   POST api/user/edit-customer
    // @desc    edit customer information (not password)
    // @access  Restricted to signed in customers

    async post_civ_alerts (req,res) {
        try{
            let {email} = req.body

            if(!email) 
                return res.status(404).send(empty_field)

            let date_two_weeks = new Date()
            date_two_weeks.setDate(date_two_weeks.getDate() - 14)

            if(!email)
                return res.status(400).send(empty_field)
            await db.civilian.findOne({email: email})
            .orFail(err => {
                return res.status(500).send({
                    message: err.message
                })
            })
            .then(async civ => {
                await db.check_in.find({civilian: civ._id, date: {$gte: date_two_weeks}})
                .then(async checks => {
                    await Promise.all(checks.map(async check_in => {
                        // 24 hours later

                        let [alert, civ_checks] = await Promise.all([
                            Civilian.find_bus(check_in.business),
                            Civilian.find_check_in(check_in)
                        ])
                        await alert.save()

                        await Promise.all(civ_checks.map( async check_in => {
                            await db.civilian.findById(check_in.civilian)
                            .orFail(new Error("Error finding Civilian"))
                            .then(civ => {
                                civ.alerts.push(alert)
                                civ.save()
                            })
                        }))
                    }))
                })
            })
            return res.send({
                message: "New Alerts have been created and the necessary Civilian's have been notified"
            })
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
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
                            success: true,
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
            db.civilian.findOne({email: email, is_healthcare_worker: true}, (err, user) => {
                if(err)
                    return res.status(500).send({
                        message: err.message
                    })
                if(!user)
                    return res.status(404).json({
                        success: false,
                        message: "User was not found"
                    })
                db.role.findOne({name: 'civilian'})
                    .orFail(new Error('error finding role'))
                    .then(role => {
                        user.is_healthcare_worker = false;
                        user.roles.push(role._id);
                        user.save(err => {
                            if(err)
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                        })
                        
                    })
                
                db.organisation.findById(req.user_id)
                    .orFail(new Error('error finding organisation'))
                    .then(org => {
                        org.employees.pull(user._id);
                        org.save()
                        return res.send({
                            success: true,
                            message: "User was removed from healthcare org"
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

    // @route   POST api/civilian/update-vaccine-status
    // @desc    Add a cert to a civilian
    // @access  Protected

    async put_update_vaccine_status(req, res){
        let { 
            email, 
            vaccine_type, 
            date, 
            recommended_doses, 
            doses_received 
        } = req.body;

        // check for empty field
        if(!email || !vaccine_type || !recommended_doses || !doses_received){
            return res.json(empty_field);
        }

        // default to now if date is not provided
        if(!date){
            date = new Date();
        }

        // make sure user cannot their own vaccination status
        db.civilian.findById(req.user_id, (err, user) => {
            if(err){
                return res.status(500).send({err});
            }
            
            if(user){
                if(user.email === email){
                    return res.json({
                        success: false,
                        message: "User cannot update their own vaccination status"
                    });
                }
            }
        })

        const vaccine = {
            vaccine_type, 
            date, 
            recommended_doses, 
            doses_received
        };

        // update the certification of user with specified email
        db.civilian
            .findOneAndUpdate(
                {email: email}, 
                {vaccine: vaccine}
            )
            
            .then(civ => {
                if(!civ){
                    res.status(404)
                    return res.json({
                        success: false,
                        message: `Error adding certification for Civilian with email ${email}`
                    })
                }

                return res.json({
                    success: true,
                    message: "Vaccination info is successfully added."
                });
                
            })
    }

    // @route   POST api/civilian/retrieve-vaccination-status
    // @desc    Retrieve a cert of a civilian
    // @access  Protected

    async post_retrieve_vaccination_status(req, res){
        const { email } = req.body;

        db.civilian
            .findOne({email: email}, (err, user) => {
                if(err)
                    return res.status(500).send({
                        success: false,
                        message: err.message
                    });
                if(!user)
                    return res.status(404).json({
                        success: false,
                        message: "User was not found"
                    });
                
                // return the user's vaccine info
                return res.json({
                    success: true,
                    data: {
                        vaccine: user.vaccine
                    }
                });
            })
        
    }
}

const civilians_controller = new Civilian;
module.exports = civilians_controller;