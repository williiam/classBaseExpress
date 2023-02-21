import { Pool } from "pg";

describe("test db connected", () => {
  let pool: Pool;

  beforeAll(async () => {
    // Initialize database connection pool
    pool = new Pool({
      user: "william",
      database: "startech",
      password: "postgres",
      host: "localhost",
      port: 5432,
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
  it("should connect to db", async () => {
    const result = await pool.query("SELECT NOW()");

    // Check that query returned a valid result
    expect(result.rowCount).toBe(1);
    expect(result.rows[0]).toHaveProperty("now");
  });
});
