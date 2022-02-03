exports.up = function (knex) {
    return knex.schema.createTable("plants", plants => {
      plants.increments();
      plants.string("plant", 128)
        .notNullable()
        .unique();
      plants.string("nickname", 128)
      .notNullable()
      .unique();
      plants.string("species", 128)
      .notNullable();
      plants.string("h2ofrequency", 128)
      .notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("plants");
  };