import { router } from "../trpc";
import { signupController } from "../controllers/auth/authController";

export const appRouter = router({
  signup: signupController,
});

export type AppRouter = typeof appRouter;
