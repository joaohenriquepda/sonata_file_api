'use strict'
const Factory = use('Factory')

const { test, trait, afterEach, beforeEach } = use('Test/Suite')('User Controller')

trait('Test/ApiClient')
trait('Auth/Client')

trait("DatabaseTransactions")


test('Success when Create user', async ({ client }) => {

    const response = await client.post('/users').send({
        name: "João Henrique",
        email: "joao10101@gmail.com",
        password: "12345"
    }).end()

    response.assertStatus(200)
    response.assertJSONSubset({
        name: "João Henrique",
        email: "joao10101@gmail.com",
    })

})

test('Error when create user', async ({ client }) => {

    await client.post('/users').send({
        name: "João Henrique",
        email: "joao10101@gmail.com",
        password: "12345"
    }).end()

    const response = await client.post('/users').send({
        name: "João Henrique",
        email: "joao10101@gmail.com",
        password: "12345"
    }).end()

    response.assertStatus(400)
    response.assertJSONSubset({
        error: {
            message: "User already registered"
        }
    })
})

test('Error when miss email', async ({ client }) => {

    const response = await client.post('/users').send({
        name: "João Henrique",
        email: "",
        password: "12345"
    }).end()

    response.assertStatus(400)
    response.assertJSONSubset({
        error: {
            message: "Error when register"
        }
    })
})

test('Error when miss all attributes', async ({ client }) => {

    const response = await client.post('/users').send({
        name: "",
        email: "",
        password: ""
    }).end()

    response.assertStatus(400)
    response.assertJSONSubset({
        error: {
            message: "Error when register"
        }
    })
})


test('Error when Show User without Authentication', async ({ client }) => {
    const response = await client.get('/users/1').end()
    response.assertStatus(401)

})


test('Error when Authenticate with wrong information', async ({ client, assert }) => {

    const user = {
        name: "João Henrique",
        email: "user@email.com",
        password: "12345"
    }

    const userReg = await client.post('/users').send({
        name: "João Henrique",
        email: "joao10101@gmail.com",
        password: "12345"
    }).end()

    const response = await client.post('/sessions').send(user).end()

    response.assertStatus(401)

})

test('Success when Authenticate', async ({ client, assert }) => {

    const user = {
        name: "João Henrique",
        email: "user@email.com",
        password: "12345"
    }
    await client.post('/users').send(user).end()

    const response = await client.post('/sessions').send(user).end()
    response.assertStatus(200)

})