const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {
    User
} = require("../models");


module.exports.login = async function (req, res) {
    isUserExist = await User.findOne({
        where: {
            username: req.body.username
        },
    }).catch(function () {
        console.log("Promise Rejected");})

    if(!isUserExist){
        res.status(400).json(
            {
                message: "User doesn't exist"
            }
        )
    }else{
        // Проверка на совпадения паролей
        passwordChecking = await bcrypt.compareSync(req.body.password, isUserExist.password)
        if(passwordChecking){
            token = jwt.sign({
                username: isUserExist.username,
                id : isUserExist.id
            }, "catch_at")
            return res.json({token})
        }
        return res.status(400).json({
            message: "Passwords did not match"
        })
    }

}

module.exports.register = async function (req, res) {
    console.log(User)
    isUserExist = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    // Проверяем, есть ли Пользователь в БД
    if (isUserExist) {
        res.status(400).json({
            message: "User already exist"
        })
    } else {
        const {
            username,
            password,
            key
        } = req.body

        const salt = bcrypt.genSaltSync(10)
        try {
            const user = await User.create({
                username,
                password: bcrypt.hashSync(password, salt),
                key: bcrypt.hashSync(key, salt)
            })
            return res.status(200).json({
                message: "User successfully created"
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    }
}