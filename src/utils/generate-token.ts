import jwt from 'jsonwebtoken'
export const generateJwtToken = (payload: any, secret: string): string => {
    return jwt.sign(payload, secret, { expiresIn: "1d" });
  };