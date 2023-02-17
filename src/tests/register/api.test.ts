import request from "supertest";
import App from "../../index";

interface IUserData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const defaultUserData: IUserData = {
  email: "william@gmail.com",
  password: "123",
  confirmPassword: "123",
  firstName: "123",
  lastName: "123",
};

const generateFakeUserData = (userData?: Partial<IUserData>): IUserData => ({
  ...defaultUserData,
  ...userData,
});

// TODO: for testing, use another DB
const createUserInDatabase = () => {
  // const userData = generateFakeUserData();
  // return User.create(userData);
  return generateFakeUserData();
};

const cleanupDatabase = () => {
  // const userData = generateFakeUserData();
  // return User.create(userData);
};

let app: Express.Application;

beforeAll(async () => {
    app = App.getExpressApp();
});
afterAll(async () => {
    // kill the app
    await App.close();
});

describe("Registration endpoint", () => {
  afterEach(async () => {
    await cleanupDatabase(); // clean up the database after each test
  });

  it("should register a new user", async () => {
    const userData = generateFakeUserData(); // generate fake user data
    const response = await request(app).post("/signup").send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      message: "Registration successful",
    });
  });

  it("should return an error if the email is already registered", async () => {
    const existingUser = await createUserInDatabase(); // create a user in the database
    const userData = generateFakeUserData({ email: existingUser.email }); // generate fake user data with the same email
    const response = await request(app).post("/register").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      message: "Email already registered",
    });
  });

  it("should return an error if the confirmPassword is different from password", async () => {
    const userData = generateFakeUserData({ password:"123", confirmPassword: "456"}); 
    const response = await request(app).post("/register").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      message: "password confirm failed",
    });
  });
});
