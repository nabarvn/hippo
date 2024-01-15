import { router } from "./trpc";

export const appRouter = router({
  // typesafe api endpoints go here
});

export type AppRouter = typeof appRouter;
