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

export const generateFakeUserData = (userData) => ({
  ...defaultUserData,
  ...userData,
});

// TODO: for testing, use another DB
export const createUserInDatabase = async (fakeUser) => {
  const hashPassword = await hash(fakeUser.password);
  const query = {
    text: "INSERT INTO users (email, password) VALUES ($1, $2)",
    values: [fakeUser.email, hashPassword],
  };

  const result = await pool.query(query);
  return result;
};

export const cleanupDatabase = async(fakeUser) => {
  const query = {
    text: "DELETE FROM users WHERE email = $1",
    values: [fakeUser.email],
  };
  const result = await pool.query(query);
  return result;
};
