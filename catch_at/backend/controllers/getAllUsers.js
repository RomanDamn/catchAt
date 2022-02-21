const { format } = require("morgan");
const {
    User, Message, sequelize
} = require("../models");


module.exports.getAllUsers = async function (req, res) {
    allUsers = await User.findAll()
        .catch(function (err) {
            console.log("Promise Rejected", err);
        });
    return res.status(200).json(allUsers)
}

module.exports.getMessagedUsers = async function (req, res) {
    const allMessagedUsers = await Message.findAll({
        attributes:[[sequelize.fn('DISTINCT', sequelize.col('recipientId')), 'recipientId']],
        where: {
            senderId: req.body.senderId,
        }
    })
    .catch(function (err) {
        console.log("Promise Rejected", err);
    });
    console.log(allMessagedUsers, "=allMessagedUsers")
    let necessaryUsers = [];
    console.log("in getMessagedUsers")
    console.log(req.body, "==req.body")
    for(id of req.body.id){
        console.log("in for")
        let user = await User.findAll({
            where: {
                id: id
            }
        })
        console.log(user, "==user")
       if(!necessaryUsers.includes(user)) necessaryUsers.push(user)
    }
    console.log(necessaryUsers, "===necessaryUsers")
    for(i of necessaryUsers) console.log(i.username, "item in necessaryUsers")
       return res.status(200).json(necessaryUsers)
}