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
        `SELECT DISTINCT("recipientId"), "senderId","createdAt", LAST_VALUE("msg")
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
        let crossCompairing = allUserMessages.find((el) => {
            if (el.recipientId === i.senderId && el.senderId === i.recipientId) return true;
            return false
        })
        console.log(crossCompairing, "crossCompaiting")
        if (crossCompairing) {
            if (i.createdAt > crossCompairing.createdAt) {
                const indexOf = allUserMessages.indexOf(crossCompairing)
                allUserMessages.splice(indexOf, 1)
                allUserMessages.push(i)
                continue;
            }
            continue
        }

        if (!allUserMessages.includes(i)) allUserMessages.push(i)
    }
    console.log(allUserMessages, "allUserMessages")
}