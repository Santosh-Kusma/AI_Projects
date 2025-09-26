import "dotenv/config";
import { PgVector } from "@mastra/pg";

// handle ts warning
export const pgConnection = process.env.PG_CONNECTION;
if (!pgConnection) throw new Error("PG_CONNECTION is missing in .env");

// connect to PostgreSQL with pgvector
export const vectorStore = new PgVector({
  connectionString: pgConnection,
  schemaName: "public", // optional
});

