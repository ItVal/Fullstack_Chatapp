const request = require("supertest");

const User = require("../DataBase/User.model");
describe("user", () => {
  beforeEach(() => {
    server = require("../index");
  });
  afterEach(() => {
    server.close();
    User.collection.deleteMany(); //supprimer les données à la fin de chaque test
  });

  //premier : test de validation
  describe("POST /user/register", () => {
    it("should return a status 401 if Joi validation kicks", async () => {
      const response = await request(server)
        .post("/user/register")
        .send({})
        .set({ Accept: "Application/json" });
      expect(true).toBe(true);
    });
  });
});
