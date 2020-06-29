'use strict'

const Logger = use('Logger')

const User = use('App/Models/User')

class UserController {


    async create({ request, response }) {

        Logger.info("Register new user")

        try {
            const data = request.all(['name', 'email', 'password'])
            const userExists = await User.findBy('email', data.email)

            if (userExists) {
                return response
                    .status(400)
                    .json({
                        error: {
                            message: 'User already registered'
                        }
                    })
            }
            const user = await User.create(data)
            Logger.debug('New user registed')
            return user

        } catch (error) {
            Logger.error(error)
            return response
                .status(401)
                .json({
                    error: {
                        message: "Error when register",
                        error: error
                    }
                })
        }
    }

    async show({ response, params, auth }) {

        Logger.info("Show specific user")

        try {
            await auth.check();

            const user = await auth.getUser()
            user.files = await user.files().setVisible(['id', 'name']).fetch()

            Logger.debug('Return user registed')

            return response.status(200).json(user)

        } catch (error) {
            Logger.error(error)
            response.status(400).json({
                error: {
                    message: "Error when show information",
                    error: error
                }
            })
        }
    }




}

module.exports = UserController
