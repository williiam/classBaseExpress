import bunyan from "bunyan";

const Logger = bunyan.createLogger({
  name: "express",
  streams: [
    {
      level: "info",
      path: "../logs/info", // log ERROR and above to a file
    },
    {
      level: "error",
      path: "../logs/error", // log ERROR and above to a file,,
      period: "1d",
      count: 7,
    },
  ],
});

export default Logger;
