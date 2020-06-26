'use strict'

const Logger = use('Logger')

const User = use('App/Models/User')

class UserController {


    async create({ request, response }) {

        Logger.debug("Register new user")
        try {
            const data = request.only(['name', 'email', 'password'])
            const userExists = await User.findBy('email', data.email)

            if (userExists) {
                response
                    .status(400)
                    .send({ message: { error: 'User already registered' } })
            }

            const user = await User.create(data)
            Logger.info('New user registed')
            return user

        } catch (error) {
            Logger.error(error)
            response.status(error.status).json({
                error: {
                    message: "Error when register",
                    error: error.message
                }
            })
        }
    }

}

module.exports = UserController
