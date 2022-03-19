/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

let a = JSON.stringify([['0,0'],['1,1']]);
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('games').del()
  await knex('games').insert([
    {game_id: 1, created_at:"03-04-2022", black: 'john',white:'jane',winner:'black',moves:a },
    {game_id: 2, created_at:"03-04-2022", black: 'jane',white:'john',winner:'white',moves:a },
    {game_id: 3, created_at:"03-05-2022", black: 'tom',white:'jane',winner:'black',moves:a }
  ]);
};
