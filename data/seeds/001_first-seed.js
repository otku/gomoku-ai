/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

let a = JSON.stringify([['0,0'],['1,1']]);
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {type: 'create',name:'johnnie',arr:[[0,1],[0,2]]}
  ]);
};
