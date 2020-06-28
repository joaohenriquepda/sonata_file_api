'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserInFileSchema extends Schema {
  up () {
    this.table('files', (table) => {
      // alter table
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.table('files', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddUserInFileSchema
