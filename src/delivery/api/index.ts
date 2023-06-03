import ExampleHandlerV1 from "delivery/api/handler/private/v1/User";
import { FastifyInstance, FastifyReply } from "driver/http/fastify";

const defineMiddlewares = (router: FastifyInstance) => {
  router.register(import("@fastify/compress"), { global: false });
};

const defineHandlers = (router: FastifyInstance) => {
  router.register(
    async (fastify, _, done) => {
      await ExampleHandlerV1(fastify);
      done();
    },
    { prefix: "/api/private/v1" },
  );
};

const init = (router: FastifyInstance) => {
  // Define middlewares & handlers
  router.get("/health", function mainHandler(_, reply: FastifyReply) {
    reply.header("Content-Type", "application/json; charset=utf-8").send("ok");
  });

  defineMiddlewares(router);
  defineHandlers(router);
};

export default { init };
