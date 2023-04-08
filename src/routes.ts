import { Express, Request, Response } from "express";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.router";
import listingRouter from "./routes/listing.routes";

function routes(app: Express) {
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  //*Use All auth routes
  app.use("/api/auth/", authRouter);
  //*Use all listing routes
  app.use("/api/listing", listingRouter);
  //*Use All User Routes
  app.use("/api/user", userRouter);
}

export default routes;
