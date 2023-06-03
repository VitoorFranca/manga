import { UserUseCase, init as InitIndiceUseCase } from "useCase/User";

import { userBodySchema } from "domain/inputSchema/User/body";
import { FastifyRequest, FastifyReply, FastifyInstance } from "driver/http/fastify";

export class UserHandler {
  private userUseCase: UserUseCase;

  constructor({ router, userUseCase }: { router: FastifyInstance; userUseCase: UserUseCase }) {
    this.userUseCase = userUseCase;

    router.post("/users", this.createUser);
  }

  public createUser = async (req: FastifyRequest, res: FastifyReply) => {
    const parsedPayload = userBodySchema.safeParse(req.query);

    if (!parsedPayload.success) {
      return res.code(400).send(parsedPayload.error);
    }

    const response = await this.userUseCase.create(parsedPayload.data as any);
    return res.send(response);
  };
}

export const init = (router: FastifyInstance) => {
  const userUseCase = InitIndiceUseCase();

  return new UserHandler({ router, userUseCase });
};

export default init;
