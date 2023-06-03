import { z } from "zod";

export const logging = {
  API_LOG_LEVEL: z.literal("info").or(z.literal("warn")).or(z.literal("error")),
  LOG_LEVEL: z.literal("info").or(z.literal("warn")).or(z.literal("error")),
};
