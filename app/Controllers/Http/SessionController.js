'use strict'
const Logger = use('Logger')
const User = use('App/Models/User')

class SessionController {

    async create({ request, auth, response }) {

        try {
            Logger.info("Create new Token")
            const { email, password } = request.all()
            const token = await auth.attempt(email, password)
            const user = await User.query().where('email', email).select('id').first()
            token.id = user.id
            return token
        } catch (error) {

            response.status(error.status).json({
                error: {
                    message: "Error when logging",
                    error: error.message
                }
            })
        }
    }
}

module.exports = SessionController
