const request = require("supertest");
const app = require("../server");

let token;
let productId;

beforeAll(async () => {
  await request(app).post("/api/auth/register").send({
    name: "Tester",
    email: "tester@test.com",
    password: "123456"
  });

  const res = await request(app).post("/api/auth/login").send({
    email: "tester@test.com",
    password: "123456"
  });

  token = res.body.token;
});

describe("Products API", () => {
  it("Debe crear un producto", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "Laptop",
        price: 1000,
        description: "Gamer"
      });

    expect(res.statusCode).toBe(201);
    productId = res.body._id;
  });

  it("Debe obtener productos", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", "Bearer " + token);

    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Debe eliminar un producto", async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Authorization", "Bearer " + token);

    expect(res.body.message).toBe("Producto eliminado");
  });
});
