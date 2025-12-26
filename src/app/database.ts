import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { logger } from "./logging";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL is not set");

const adapter = new PrismaMariaDb(dbUrl);

export const prismaClient = new PrismaClient({
  adapter,
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "error" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
  ],
});

prismaClient.$on("error", (e) => logger.error(e));
prismaClient.$on("info", (e) => logger.error(e));
prismaClient.$on("query", (e) => logger.error(e));
prismaClient.$on("warn", (e) => logger.error(e));
