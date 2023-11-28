import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import User from '../../models/user.model';
import { publicProcedure } from '../../trpc';
import { asyncHandler } from '../../handlers/asyncHandlers';
import { generateOTP } from '../../utils/generateOTP';
import { generateJWT } from '../../utils/generateJWT';
import { RESPONSE_CODE, RESPONSE_MESSAGE } from '../../constant';
import { authSchema, emailOTPSchema, loginSchema } from './authSchema';
import { sendOTPVarificationEmail } from '../../emails/email-manager';
import { IAuth } from './types';

export const signupController = publicProcedure.input(authSchema).mutation(async ({ input }) => {
  return asyncHandler(async () => {
    const findExistUser = await User.findOne({
      where: {
        [Op.or]: [{ email: input.email }, { username: input.username }],
      },
    });
    if (findExistUser) {
      return {
        statusCode: RESPONSE_CODE.BAD_REQUEST,
        success: false,
        message: 'Email already exists!',
      };
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const otp = generateOTP();
    const newUser = {
      ...input,
      otp,
      password: hashedPassword,
      otp_expiry: new Date().getTime() + 2 * 60 * 1000,
    };
    const user = (await User.create(newUser)) as unknown as IAuth;
    const token = generateJWT(user.user_id, user.email);

    const emailResposne = await sendOTPVarificationEmail({
      email: user.email,
      otp,
    });
    const resUser = {
      user,
      token,
      emailResposne,
    };

    return {
      statusCode: RESPONSE_CODE.CREATED,
      message: 'User created successfully!',
      data: resUser,
    };
  });
});

export const verifyOTPController = publicProcedure.input(emailOTPSchema).mutation(async ({ input }) => {
  return asyncHandler(async () => {
    const findExistUser = (await User.findOne({
      where: {
        [Op.or]: [{ email: input.email }],
      },
    })) as unknown as IAuth;

    if (!findExistUser) {
      return {
        statusCode: RESPONSE_CODE.BAD_REQUEST,
        success: false,
        message: RESPONSE_MESSAGE.SOMETHING_WENT_WRONG,
      };
    }

    if (findExistUser.otp_expiry) {
      const isOTPSame = input.otp === findExistUser.otp;
      const isOTPExpired = new Date().getSeconds() > findExistUser.otp_expiry.getSeconds();

      if (!isOTPSame || isOTPExpired) {
        return {
          statusCode: RESPONSE_CODE.BAD_REQUEST,
          success: false,
          message: RESPONSE_MESSAGE.INVALID_OTP,
        };
      }
    }

    const updatedUser = await User.update(
      {
        otp: null,
        otp_expiry: null,
        is_verified: true,
      },
      {
        where: {
          user_id: findExistUser.user_id,
        },
      }
    );

    if (!updatedUser) {
      return {
        statusCode: RESPONSE_CODE.BAD_REQUEST,
        success: false,
        message: RESPONSE_MESSAGE.SOMETHING_WENT_WRONG,
      };
    }
    return {
      statusCode: RESPONSE_CODE.OK,
      success: true,
      message: RESPONSE_MESSAGE.VERIFY,
    };
  });
});

export const loginController = publicProcedure.input(loginSchema).mutation(async ({ input }) => {
  return asyncHandler(async () => {
    const existedUser = (await User.findOne({ where: { email: input.email } })) as unknown as IAuth;
    if (!existedUser) {
      return {
        statusCode: RESPONSE_CODE.BAD_REQUEST,
        success: false,
        message: RESPONSE_MESSAGE.INVALID_CREDENTIALS,
      };
    }

    const isPasswordMatched = await bcrypt.compare(input.password, existedUser.password);
    if (!isPasswordMatched) {
      return {
        statusCode: RESPONSE_CODE.BAD_REQUEST,
        success: false,
        message: RESPONSE_MESSAGE.INVALID_CREDENTIALS,
      };
    }

    const sanitizedUser = await User.findByPk(existedUser.user_id, {
      attributes: { exclude: ['password', 'otp', 'otp_expiry'] },
    });

    const token = generateJWT(existedUser.user_id, existedUser.email);
    const resUser = { user: sanitizedUser, token };

    return {
      statusCode: RESPONSE_CODE.OK,
      success: true,
      message: RESPONSE_MESSAGE.LOGIN_SUCCESS,
      data: resUser,
    };
  });
});
