const db = require("../../data/dbConfig");

function getPlants() {
  return db("plants");
}

async function getPlantById(plant_id) {
  const plantRows = await db("plants").select().where("id", plant_id);
  return plantRows;
}

async function deletePlant(id) {
  return db("plants").where({ id }).del();
}

function updatePlant(id, changes) {
  return db("plants")
    .where("id", id)
    .update(changes)
    .then((count) => (count > 0 ? getPlantById(id) : null));
}

function findBy(filter) {
  return db("plants").where(filter); // {username: "foo"}
}

function insert(newPlant) {
  const [plant] = await db('plants').insert(newPlant, ['id', 'plant', 'nickname', 'species', 'h2ofrequency'])
  return plant
}

module.exports = {
  getPlants,
  getPlantById,
  deletePlant,
  updatePlant,
  findBy,
  insert,
};
