import { hash } from "../../util/crypt";
import { Database } from "../../provider/Database";

const defaultUserData = {
  email: "william@gmail.com",
  password: "123",
  confirmPassword: "123",
  firstName: "123",
  lastName: "123",
};

Database.init();
const pool = Database.pool;

export const generateFakeUserData = (userData:any) => ({
  ...defaultUserData,
  ...userData,
});

export const createUserInDatabase = async (fakeUser:any) => {
  const hashPassword = await hash(fakeUser.password);
  const query = {
    text: "INSERT INTO users (email, password) VALUES ($1, $2)",
    values: [fakeUser.email, hashPassword],
  };

  const result = await pool.query(query);
  return result;
};

export const cleanupDatabase = async(fakeUser:any) => {
  const imageQuery = {
    text: "DELETE FROM image",
  };
  const imageResult = await pool.query(imageQuery);
  const userQuery = {
    text: "DELETE FROM users WHERE email = $1",
    values: [fakeUser.email],
  };
  const userResult = await pool.query(userQuery);
  return { imageResult, userResult };
};
