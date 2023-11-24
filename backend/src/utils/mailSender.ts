import { IMailerPayload } from "./../../index.d";
import { responseMessage } from "./../constant/index";
import nodemailer from "nodemailer";
import { logger } from "./logger";

async function mailSender(mailerPayload: nodemailer.SendMailOptions & IMailerPayload) {
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
        return reject(responseMessage.EMAIL_FAILED);
      } else {
        logger.error(`Email sent: ${mailerPayload.responseMessage}`);
        return resolve(mailerPayload.responseMessage);
      }
    });
  });
}

export default mailSender;
