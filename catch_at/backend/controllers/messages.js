const {
    Message
} = require("../models");

module.exports.getAllMessages = async function (req, res) {
    allMessages = await Message.findAll()
        .catch(function (err) {
            console.log("Promise Rejected", err);
        });
    console.log(allUsers, "allUsers")
    return res.status(200).json(allMessages)
}

module.exports.addMessage = async function (req, res) {
    try {
        const addMessage = await Message.create({
            senderId: req.body.senderId,
            recepientId: req.body.recepientId,
        })
        return res.status(200).json(addMessage)
    } catch (err) {
        console.log("Promise Rejected", err);
    }
}