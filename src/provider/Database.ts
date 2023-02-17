import { Pool } from "pg";

import Locals from "./Local";
import Log from "./Log";

export class Database {
  public static pool: any;

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
  }
}

// export default Database;
