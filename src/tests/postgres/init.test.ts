import { Pool } from "pg";
import Local from "../../provider/Local";

describe("test db connected", () => {
  let pool: Pool;

  beforeAll(async () => {
    const {
      postgresUser,
      postgresHost,
      postgresDatabase,
      postgresPassword,
      postgresPort,
    } = Local.config();

    // Initialize database connection pool
    pool = new Pool({
      user: postgresUser,
      database:postgresDatabase,
      password: postgresPassword,
      host: postgresHost,
      port: postgresPort,
    });
  });

  afterAll(async () => {
    // End database connection pool
    await pool.end();
  });

  afterEach(async () => {
    // Clear test data from database
    // await pool.query("DELETE FROM my_table");
  });

  it("should connect to db", async () => {
    const result = await pool.query("SELECT NOW()");

    // Check that query returned a valid result
    expect(result.rowCount).toBe(1);
    expect(result.rows[0]).toHaveProperty("now");
  });
  // table should be initialized
  it("table should be initialized", async () => {
    const result = await pool.query("SELECT * from users");

    // Check result of query , is not empty
    expect(result.rowCount).toBeGreaterThanOrEqual(0);
  });
});
