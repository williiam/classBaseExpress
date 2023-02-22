import bunyan from "bunyan";
import fs from "fs";
import path from "path";

class Logger {
  public static Logger = bunyan.createLogger({
    name: "express",
    streams: [
      {
        level: "info",
        path: "./logs/info", // log ERROR and above to a file
      },
      {
        level: "error",
        path: "./logs/error", // log ERROR and above to a file,,
        period: "1d",
        count: 7,
      },
    ],
  });;

  private static createLogDir = () => {
    const dir = "./logs";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  };

  public static init = () => {
    this.createLogDir();
  };

  public static info = (message: string | undefined) => {
    console.info(message);
    this.Logger.info(message);
  };

  public static warn = (message: string | undefined) => {
    console.warn(message);
    this.Logger.warn(message);
  };

  public static error = (message: string | undefined) => {
    console.error(message);
    this.Logger.error(message);
  };
}

export default Logger;
