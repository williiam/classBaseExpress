import request from "supertest";
import axios from 'axios';
import App from "../../index";
import jwt_decode from "jwt-decode";

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
        accessToken: expect.any(String),
      });
      const decoded = jwt_decode(response.body.accessToken);
      userData = {
        ...userData,
        ...decoded,
      }

  });
  afterAll(async () => {
    const cleanupResult = await cleanupDatabase(userData);
    console.log(cleanupResult)
  });
  afterEach(async () => {});

  it("should create a image for a user", async () => {

    const file = Buffer.from('dummy image data');
    
    const newImageData = {
      name: "test",
      isPrivate: false,
      data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAA"
    }

    const response = await axios.post('http://localhost:3000/api/upload', file, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Image uploaded successfully');

  })
  it("should delete a image for a user", async () => {
  })
  it("should set a image to private", async () => {
  })
  it("should set a image to public", async () => {
  })
})