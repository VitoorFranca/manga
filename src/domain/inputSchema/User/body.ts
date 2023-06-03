import * as z from "zod";

export const userBodySchema = z.object({
    name: z.string(),
});
