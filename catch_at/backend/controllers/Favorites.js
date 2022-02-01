const {
    User, Favorite
} = require("../models");

module.exports.addToFavorites = async function (req, res) {
    console.log(req.body, " = body")
    try {
        const addToFavorites = await Favorite.create({
            subscriberId: req.body.subscriberId,
            subscribedId: req.body.subscribedId,
        })
        return res.status(200).json(addToFavorites)
    } catch (err) {
        console.log("Promise Rejected", err);
    }

}


module.exports.removeFromFavorites = async function (req, res) {
    console.log(req.body, " = body")
    try {
        const removeFromFavorites = await Favorite.destroy({
            where: {
                subscriberId: req.body.subscriberId,
                subscribedId: req.body.subscribedId,
            }
        })
        return res.status(200).json("Deleted Succesfully")
    } catch (err) {
        console.log("Promise Rejected", err);
    }

}


module.exports.getAllFavorites = async function (req, res) {
    console.log("You are in getAllFavorites")
    try {
        const getAllFavoritesOfUser = await Favorite.findAll({
            where: {
                subscriberId: 1
            },
            attributes: ['subscribedId']
        })
        console.log(getAllFavoritesOfUser, "===AllFav")
        const getAllFavoritUsers = await Promise.all(getAllFavoritesOfUser.map(async function (user) {
            console.log(user.subscribedId, "map user")

            const findAll = await User.findOne({
                where: {
                    id: user.subscribedId
                },
                attributes: ['id', 'username']
            }).catch(function (err) {
                console.log("Promise Rejected", err);
            });

            console.log(findAll, "+find_all")
            return findAll;
        })
        )
        console.log(getAllFavoritUsers, "------------")
        return res.status(200).json(getAllFavoritUsers)
    } catch (err) {
        console.log("Promise Rejected", err);
    }

}