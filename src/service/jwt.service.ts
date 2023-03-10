import jwt from "jsonwebtoken";
import config from "config";
import { promisify } from "util";
import catchAsync from "../utils/catchAsync";

const jwt_secret = config.get<string>("jwt_secret");
const jwt_expires_in = config.get<string>("jwt_expires_in");

export const generateToken = (payload: { userId: string; number: String }) => {
  const token = jwt.sign(payload, jwt_secret, {
    expiresIn: jwt_expires_in,
  });
  return token;
};

export const decodeJwtToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwt_secret, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};
