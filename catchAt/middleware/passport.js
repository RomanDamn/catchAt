JwtStrategy = require("passport-jwt").Strategy
extractJwt = require("passport-jwt").ExtractJwt
const {
    User
} = require("../models")

const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "catch_at"
}

module.exports = passport => {
        passport.use(
            new JwtStrategy(options, async (payload, done) => {
                    try {
                        const user = await User.findOne({where: {id: payload.id}})
                        if (user) {
                            done(null, user)
                        } else {
                            done(null, false)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }

            )


        )
}