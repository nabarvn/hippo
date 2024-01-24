import { z } from "zod";
import { authRouter } from "./routers/auth";
import { router, publicProcedure } from "./trpc";
import { getPayloadClient } from "../payload-client";
import { QueryValidator } from "../lib/validators/query";

export const appRouter = router({
  auth: authRouter,

  getProducts: publicProcedure
    .input(
      z.object({
        query: QueryValidator,
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const payload = await getPayloadClient();

      // for keys with object-type value
      // these options will go in the `where` clause
      const parsedQueryOpts: Record<string, { equals: string }> = {};

      // adapting the options to fit our cms format
      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;
