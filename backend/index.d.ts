export interface IMailerPayload {
  from: string;
  to: string;
  subject: string;
  html: string;
  responseMessage: string;
}
