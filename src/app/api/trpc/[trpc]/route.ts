import { appRouter } from "@/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// listens to the forwarded api calls from Express
const handler = (req: Request) => {
  fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,

    // @ts-expect-error context already passed from Express middleware
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
