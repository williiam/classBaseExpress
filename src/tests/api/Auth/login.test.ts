import request from "supertest";
import App from "../../../index";
import {
  generateFakeUserData,
  createUserInDatabase,
  cleanupDatabase,
} from "../index";

jest.setTimeout(30000);

// first create a fake user in the database
const fakeUser = generateFakeUserData({
  email: "fake@gmail.com",
  password: "password",
});

describe("Login endpoint", () => {
  let app: Express.Application;

  beforeAll(async () => {
    app = App.getExpressApp();
  });
  afterAll(async () => {
    const cleanupResult = await cleanupDatabase(fakeUser);
    console.log(cleanupResult);
  });
  afterEach(async () => {});

  it("should login a user", async () => {
    const cleanUpResult = await cleanupDatabase(fakeUser);
    const createResult = await createUserInDatabase(fakeUser);
    const response = await request(app).post("/api/auth/login").send(fakeUser);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      error: false,
      message: "Login successful",
    });
    const cleanupResult = await cleanupDatabase(fakeUser);
    console.log(cleanupResult);
  });

  it("should return an error if the password incorrect", async () => {
    const userData = await generateFakeUserData(fakeUser);
    const response = await request(app)
      .post("/api/auth/login")
      .send({ ...userData, password: "incorrectPwd" });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: true,
      message: "password not match",
    });
    const cleanupResult = await cleanupDatabase(fakeUser);
  });
});
