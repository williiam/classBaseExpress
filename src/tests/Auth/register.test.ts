import request from "supertest";
import App from "../../index";
import {
  generateFakeUserData,
  createUserInDatabase,
  cleanupDatabase,
} from "./index";

jest.setTimeout(30000);

describe("Registration endpoint", () => {
  let app: Express.Application;

  beforeAll(async () => {
    app = App.getExpressApp();
  });
  afterAll(async () => {
    // kill the app
  });
  afterEach(async () => {});

  it("should register a new user", async () => {
    const userData = generateFakeUserData({
      email: "123@gmail.com",
      password: "password",
      confirmPassword: "password",
    }); // generate fake user data
    const cleanupBeforeResult = await cleanupDatabase(userData);
    console.log(cleanupBeforeResult)
    const response = await request(app).post("/signup").send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      error: false,
      message: "Registration successful",
    });
    const cleanupResult = await cleanupDatabase(userData);
    console.log(cleanupResult)
  });

  it("should return an error if the email is already registered", async () => {
    // first create a fake user in the database
    const fakeUser = generateFakeUserData({
      email: "fake@gmail.com",
      password: "password",
      confirmPassword: "password",
    });
    const cleanupResultBefore = await cleanupDatabase(fakeUser);
    const createResult = await createUserInDatabase(fakeUser);
    const response = await request(app).post("/signup").send(fakeUser);
    expect(response.status).toBe(400);
    // expect(response.body).toMatchObject({
    //   error: true,
    //   message: "Email already registered",
    // });
    const cleanupResult = await cleanupDatabase(fakeUser);
    console.log(cleanupResult);
  });

  it("should return an error if the email is not email", async () => {
    const userData = generateFakeUserData({
      email: "123",
      password: "123",
      confirmPassword: "123",
    });
    const response = await request(app).post("/signup").send(userData);

    expect(response.status).toBe(400);
    // expect(response.body).toMatchObject({
    //   error: true,
    // });
  });

  it("should return an error if the confirmPassword is different from password", async () => {

    const userData = generateFakeUserData({
      password: "12345678",
      confirmPassword: "87654321",
    });
    const response = await request(app).post("/signup").send(userData);

    expect(response.status).toBe(400);
    // expect(response.body).toMatchObject({
    //   error: true,
    // });
  });
});
