import { FastifyInstance } from "fastify";
import { createOwnerSchema } from "../validation";

import { createOwner, getOwner } from "../controllers";

import { IncomingMessage, Server, ServerResponse } from "http";

export default (
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  done: (err?: Error) => void
) => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: createOwnerSchema,
    // preHandler:"",
    handler: createOwner,
  });

  fastify.route({
    method: "GET",
    url: "/",
    // preHandler:"",
    handler: getOwner,
  });

  done();
};
