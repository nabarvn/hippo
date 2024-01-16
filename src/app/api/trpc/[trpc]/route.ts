import { appRouter } from "@/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// listens to the forwarded api calls from Express
const handler = (req: Request) => {
  fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
