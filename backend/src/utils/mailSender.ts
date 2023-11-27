import { IMailerPayload } from "./../../index.d";
import { RESPONSE_MESSAGE } from "./../constant/index";
import nodemailer from "nodemailer";
import { logger } from "./logger";

async function mailSender(
  mailerPayload: nodemailer.SendMailOptions & IMailerPayload,
) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: "rajpatel158g@gmail.com",
        pass: "vwhrwwvqzgljevli",
      },
    });

    transporter.sendMail(mailerPayload, (error) => {
      if (error) {
        logger.error(error);
        return reject(RESPONSE_MESSAGE.EMAIL_FAILED);
      } else {
        logger.error(`Email sent: ${mailerPayload.RESPONSE_MESSAGE}`);
        return resolve(mailerPayload.RESPONSE_MESSAGE);
      }
    });
  });
}

export default mailSender;
