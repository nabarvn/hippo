import express from "express";
import { appRouter } from "@/trpc";
import { getPayloadClient } from "./payload-client";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// making the requests/responses available in Next.js wherever we handle the api calls from tRPC
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });

  // forward the client requests to tRPC in Next.js
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,

      // allows us to take the requests/responses that we get in Express and attach them to context for using in Next.js
      createContext,
    })
  );

  // adding a middleware to the Express app
  // this setup is typical for integrating Express with Next.js
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started...");

    // starting the Express server to listen on the specified port
    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
