/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {type: 'create',name:'johnnie',arr:[[0,1],[0,2]]}
  ]);
};
