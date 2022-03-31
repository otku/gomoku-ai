/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
     return knex.schema
        .createTable('games', function (table) {
            table.increments('id');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.string('type').notNullable();
            table.string('name').notNullable();
            table.specificType('arr','INT[][]').nullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('games');
};
