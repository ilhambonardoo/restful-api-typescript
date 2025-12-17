import { PrismaClient } from "../generated/prisma/client";
import { logger } from "./logging";

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prismaClient.$on("error", (e) => {
  logger.error(e);
});

prismaClient.$on("info", (e) => {
  logger.error(e);
});

prismaClient.$on("query", (e) => {
  logger.error(e);
});

prismaClient.$on("warn", (e) => {
  logger.error(e);
});
