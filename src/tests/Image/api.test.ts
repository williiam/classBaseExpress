import request from "supertest";
import App from "../../index";
import {
  generateFakeUserData,
  createUserInDatabase,
  cleanupDatabase,
} from "./index";

jest.setTimeout(30000);

const userData = generateFakeUserData({
    email: "123@gmail.com",
    password: "password",
    confirmPassword: "password",
  }); // generate fake user data

describe("Registration endpoint", () => {
  let app: Express.Application;

  beforeAll(async () => {
    app = App.getExpressApp();
      const cleanupBeforeResult = await cleanupDatabase(userData);
      const response = await request(app).post("/signup").send(userData);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        error: false,
        message: "Registration successful",
      });
  });
  afterAll(async () => {
    const cleanupResult = await cleanupDatabase(userData);
    console.log(cleanupResult)
  });
  afterEach(async () => {});

  it("should create a image for a user", async () => {
  })
  it("should delete a image for a user", async () => {
  })
  it("should set a image to private", async () => {
  })
  it("should set a image to public", async () => {
  })
})