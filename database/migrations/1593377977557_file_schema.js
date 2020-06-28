'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up() {
    this.create('files', (table) => {
      table.increments()
      table.string('file_name', 200).notNullable().unique()
      table.string('name', 100).notNullable()
      table.string('description', 100)
      table.string('size', 25).notNullable()
      table.string('type', 10).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('files')
  }
}

module.exports = FileSchema
