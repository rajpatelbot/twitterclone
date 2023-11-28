import { router } from '../trpc';
import { loginController, signupController, verifyOTPController } from '../controllers/auth/authController';

export const appRouter = router({
  signup: signupController,
  verifyOTP: verifyOTPController,
  login: loginController,
});

export type AppRouter = typeof appRouter;
