import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_EXPIRES_IN } from "../constant";

interface JWT {
  sign(payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options?: SignOptions): string;
}

export function generateJWT(userId: number, email: string): string {
  const options: SignOptions = {
    encoding: "utf8",
    algorithm: "HS256",
    expiresIn: JWT_EXPIRES_IN,
  };
  const jwtInstance = jwt as JWT;
  const token = jwtInstance.sign({ userId, email }, "JWT_SECRET", options);
  return token;
}
