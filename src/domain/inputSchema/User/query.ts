import * as z from "zod";

export const userQuerySchema = z.object({
  perPage: z.number().min(1).max(10),
  page: z.number().min(1),
});
