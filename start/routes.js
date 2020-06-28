'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello, welcome to SONATA File API' }
})

// LOGIN Route
Route.post('/sessions', 'SessionController.create')


// USERS Routes
Route.post('users', 'UserController.create')
Route.get('users/:id', 'UserController.show').middleware(['auth:jwt'])


// FILES Routes
Route.post('/files', 'FileController.upload');