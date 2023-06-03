import { z } from "zod";

export const databaseConfig = {
  DATABASE_URL: z.string(),
  DATABASE_URL_READ_REPLICA: z.string(),
};
