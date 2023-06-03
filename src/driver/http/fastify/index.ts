import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteHandlerMethod,
} from "fastify";

import { environment } from "app/environment";
import { transport } from "app/logger";

export { FastifyRequest, FastifyReply, FastifyInstance, RouteHandlerMethod };

let router: FastifyInstance;

/**
 * Create a new app express and http server
 */
export const create = async () => {
  if (router) {
    throw new Error("http server already created");
  }

  router = fastify({
    logger: {
      level: environment.API_LOG_LEVEL,
      ...transport,
    },
  });

  return { router };
};

/**
 * Return a existing app express
 * @returns
 */
export const init = () => {
  if (!router) {
    throw new Error("http server not created");
  }

  return router;
};

/**
 * Return a existing app express and http server
 * @returns
 */
export const initWithServer = () => {
  if (!router) {
    throw new Error("http server not created");
  }

  return { router };
};

export default { create, init, initWithServer };
