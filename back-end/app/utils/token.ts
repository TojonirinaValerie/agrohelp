import jwt from "jsonwebtoken";

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} 

const PrivateKey = process.env.PRIVATE_KEY || "lwdhwlfhldfds.sadhasfdsfsfsaf.sfhsadfhuireshuoh";

export const createToken = (data: any, expire: number) => {
  return jwt.sign({ ...data }, PrivateKey, { expiresIn: expire });
};

export const generateToken = (data: any) => {
  const accessToken = createToken(data, 15 * 60);
  const refreshToken = createToken(data, 24 * 60 * 60);

  return { accessToken, refreshToken };
};

export const verifyValidityToken = (
  token: string,
  callback: jwt.VerifyCallback
) => {
  jwt.verify(token, PrivateKey, callback);
};
