'use strict'

const Factory = use('Factory')

const Helpers = use('Helpers');

const { test, trait, afterEach, beforeEach } = use('Test/Suite')('File Controller')

trait('Test/ApiClient')
trait('Auth/Client')
trait("DatabaseTransactions")


test('Success when upload file', async ({ client, assert }) => {

    const response = await client
        .post('/files')
        .attach('file', Helpers.tmpPath('file_test.pdf'))
        .end()

    // response.assertStatus(200)
})


test('Error when upload file with wrong parameter', async ({ client, assert }) => {

    const response = await client
        .post('/files')
        .attach('archive', Helpers.tmpPath('file_test.pdf'))
        .end()

    // response.assertStatus(400)
})


test('Error when upload file', async ({ client, assert }) => {

    const response = await client
        .post('/files')
        .end()

    // response.assertStatus(400)
})