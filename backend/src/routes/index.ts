import { router } from '../trpc';
import { signupController, verifyOTPController } from '../controllers/auth/authController';

export const appRouter = router({
  signup: signupController,
  verifyOTP: verifyOTPController,
});

export type AppRouter = typeof appRouter;
