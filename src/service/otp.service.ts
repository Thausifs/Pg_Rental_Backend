import { generate } from "otp-generator";
import bcrypt from "bcrypt";
import config from "config";

const numberOfSalt = config.get<number>("number_of_salt");

export const otpGenerator = () => {
  return generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });
};

export const sendOtp = async (otp: string, number: string) => {
  try {
    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization:
          "Spa4dzhmKjxLsGV7t6vXYHgnIBOWl5kF0fDN92Qb3r1ECMR8JA63Gzs21aFcbmnr7BKACLefjXyR9UiZ",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "v3",
        sender_id: "FTWSMS",
        message: `Your Otp is ${otp}`,
        language: "english",
        flash: 0,
        numbers: number,
      }),
    });
    const res = await response.json();
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const encryptTheOtp = async (otp: string) => {
  return await bcrypt.hash(otp, numberOfSalt);
};

export const checkOtpIsCorrectNess = async (
  encryptOtp: string,
  otp: string
) => {
  return await bcrypt.compare(encryptOtp, otp);
};
