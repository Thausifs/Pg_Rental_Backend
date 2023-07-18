import { Express, Request, Response } from "express";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.router";
import listingRouter from "./routes/listing.routes";
import teamMemberRouter from "./routes/teamMember.routes";
import foodmodulerouter from './routes/foodmodule.routes';
import { otpStorage } from '../src/controller/otpStorage'; 


function routes(app: Express) {
  app.get("/", (req, res) => {
    // Retrieve the stored OTP using the otpStorage module
    const storedOtp: string = otpStorage.getOtp();
  
    // Print the stored OTP in the response
    res.send(`Backend server is running! Last OTP sent: ${storedOtp}`);
  });
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  //*Use All auth routes
  app.use("/api/auth/", authRouter);
  //*Use all listing routes
  app.use("/api/listing", listingRouter);
  //*Use All User Routes
  app.use("/api/user", userRouter);
  //*Use All Team Member Write
  app.use("/api/teamMember", teamMemberRouter);
  app.use('/api/foodmodule', foodmodulerouter);
}

export default routes;
