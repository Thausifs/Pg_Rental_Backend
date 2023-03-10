import express from "express";
import config from "config";
const app = express();
import connect from "./utils/dbConnect";
import Log from "./utils/logger";
import routes from "./routes";
import mongan from "morgan";
import globalErrorHandler from "./controller/globalerror.controller";

const port = config.get<number>("port");

//*Use All middleware
/**
 * Parse urlencoded request body
 */
app.use(express.urlencoded({ extended: true }));
/**
 * Parse json request body
 */
app.use(express.json({ strict: false }));
/**
 * Use Morgan For log
 */
app.use(mongan("dev"));

/**
 * Use All routes
 */
routes(app);

/**
 * Global Error handler
 */
app.use(globalErrorHandler);

app.listen(port, async () => {
  Log.info(`App is running http://localhost:${port}`);
  await connect();
});
