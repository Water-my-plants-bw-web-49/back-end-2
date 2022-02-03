const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

const newPlant = {
  plant: "Fig Tree",
  nickname: "Arabella",
  species: "Squib",
  h2ofrequency: "Before naptime",
};

const badNewPlant = {
  plant: "",
  nickname: "",
};

describe("Sanity check", () => {
  test("2 = 2", () => {
    expect(2).toBe(2);
    expect(2).not.toBe(3);
  });
});

describe("GET /plants", () => {
  test("returns expected 200 status", async () => {
    const res = await request(server).get("/api/plants");
    expect(res.status).toBe(200);
  });
  test("returns expected object", async () => {
    const res = await request(server).get("/api/plants");
    expect(res.body[0].plant).toStrictEqual("Dahlia Pinnata");
  });
});

describe("GET /plants/:id", () => {
  test("returns 200 status with valid id", async () => {
    const res = await request(server).get("/api/plants/1");
    expect(res.status).toBe(200);
  });
  test("returns expected object", async () => {
    const res = await request(server).get("/api/plants/1");
    expect(res.body[0].plant).toStrictEqual("Dahlia Pinnata");
  });
  test("returns 404 status on nonsense id", async () => {
    const res = await request(server).get("/api/plants/1fdsafasfsdaw");
    expect(res.status).toStrictEqual(404);
  });
});

describe("POST /plants", () => {
  test("returns 201 status with valid object", async () => {
    const res = await request(server).post("/api/plants").send(newPlant);
    expect(res.status).toBe(201);
  });
  test("returns newly posted plant object", async () => {
    const res = await request(server).post("/api/plants").send(newPlant);
    expect(res.body[0]).toMatchObject(newPlant);
    expect(res.body[0]).not.toStrictEqual(newPlant);
  });
  test("returns error if plant or nickname field is missing", async () => {
    const res = await request(server).post("/api/plants").send(badNewPlant);
    expect(res.status).toBe(404);
    expect(res.text).toStrictEqual(
      '{"message":"please fill out all required fields"}'
    );
  });
});

describe("PUT /plants/:id", () => {
  test("returns 200 status with valid object", async () => {
    const res = await request(server).put("/api/plants/1").send(newPlant);
    expect(res.status).toBe(200);
  });
  test("returns newly updated plant object", async () => {
    const res = await request(server).put("/api/plants/1").send(newPlant);
    expect(res.body[0]).toMatchObject(newPlant);
    expect(res.body[0]).not.toStrictEqual(newPlant);
  });
  test("returns 400 status if no plant name or nickname", async () => {
    const res = await request(server).put("/api/plants/1").send(badNewPlant);
    expect(res.status).toStrictEqual(400);
  });
});

describe("DELETE /plants/id", () => {
  test("returns 200 status on successful delete", async () => {
    const res = await request(server).delete("/api/plants/1");
    expect(res.status).toStrictEqual(200);
  });
  test("successfully deletes plant", async () => {
    await request(server).delete("/api/plants/1");
    const deletedPlant = await request(server).get("/api/plants/1");
    expect(deletedPlant.text).toStrictEqual(
      '{"message":"That plant ID doesn\'t exist!"}'
    );
  });
});
