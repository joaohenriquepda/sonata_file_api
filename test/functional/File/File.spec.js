'use strict'


const Helpers = use('Helpers');

const { test, trait, afterEach, beforeEach } = use('Test/Suite')('File Controller')

const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')
trait("DatabaseTransactions")


test('Success when upload file', async ({ client, assert }) => {

    const user = await Factory.model('App/Models/User').create()

    const response = await client
        .post('/files')
        .loginVia(user, 'jwt')
        .field('name', 'filename')
        .field('description', 'filename in environment test')
        .attach('file', Helpers.tmpPath('file_test.pdf'))
        .end()

    response.assertStatus(200)

})

test('Error when upload file if not authenticated', async ({ client, assert }) => {

    const user = await Factory.model('App/Models/User').create()

    const response = await client
        .post('/files')
        .field('name', 'filename')
        .field('description', 'filename in environment test')
        .attach('file', Helpers.tmpPath('file_test.pdf'))
        .end()

    response.assertStatus(401)

})


test('Success when upload file', async ({ client, assert }) => {

    const user = await Factory.model('App/Models/User').create()

    const response = await client
        .post('/files')
        .loginVia(user, 'jwt')
        .field('name', 'filename_large')
        .attach('file', Helpers.tmpPath('file_test_large.pdf'))
        .end()

    response.assertStatus(400)
    response.assertJSONSubset({ error: "File size should be less than 300KB" })

})


test('Success when upload other file type', async ({ client, assert }) => {

    const user = await Factory.model('App/Models/User').create()

    const response = await client
        .post('/files')
        .loginVia(user, 'jwt')
        .field('name', 'filename_')
        .attach('file', Helpers.tmpPath('icon.png'))
        .end()

    response.assertStatus(400)
    response.assertJSONSubset({
        error: "Invalid file type png or image. Only pdf is allowed"
    })

})

test('Error when upload file with wrong parameter', async ({ client, assert }) => {

    const user = await Factory.model('App/Models/User').create()

    const response = await client
        .post('/files')
        .loginVia(user, 'jwt')
        .attach('archive', Helpers.tmpPath('file_test.pdf'))
        .end()

    response.assertStatus(400)
})


test('Error when upload file', async ({ client, assert }) => {

    const user = await Factory.model('App/Models/User').create()

    const response = await client
        .post('/files')
        .loginVia(user, 'jwt')
        .field('name', 'filename_wrong')
        .end()

    response.assertStatus(400)
})

test('Success when show file', async ({ client, assert }) => {

    const user = await Factory.model('App/Models/User').create()
    const file = await Factory.model('App/Models/File').create({ id: user.id, filename: 'filename' })
 
    const response = await client
        .get(`/files/${file.id}`)
        .loginVia(user, 'jwt')
        .end()

    response.assertStatus(200)

})


// test('Not Authorized show file', async ({ client, assert }) => {

//     const user = await Factory.model('App/Models/User').create()
//     const file = await Factory.model('App/Models/File').create({ id: user.id, filename: 'filename' })

//     const userN = await Factory.model('App/Models/User').create()
//     const fileN = await Factory.model('App/Models/File').create({ id: userN.id, filename: 'filename1' })

//     console.log(user);
//     console.log(userN);

//     const response = await client
//         .get(`/files/${file.id}`)
//         .loginVia(userN, 'jwt')
//         .end()

//     response.assertStatus(401)
//     response.assertJSONSubset({
//         error: "Not authorized file"
//     })

// })

// test('File not exist', async ({ client, assert }) => {

//     const user = await Factory.model('App/Models/User').create()
//     const file = await Factory.model('App/Models/File').create({ id: user.id, filename: 'filename' })

//     const response = await client
//         .get(`/files/99999`)
//         .loginVia(user, 'jwt')
//         .end()

//     response.assertStatus(404)
//     response.assertJSONSubset({
//         error: "File not exist"
//     })

// })