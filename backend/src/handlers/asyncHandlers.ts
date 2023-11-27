import { RESPONSE_CODE, RESPONSE_MESSAGE } from "../constant";
import { logger } from "../utils/logger";

type HandlerFunction<T> = () => Promise<T>;

export const asyncHandler = async <T>(handler: HandlerFunction<T>) => {
  try {
    return await handler();
  } catch (error) {
    logger.error(error);
    return {
      statusCode: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      message: error || RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    };
  }
};
