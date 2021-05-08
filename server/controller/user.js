class User {

    // async get_all(req,res) {

    //     var found = await user_model.findOne({ email: "email2", password: "passwd" })

    // }

    allAccess(req,res) {
        res.status(200).send("Public Content")
    }

    userBoard(req,res) {
        res.status(200).send("User Content")
    }

    adminBoard(req,res) {
        res.status(200).send("Admin Content")
    }

}

const user = new User;
module.exports = user;
