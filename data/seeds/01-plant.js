exports.seed = function (knex) {
  return knex("plants").insert({
    plant: "Dahlia Pinnata",
    nickname: "Dolly",
    species: "Pinnata",
    h2ofrequency: "2x a week",
  });
};
