/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
     return knex.schema
        .createTable('games', function (table) {
            table.increments('game_id');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.string('black', 128).notNullable();
            table.string('white', 128).notNullable();
            table.string('winner', 128).notNullable();
            table.jsonb('moves', 128).notNullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('games');
};
