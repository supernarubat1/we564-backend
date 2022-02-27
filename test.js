const supertest = require("supertest");
const should = require("should");
const app = require("./app");
const server = supertest.agent(app);

describe("TEST GET API", () => {
  it("get api", async () => {
    server
      .get("/api/get")
      .expect(200)
      .end((err, res) => {
        should(res.status).equal(200);
      });
  });
});

describe("TEST POST API", () => {
  it("add data to database", async () => {
    server
      .post("/api/add")
      .send({ text: "__TEST__" })
      .expect(200)
      .end((err, res) => {
        should(res.status).equal(200);
      });
  });
});

describe("TEST DELETE API", () => {
  it("delete test data a few minute ago", async () => {
    server
      .delete("/api/del")
      .send({ test: "__TEST__" })
      .expect(200)
      .end((err, res) => {
        should(res.status).equal(200);
      });
  });
});
