import bcrypt from "bcrypt";
import { Op } from "sequelize";
import User from "../../models/user.model";
import { authSchema, emailOTPSchema } from "./authSchema";
import { publicProcedure } from "../../trpc";
import { asyncHandler } from "../../handlers/asyncHandlers";
import { responseCode, responseMessage } from "../../constant";
import { generateOTP } from "../../utils/generateOTP";
import { IAuth } from "./types";
import { generateJWT } from "../../utils/generateJWT";
import { sendOTPVarificationEmail } from "../../emails/email-manager";

export const signupController = publicProcedure.input(authSchema).mutation(async ({ input }) => {
  return asyncHandler(async () => {
    const findExistUser = await User.findOne({
      where: { [Op.or]: [{ email: input.email }, { username: input.username }] },
    });
    if (findExistUser) {
      return { statusCode: responseCode.BAD_REQUEST, success: false, message: "Email already exists!" };
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const otp = generateOTP();
    const newUser = { ...input, password: hashedPassword, otp, otp_expiry: new Date().getTime() + 2 * 60 * 1000 };
    const user = (await User.create(newUser)) as unknown as IAuth;
    const token = generateJWT(user.user_id, user.email);

    const emailResposne = await sendOTPVarificationEmail({ email: user.email, otp });
    const resUser = { user, token, emailResposne };

    return {
      statusCode: responseCode.CREATED,
      message: "User created successfully!",
      data: resUser,
    };
  });
});
