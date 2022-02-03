const {
    Message
} = require("../models");

module.exports.getAllMessages = async function () {
    try{
        allMessages = await Message.findAll()
        .catch(function (err) {
            console.log("Promise Rejected", err);
        });
    console.log(allUsers, "allUsers")
    return allMessages
    } catch(err){
        console.log("promise rejected", err)
    }
}

module.exports.addMessage = async function (message) {
    try {
        message = JSON.parse(message.utf8Data);
        const addMessage = await Message.create({
            senderId: message.user,
            recipientId: 2,
            msg: message.msg
        })
        return addMessage
    } catch (err) {
        console.log("Promise Rejected", err);
    }
}