import logger from "pino";
import dayjs from "dayjs";

const Log = logger({
  prettifier: true,
  base: {
    pid: false,
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default Log;
