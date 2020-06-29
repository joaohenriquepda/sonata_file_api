'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const moment = require("moment");

const Factory = use('Factory')
Factory.blueprint('App/Models/User', faker => {
    return {
        name: faker.username(10),
        email: faker.email(10),
        password: faker.username(5),
    }
})


Factory.blueprint('App/Models/File', (faker, i, data) => {
    return {
        name: data.filename,
        description: faker.sentence(10),
        file_name: `${moment.now()}.pdf`,
        size: '1458584',
        type: 'pdf',
        user_id: data.id
    }
})


