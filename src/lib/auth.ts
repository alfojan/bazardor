
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { mongoClient, mongoDb } from "@/lib/mongodb";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const auth = betterAuth({
  database: mongodbAdapter(mongoDb, { client: mongoClient }),

  baseURL: getRequiredEnv("BETTER_AUTH_URL"),
  secret: getRequiredEnv("BETTER_AUTH_SECRET"),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  // Allow linking existing accounts with trusted social providers
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },

  socialProviders: {
    google: {
      clientId: getRequiredEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getRequiredEnv("GOOGLE_CLIENT_SECRET"),
    },

    github: {
      clientId: getRequiredEnv("GITHUB_CLIENT_ID"),
      clientSecret: getRequiredEnv("GITHUB_CLIENT_SECRET"),
    },
  },
});
