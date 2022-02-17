const {
    Message
} = require("../models");

module.exports.getUserMessages = async function (req, res) {
    console.log("IN GETMESSAGEWS--------------------")
    console.log("req.body", req.body)
    try{
       const allUserMessages = await Message.findAll({
            where: {
                senderId: req.body.senderId,
                recipientId: req.body.recipientId
            }
        })
        .catch(function (err) {
            console.log("Promise Rejected", err);
        });
        // const userMsg = allUserMessages.map( el =>el.msg )
         console.log( JSON.stringify(allUserMessages), "===AllUserMessages")
    return res.json(allUserMessages);
    } catch(err){
        console.log("promise rejected", err)
    }
}

module.exports.addMessage = async function (message) {
    try {
        const msg = JSON.parse(message.utf8Data);
        console.log(msg, "!!!!!!!!!!!!!!!!!!!!!!MSG")
        const addMessage = await Message.create({
            senderId: msg.senderId,
            recipientId: msg.recipientId,
            msg: msg.msg
        })
        return addMessage
    } catch (err) {
        console.log("Promise Rejected", err);
    }
}