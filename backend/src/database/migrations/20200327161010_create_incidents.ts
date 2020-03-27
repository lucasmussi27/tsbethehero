import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable('incidents', function(table) {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    table.string('ong_id').notNullable();
    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

export async function down(knex: Knex) {
  return await knex.schema.dropTable('incidents');
};
