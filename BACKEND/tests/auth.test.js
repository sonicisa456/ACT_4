const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {
  let token;

  it("Debe registrar un usuario", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test",
        email: "test@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
  });

  it("Debe iniciar sesión y devolver token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "123456"
      });

    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });
});
