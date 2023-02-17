import * as path from "path";
import * as dotenv from "dotenv";

import Express from "./Express";
import { Database } from "./Database";
import Logger from "./Log";

class App {
  // Loads your dotenv file
  public loadConfiguration(): void {
    Logger.info("Configuration :: Booting @ Master...");

    dotenv.config({ path: path.join(__dirname, "../../.env") });
  }

  // Loads your Server
  public loadServer(): void {
    Logger.info("Server :: Booting @ Master...");

    Express.init();
  }

  // Loads the Database Pool
  public loadDatabase(): void {
    Logger.info("Database :: Booting @ Master...");

    Database.init();
  }

  // get the express app instance for testing
  public getExpressApp(): any {
    return Express.express;
  }
}

export default new App();
