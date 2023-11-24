export const responseCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const responseMessage = {
  OK: "OK",
  CREATED: "Created",
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  SOMETHING_WENT_WRONG: "Something went wrong!",

  EMAIL_SUCCESS: "Email sent successfully",
  EMAIL_FAILED: "Unable to send email",
  INVALID_OTP: "Invalid OTP",
} as const;

export const JWT_EXPIRES_IN = "1d" as const;
