const {
    User
} = require("../models");

module.exports.getAllUsers = async function (req, res) {
    allUsers = await User.findAll()
        .catch(function (err) {
            console.log("Promise Rejected", err);
        });
    console.log(allUsers, "allUsers")
    return res.status(200).json(allUsers)
}