import { IMailerPayload } from '../..';
import mailSender from '../utils/mailSender';

interface IOTPVerificationEvent {
  email: string;
  otp: string;
}

export const sendOTPVarificationEmail = async (otpVerificationEvent: IOTPVerificationEvent) => {
  const mailerPayload: IMailerPayload = {
    from: 'rajpatel158g@gmail.com',
    to: otpVerificationEvent.email,
    subject: 'Email verification - TwitterClone',
    html: `<h1>OTP: ${otpVerificationEvent.otp}</h1>`,
    RESPONSE_MESSAGE: 'OTP sent successfully',
  };
  return await mailSender(mailerPayload);
};
