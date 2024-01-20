import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import payload, { Payload } from "payload";
import type { InitOptions } from "payload/config";

// loading environment variables
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

// make use of caching mechanism to avoid unnecessary reinitialization of the client
let cached = (global as any).payload;

// handle when there is no global payload object
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing");
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromName: "Hippo",
        fromAddress: process.env.SENDER_EMAIL_ADDRESS as string,
      },

      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,

      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (error: unknown) {
    cached.promise = null;
    throw error;
  }

  return cached.client;
};
