class Civilian{
    // @route   POST civilians/check-in
    // @desc    Check in a civilian
    // @access  Public
    async check_in(req, res){
        console.log("Check in a civilian");

        res.send({message: "Civilian checked in successfully!"});
    }

}

const civilians_controller = new Civilian;
module.exports = civilians_controller;