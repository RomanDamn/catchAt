const { format } = require("morgan");
const {
    User, Message, sequelize
} = require("../models");
const { all } = require("../routes");


module.exports.getAllUsers = async function (req, res) {
    allUsers = await User.findAll()
        .catch(function (err) {
            console.log("Promise Rejected", err);
        });
    return res.status(200).json(allUsers)
}

module.exports.getMessagedUsers = async function (req, res) {
    const allMessagedUsers = await sequelize.query(
        `SELECT DISTINCT("recipientId"), "senderId", LAST_VALUE("msg")
        OVER(PARTITION BY "recipientId", "senderId"
            ORDER BY "createdAt"
            RANGE BETWEEN 
            UNBOUNDED PRECEDING AND 
            UNBOUNDED FOLLOWING) message
        FROM "Messages"
        WHERE "senderId" = ${req.body.senderId} OR "recipientId" = ${req.body.senderId};
        `
    )
        .catch(function (err) {
            console.log("Promise Rejected", err);
        });
    let allUserMessages = [];

    for (i of allMessagedUsers[0]) {
        const userWithTimestamp = await Message.findOne({
            where: {
                senderId: i.senderId,
                recipientId: i.recipientId,
                msg: i.message
            }
        })
        const iTimeStamp = {
            ...i, createdAt: userWithTimestamp.dataValues.createdAt
        }
        const crossCompairing = allUserMessages.find((el) => {
            if (el.recipientId === iTimeStamp.senderId && el.senderId === iTimeStamp.recipientId) return true;
            return false
        })
        console.log(crossCompairing, "crossCompaiting")
        if (crossCompairing) {

            if (iTimeStamp.createdAt > crossCompairing.createdAt) {
                const indexOf = allUserMessages.indexOf(crossCompairing)
                allUserMessages.splice(indexOf, 1)

                const senderName = await User.findOne({ where: { id: iTimeStamp.senderId } })
                const recipientName = await User.findOne({ where: { id: iTimeStamp.recipientId } })
                allUserMessages.push({ ...iTimeStamp, senderName: senderName.dataValues.username, recipientName: recipientName.dataValues.username })
                continue;
            }
            continue
        }
        //Here is bug in user messages!
        const senderName = await User.findOne({ where: { id: iTimeStamp.senderId } })
        const recipientName = await User.findOne({ where: { id: iTimeStamp.recipientId } })
        const parsedEl = { ...iTimeStamp, senderName: senderName.dataValues.username, recipientName: recipientName.dataValues.username }
        if (!allUserMessages.includes(parsedEl)) {
            allUserMessages.push({ ...iTimeStamp, senderName: senderName.dataValues.username, recipientName: recipientName.dataValues.username })
        }
    }
    console.log(allUserMessages, "allUserMessages")
    // Find Users by id

    const getNames = await User.findOne({ where: { id: 1 } })
    console.log(getNames.username, "getNames")

    return res.status(200).json(allUserMessages)
}