import { Express, Request, Response } from "express";
import authRouter from "./routes/auth.routes";

function routes(app: Express) {
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.use("/api/auth/", authRouter);
}

export default routes;
