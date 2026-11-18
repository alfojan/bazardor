
import dns from "node:dns";
import { MongoClient } from "mongodb";

// Use Google and Cloudflare DNS for MongoDB Atlas
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing required environment variable: MONGODB_URI");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

const mongoClient =
  globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

export { mongoClient };
export const mongoDb = mongoClient.db("bazardor");
