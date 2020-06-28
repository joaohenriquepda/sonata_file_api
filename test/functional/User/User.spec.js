'use strict'
const Factory = use('Factory')

const { test, trait, afterEach, beforeEach } = use('Test/Suite')('User Controller')

trait('Test/ApiClient')
trait('Auth/Client')
trait("DatabaseTransactions")


test('Success when Create user', async ({ client }) => {

    const user = {
        name: "user",
        email: "user@email.com",
        password: "password"
    }

    const response = await client.post('/users').send(user).end()

    response.assertStatus(200)
    response.assertJSONSubset({ name: user.name, email: user.email })

})

test('Error when create user', async ({ client }) => {

    const user_registed = await Factory.model('App/Models/User').create()

    const user = {
        name: "user",
        email: user_registed.email,
        password: "password"
    }

    const response = await client.post('/users').send(user).end()

    response.assertStatus(400)

})

test('Error when miss email', async ({ client }) => {

    const user = {
        name: "user",
        email: "",
        password: "password"
    }

    const response = await client.post('/users').send(user).end()

    response.assertStatus(400)
    response.assertJSONSubset({
        error: {
            message: "Error when register"
        }
    })
})

test('Error when miss all attributes', async ({ client }) => {

    const response = await client.post('/users').send().end()

    response.assertStatus(400)
    response.assertJSONSubset({
        error: {
            message: "Error when register"
        }
    })
})


test('Error when tries show User without Authentication', async ({ client }) => {

    const response = await client.get('/users/1').end()
    response.assertStatus(401)

})


