import { ZodObject } from "zod";

import { FastifyReply, FastifyRequest } from "driver/http/fastify";

export const inputValidator = <T extends ZodObject<any>>({
  req,
  res,
  queryParamsSchema,
}: {
  req: FastifyRequest;
  res: FastifyReply;
  queryParamsSchema: T;
}) => {
  const parsedQueyParams = queryParamsSchema.safeParse(req.query);

  if (!parsedQueyParams.success) {
    return res
      .code(400)
      .send({ error: "Invalid query parameters", issues: parsedQueyParams.error.issues });
  }

  return { queryParams: parsedQueyParams };
};
