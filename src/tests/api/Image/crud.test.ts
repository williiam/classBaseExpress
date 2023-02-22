import request from "supertest";
import App from "../../../index";
import jwt_decode from "jwt-decode";
import _cookie from "cookie";
import fs from "fs";
import path from "path";

import {
  generateFakeUserData,
  createUserInDatabase,
  cleanupDatabase,
} from "../index";

jest.setTimeout(30000);

let userData = generateFakeUserData({
  email: "123@gmail.com",
  password: "password",
  confirmPassword: "password",
}); // generate fake user data

let cookie = "";
let imageId = "";

describe("image crud api", () => {
  let app: Express.Application;

  beforeAll(async () => {
    app = App.getExpressApp();
    const cleanupBeforeResult = await cleanupDatabase(userData);
    const response = await request(app)
      .post("/api/auth/register")
      .send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      error: false,
      message: "Registration successful",
      accessToken: expect.any(String),
    });
    const decoded = jwt_decode<any>(response.body.accessToken);
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

    const response = await request(app)
      .post("/api/image/new")
      .field("isPrivate", false)
      .set("cookie", cookie)
      .attach("file", `${__dirname}/cat.png`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      error: false,
      message: "Image created",
    });
    const image = response.body.data;
    imageId = image.id;
  });
  it("should set a image to private", async () => {
    const response = await request(app)
      .post("/api/image/update")
      .set("cookie", cookie)
      .send({
        imageId,
        isPrivate: true,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Image updated");
  });
  it("should get the actual public image by owner", async () => {
    const response = await request(app)
    .get(`/api/image/${imageId}`)
    .set("cookie", cookie)

    expect(response.status).toBe(200);
    // @ts-ignore
    fs.writeFileSync(`${__dirname}/cat2.png`, response._body);
  });

  it("should not get the actual public image by others", async () => {
    const response = await request(app)
    .get(`/api/image/${imageId}`)
    // .set("cookie", cookie)

    expect(response.status).toBe(403);
  });
  it("should set a image to public", async () => {
    const response = await request(app)
      .post("/api/image/update")
      .set("cookie", cookie)
      .send({
        imageId,
        isPrivate: false,
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Image updated");
  });
  it("should get the actual public image by anyone", async () => {
    const response = await request(app)
    .get(`/api/image/${imageId}`)
    .set("cookie", cookie)

    expect(response.status).toBe(200);
  });
  it("should delete a image for a user", async () => {
    // delete the image in test 1 ,
    // TODO: make it depends on test1
    const response = await request(app)
      .delete("/api/image/delete")
      .set("cookie", cookie)
      .send({
        imageId,
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Image deleted");
  });
});
