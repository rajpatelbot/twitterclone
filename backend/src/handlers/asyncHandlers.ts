import { responseCode, responseMessage } from "../constant";
import { logger } from "../utils/logger";

type HandlerFunction<T> = () => Promise<T>;

export const asyncHandler = async <T>(handler: HandlerFunction<T>) => {
  try {
    return await handler();
  } catch (error) {
    logger.error(error);
    return {
      statusCode: responseCode.INTERNAL_SERVER_ERROR,
      message: error || responseMessage.INTERNAL_SERVER_ERROR,
    };
  }
};
