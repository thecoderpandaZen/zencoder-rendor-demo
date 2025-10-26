import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description').nullable();
    table.enum('status', ['pending', 'in_progress', 'completed']).defaultTo('pending');
    table.enum('priority', ['low', 'medium', 'high']).defaultTo('medium');
    table.dateTime('dueDate').nullable();
    table.timestamps(true, true);
    table.index('userId');
    table.index('status');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('tasks');
}
