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
Route.get('users', 'UserController.show').middleware(['auth'])


// FILES Routes
Route.post('/files', 'FileController.upload').middleware(['auth']);
Route.get('/files/:id', 'FileController.show').middleware(['auth']);