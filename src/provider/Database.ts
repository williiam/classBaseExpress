import { Pool } from "pg";

import Locals from "./Local";
import Log from "./Log";

export class Database {
  public static pool: any;

  private initTables(): void {}

  private initFunctions(): void {}

  // Initialize your database pool
  public static init(): any {
    const {
      postgresUser,
      postgresHost,
      postgresDatabase,
      postgresPassword,
      postgresPort,
    } = Locals.config();

    const pool = new Pool({
      user: postgresUser,
      host: postgresHost,
      database: postgresDatabase,
      password: postgresPassword,
      port: postgresPort,
    });
    this.pool = pool;
    console.log("\x1b[33m%s\x1b[0m", `Database connected`);
  }
}

// export default Database;
