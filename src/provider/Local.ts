/**
 * Define App Locals & Configs
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { Application } from "express";
import path from "path";
import dotenv from "dotenv";

class Locals {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */

  static _config: {
    appSecret: string;
    apiPrefix: string;
    company: string;
    copyright: string;
    description: string;
    isCORSEnabled: string | boolean;
    jwtExpiresIn: string | number;
    keywords: string;
    logDays: /**
     * Makes env configs available for your app
     * throughout the app's runtime
     */ /**
     * Makes env configs available for your app
     * throughout the app's runtime
     */ string | number;
    maxUploadLimit: string;
    maxParameterLimit: string | number;
    mongooseUrl: string | undefined;
    name: string;
    port: string | number;
    redisDB: string | number;
    redisHttpPort: string | number;
    redisHttpHost: string;
    redisPrefix: string;
    url: string;
    queueMonitor: string | boolean;
    queueMonitorHttpPort: string | number;
    postgresUser: string | undefined;
    postgresHost: string | undefined;
    postgresDatabase: string | undefined;
    postgresPassword: string | undefined;
    postgresPort: string | undefined;
    jwtSalt: string | undefined;
    saltRounds: number;
    jwtUserSaltRounds: number;
  };

  public static config(): any {
    dotenv.config({ path: path.join(__dirname, "../../.env") });

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 4040;
    const appSecret = process.env.APP_SECRET || "This is your responsibility!";
    const mongooseUrl = process.env.MONGOOSE_URL;
    const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || "50mb";
    const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || 50;

    const name = process.env.APP_NAME || "NodeTS Dashboard";
    const keywords = process.env.APP_KEYWORDS || "somethings";
    const year = new Date().getFullYear();
    const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
    const company = process.env.COMPANY_NAME || "GeekyAnts";
    const description =
      process.env.APP_DESCRIPTION || "Here goes the app description";

    const isCORSEnabled = process.env.CORS_ENABLED || true;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;
    const apiPrefix = process.env.API_PREFIX || "api";

    const logDays = process.env.LOG_DAYS || 10;

    const queueMonitor = process.env.QUEUE_HTTP_ENABLED || true;
    const queueMonitorHttpPort = process.env.QUEUE_HTTP_PORT || 5550;

    const redisHttpPort = process.env.REDIS_QUEUE_PORT || 6379;
    const redisHttpHost = process.env.REDIS_QUEUE_HOST || "127.0.0.1";
    const redisPrefix = process.env.REDIS_QUEUE_DB || "q";
    const redisDB = process.env.REDIS_QUEUE_PREFIX || 3;

    const postgresUser = process.env.POSTGRES_USER;
    const postgresHost = process.env.POSTGRES_HOST;
    const postgresDatabase = process.env.POSTGRES_DATABASE;
    const postgresPassword = process.env.POSTGRES_PASSWORD;
    const postgresPort = process.env.POSTGRES_PORT || 5432;

    const jwtSalt = process.env.JWT_SALT;

    const saltRounds = process.env.SALT_ROUNDS
      ? (parseInt(process.env.SALT_ROUNDS) as number)
      : 10;

    const jwtUserSaltRounds = process.env.JWT_USER_SALT_ROUNDS
      ? (parseInt(process.env.JWT_USER_SALT_ROUNDS) as number)
      : 10;

    return {
      appSecret,
      apiPrefix,
      company,
      copyright,
      description,
      isCORSEnabled,
      jwtExpiresIn,
      keywords,
      logDays,
      maxUploadLimit,
      maxParameterLimit,
      mongooseUrl,
      name,
      port,
      redisDB,
      redisHttpPort,
      redisHttpHost,
      redisPrefix,
      url,
      queueMonitor,
      queueMonitorHttpPort,
      postgresUser,
      postgresHost,
      postgresDatabase,
      postgresPassword,
      postgresPort,
      jwtSalt,
      saltRounds,
      jwtUserSaltRounds,
    };
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    dotenv.config({ path: path.join(__dirname, "../../.env") });

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 4040;
    const appSecret = process.env.APP_SECRET || "This is your responsibility!";
    const mongooseUrl = process.env.MONGOOSE_URL;
    const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || "50mb";
    const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || 50;

    const name = process.env.APP_NAME || "NodeTS Dashboard";
    const keywords = process.env.APP_KEYWORDS || "somethings";
    const year = new Date().getFullYear();
    const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
    const company = process.env.COMPANY_NAME || "GeekyAnts";
    const description =
      process.env.APP_DESCRIPTION || "Here goes the app description";

    const isCORSEnabled = process.env.CORS_ENABLED || true;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;
    const apiPrefix = process.env.API_PREFIX || "api";

    const logDays = process.env.LOG_DAYS || 10;

    const queueMonitor = process.env.QUEUE_HTTP_ENABLED || true;
    const queueMonitorHttpPort = process.env.QUEUE_HTTP_PORT || 5550;

    const redisHttpPort = process.env.REDIS_QUEUE_PORT || 6379;
    const redisHttpHost = process.env.REDIS_QUEUE_HOST || "127.0.0.1";
    const redisPrefix = process.env.REDIS_QUEUE_DB || "q";
    const redisDB = process.env.REDIS_QUEUE_PREFIX || 3;

    const postgresUser = process.env.POSTGRES_USER;
    const postgresHost = process.env.POSTGRES_HOST;
    const postgresDatabase = process.env.POSTGRES_DATABASE;
    const postgresPassword = process.env.POSTGRES_PASSWORD;
    const postgresPort = process.env.POSTGRES_PORT;

    const jwtSalt = process.env.JWT_SALT;

    const saltRounds = process.env.SALT_ROUNDS
      ? (parseInt(process.env.SALT_ROUNDS) as number)
      : 10;

    const jwtUserSaltRounds = process.env.JWT_USER_SALT_ROUNDS
      ? (parseInt(process.env.JWT_USER_SALT_ROUNDS) as number)
      : 10;

    // console.log(`POSTGRES_HOST is ${postgresHost}`);

    this._config = {
      appSecret,
      apiPrefix,
      company,
      copyright,
      description,
      isCORSEnabled,
      jwtExpiresIn,
      keywords,
      logDays,
      maxUploadLimit,
      maxParameterLimit,
      mongooseUrl,
      name,
      port,
      redisDB,
      redisHttpPort,
      redisHttpHost,
      redisPrefix,
      url,
      queueMonitor,
      queueMonitorHttpPort,
      postgresUser,
      postgresHost,
      postgresDatabase,
      postgresPassword,
      postgresPort,
      jwtSalt,
      saltRounds,
      jwtUserSaltRounds,
    };
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
