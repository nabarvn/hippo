import next from "next";

const PORT = Number(process.env.PORT) || 3000;

// creates a Next.js application instance with configuration options
export const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
  port: PORT,
});

// responsible for handling HTTP requests for the Next.js application
// crucial for self-hosted next web apps
export const nextHandler = nextApp.getRequestHandler();
