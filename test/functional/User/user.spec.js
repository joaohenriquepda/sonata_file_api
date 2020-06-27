// 'use strict'

const UserController = require("../../../app/Controllers/Http/UserController")

const { test, trait, afterEach, beforeEach } = use('Test/Suite')('User Registration')

trait("Test/ApiClient")
trait("DatabaseTransactions")


test('Create user', async ({ client, done }) => {

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
