
exports.up = function(knex) {
  return knex.schema.table('users', tbl => { 
      tbl.string('departments', 80).defaultTo('general'); 
  })
};

exports.down = function(knex) {
  return knex.schema.table('users', tbl => { 
      tbl.dropColumn('departments'); 
  })
};
