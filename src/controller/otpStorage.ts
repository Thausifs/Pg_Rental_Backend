// otpStorage.ts
let storedOtp: string = "";

export const otpStorage = {
  setOtp: (otp: string) => {
    storedOtp = otp;
  },
  getOtp: () => {
    return storedOtp;
  },
};
