'use strict'


const Helpers = use('Helpers');

const { test, trait, afterEach, beforeEach } = use('Test/Suite')('File Controller')


trait('Test/ApiClient')
trait('Auth/Client')
trait("DatabaseTransactions")


test('Success when upload file', async ({ client, assert }) => {


    const response = await client
        .post('/files')
        .field('name', 'filename')
        .field('description', 'filename in environment test')
        .attach('file', Helpers.tmpPath('file_test.pdf'))
        .end()

    response.assertStatus(200)

})


test('Success when upload file', async ({ client, assert }) => {

    const response = await client
        .post('/files')
        .field('name', 'filename_large')
        .attach('file', Helpers.tmpPath('file_test_large.pdf'))
        .end()

    response.assertStatus(400)
    response.assertJSONSubset({ error: "File size should be less than 300KB" })

})


test('Success when upload other file type', async ({ client, assert }) => {

    const response = await client
        .post('/files')
        .field('name', 'filename_')
        .attach('file', Helpers.tmpPath('icon.png'))
        .end()

    response.assertStatus(400)
    response.assertJSONSubset({
        error: "Invalid file type png or image. Only pdf is allowed"
    })

})




test('Error when upload file with wrong parameter', async ({ client, assert }) => {

    const response = await client
        .post('/files')
        .attach('archive', Helpers.tmpPath('file_test.pdf'))
        .end()

    response.assertStatus(400)
})


test('Error when upload file', async ({ client, assert }) => {

    const response = await client
        .post('/files')
        .field('name', 'filename_wrong')
        .end()

    response.assertStatus(400)
})