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
    } = Locals._config;

    const pool = new Pool({
      user: postgresUser,
      host: postgresHost,
      database: postgresDatabase,
      password: postgresPassword,
      port: parseInt(postgresPort || "5432"),
    });
    this.pool = pool;

    // check pool is connected
    if (pool) {
      Log.info(`Database connected`);
      console.log("\x1b[33m%s\x1b[0m", `Database connected`);
    }
  }
}

// export default Database;
