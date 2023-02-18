import request from "supertest";
import axios from "axios";
import App from "../../index";
import jwt_decode from "jwt-decode";
import _cookie from 'cookie';

import {
  generateFakeUserData,
  createUserInDatabase,
  cleanupDatabase,
} from "./index";

jest.setTimeout(30000);

let userData = generateFakeUserData({
  email: "123@gmail.com",
  password: "password",
  confirmPassword: "password",
}); // generate fake user data

let cookie = "";

describe("image new endpoint", () => {
  let app: Express.Application;

  beforeAll(async () => {
    app = App.getExpressApp();
    const cleanupBeforeResult = await cleanupDatabase(userData);
    const response = await request(app).post("/api/auth/register").send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      error: false,
      message: "Registration successful",
      accessToken: expect.any(String),
    });
    const decoded = jwt_decode(response.body.accessToken);
    userData = {
      ...userData,
      ...decoded,
    };
    cookie = response.headers["set-cookie"][0];
    const cookieObject = _cookie.parse(cookie);
  });
  afterAll(async () => {
    const cleanupResult = await cleanupDatabase(userData);
    console.log(cleanupResult);
  });
  afterEach(async () => {});

  it("should create a image for a user", async () => {
    const file = Buffer.from("dummy image data");

    const newImageData = {
      name: "test",
      isPrivate: false,
      data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAA",
    };
    const response = await request(app)
      .post("/api/image/new")
      .field('isPrivate', newImageData.isPrivate)
      .set("cookie", cookie)
      .attach("file", file, "test.png")

    expect(response.status).toBe(200);
    // expect(response.body.message).toBe("Image uploaded successfully");
  });
  it("should delete a image for a user", async () => {});
  it("should set a image to private", async () => {});
  it("should set a image to public", async () => {});
});
