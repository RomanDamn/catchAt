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

module.exports.addMessage = async function (msg) {
    try {
        const addMessage = await Message.create({
            senderId: msg.senderId,
            recipientId: msg.recipientId,
            msg: msg.msg,
            hasRead: false
        })
        return addMessage
    } catch (err) {
        console.log("Promise Rejected", err);
    }
}

module.exports.hasReadUpdate = async function (msg) {
    try{
        console.log(msg, "msg IN HasReadUpdate")
        const hasRead = await Message.update({hasRead: true},{
             where: {
                 senderId: msg.senderId,
                 recipientId: msg.recipientId,
                 msg: msg.msg
             }
         })
         .catch(function (err) {
             console.log("Promise Rejected", err);
         });
         console.log(msg, "MSG in HAS readUpdate")
     return hasRead
     } catch(err){
         console.log("promise rejected", err)
     }
}
