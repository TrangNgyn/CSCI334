const db = require('../models/db.js')

const empty_field = {
    success: false,
    message: "All fields must be filled"
}

class Organisation {

    // @route   POST api/organisation/update-org-status
    // @desc    Update the verification status of an org
    // @access  Protected

    async post_update_org_verification_status(req, res){
        try{
            const { email, is_verified } = req.body;

            // check for empty field
            if(!email || typeof is_verified === 'undefined'){
                return res.json(empty_field);
            }
            
            // find the civ by email          
            // and set is healthcare to false
            db.organisation.findOne({email: email}, (err, org) => {
                if(err)
                    return res.status(500).send({
                        message: err.message
                    })
                if(!org)
                    return res.status(404).json({
                        success: false,
                        message: "Organisation was not found"
                    })
               
                org.verified = is_verified;
                
                org.save(err => {
                    if(err)
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    
                    return res.send({
                        success: true,
                        message: "Healthcare organisation's verification status succesfully updated.",
                        verified: org.verified
                    });
                })              
                
            })          
        }catch(err){
            res.status(500).send({
                success: false,
                message: err.message
            });
        }
    }
    
    async manual_alert(req,res) {
        try{
            
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    // @route   POST api/organisation/get-org-by-email-status
    // @desc    Get a verified org by email and verification status
    // @access  Protected

    async get_org_by_status(req, res){
        // const { is_verified } = req.body;

        // check for empty field
        // if(typeof is_verified === 'undefined'){
        //     return res.json(empty_field);
        // }

        let verified_org, unverified_org;
        
        try{
            // find verified orgs
            await db.organisation
                .find({verified: true}, (err, user) => {
                    if(err)
                        return res.status(500).send({
                            success: false,
                            message: err.message
                        });
                    if(!user)
                        return res.status(404).json({
                            success: false,
                            message: "Organisation was not found"
                        });
                    
                    verified_org = user.map(org => {
                        return {
                            organisation_name: org.organisation_name,
                            email: org.email
                        }                        
                    })
                })

            // find unverified orgs
            await db.organisation
                .find({verified: false}, (err, user) => {
                    if(err)
                        return res.status(500).send({
                            success: false,
                            message: err.message
                        });
                    if(!user)
                        return res.status(404).json({
                            success: false,
                            message: "Organisation was not found"
                        });
                    
                    unverified_org = user.map(org => {
                        return {
                            organisation_name: org.organisation_name,
                            email: org.email
                        }                        
                    })

                    return res.json({
                        success: true,
                        data: {
                            verified_org,
                            unverified_org
                        }
                    });
                })

        }catch(err){
            res.status(500).send(err)
        }
        
    }

    // @route   GET api/organisation/get-business-details
    // @desc    Get all business details so the FE can search them and create an alert
    // @access  Protected
    

    async get_org_buss(req,res) {
        try{
            // only return business_name and address orgs don't need any more
            await db.business.find({}).select("business_name address")
            .then(found => {
                return res.send(found)
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message
                })
            })
            
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    // @route   GET api/organisaiton/employee-count
    // @desc    get total amount of employees for organisation
    // @access  Protected

    async get_employee_count(req,res) {
        try{
            await db.organisation.findById(req.user_id)
                .then(found => {
                    return res.send({
                        total_emp: found.employees.length
                    })
                })
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }
    

    // @route   POST api/organisation/create-alert
    // @desc    Create a new alert
    // @access  Protected

    async post_create_alert(req,res) {
        try{
            let { bus_id } = req.body
            // check that there is a business linked to that id
            await db.business.findById(bus_id)
            .orFail(new Error("No business found"))
            .then(async business => {
                const alert = await new db.alert({
                    business_name: business.business_name,
                    business_address: business.address,
                    business_id: business._id,
                    gps: business.gps
                })
                await alert.save()
                .then(async saved => {
                    // set date to 2 weeks ago
                    var find_date = Date.now()
                    find_date = find_date - 60*60*24*14*1000
                    // find civs that checked in 2 weeks ago
                    await db.check_in.find({ 
                        business: business._id, 
                        date: { $gte: find_date }
                    })
                    // add alert to all civs that checked in 2 weeks ago
                    .then(async check_ins => {
                        await Promise.all(check_ins.map(async check => {
                            await db.civilian.findById(check.civilian)
                                .then(civ => {
                                    civ.alerts.push(alert._id)
                                    civ.save()
                                })
                        }))
                        return res.send({
                            message: "Alert created and added to necessary civs"
                        })
                    })
                })
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message
                })
            })
        } catch (err) {
            if(err.message == "No business found")
                return res.status(404).send({
                    message: err.message
                })
            else
                return res.status(500).send({
                    message: err.message
                })
        }
    }

    // @route   GET api/organisation/get-org-employees
    // @desc    Get the org's employee stats
    // @access  Protected
    

    async get_org_employees(req,res) {
        try{
            // only return business_name and address orgs don't need any more
            await db.organisation
            .findById(req.user_id).populate("employees").select("organisation_name employees")
            .then(found => {

                if(!found){
                    return res.status(404).json({
                        success: false,
                        message: "No stats on employees available"
                    });
                }

                let emp_ids = found.employees.filter(e => e._id);
                let registered = found.employees.length;

                let vaccinated = 0;
                found.employees.forEach(e => {
                    if(e.vaccine !== {}){
                        vaccinated++;
                    }
                });

                return res.send({
                    success: true,
                    organisation_name: found.organisation_name,
                    emp_ids,
                    registered,
                    vaccinated
                })
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message
                })
            })
            
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }
}

const organisation_controller = new Organisation;
module.exports = organisation_controller;