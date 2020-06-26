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
                return response
                    .status(400)
                    .send({ message: { error: 'User already registered' } })
            }

            const user = await User.create(data)
            Logger.info('New user registed')
            return user

        } catch (error) {
            Logger.error(error)
            return response.status(error.status).send(error)
        }
    }





}

module.exports = UserController
