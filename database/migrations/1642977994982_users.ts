import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('guid').primary();
      table.string('name').notNullable();
      table.string('last_name').nullable();
      table.string('cpf_cnpj').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.dateTime('date_of_birth', { useTz: false }).notNullable();
      table.string('image_url').nullable();
      table.string('phone').nullable();
      table.string('gender').notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
