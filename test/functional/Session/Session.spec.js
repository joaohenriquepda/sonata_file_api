'use strict'
const Factory = use('Factory')

const { test, trait, afterEach, beforeEach } = use('Test/Suite')('Session Controller')

trait('Test/ApiClient')
trait('Auth/Client')
trait("DatabaseTransactions")


test('Success when Authenticate', async ({ client, assert }) => {

    const user = {
        name: "user",
        email: "user@email.com",
        password: "password"
    }

    await client.post('/users').send(user).end()

    const response = await client.post('/sessions').send(user).end()
    response.assertStatus(200)
})


test('Unauthorized when tries Authenticate without email', async ({ client, assert }) => {

    const user = {
        name: "user",
        email: "user@email.com",
        password: "password"
    }

    await client.post('/users').send(user).end()

    user.email = ""

    const response = await client.post('/sessions').send(user).end()
    response.assertStatus(401)
})



test('Error when Authenticate with wrong information', async ({ client, assert }) => {

    await Factory.model('App/Models/User').create()
    const user = await Factory.model('App/Models/User').make()

    const response = await client.post('/sessions').send(user).end()
    response.assertStatus(401)

})

