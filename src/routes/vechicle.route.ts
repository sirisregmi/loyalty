import { FastifyInstance } from "fastify";
import { createVechicleSchema } from "../validation";
import * as controllers from "../controllers/vechicleControllers";

import { IncomingMessage, Server, ServerResponse } from "http";

export default (
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  done: (err?: Error) => void
) => {
  fastify.route({
    method: "GET",
    url: "/",
    //schema: createVechicleSchema,
    // preHandler:"",
    handler: controllers.getVechicle,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: createVechicleSchema,
    // preHandler:"",
    handler: controllers.createVechicle,
  });
  done();
};
