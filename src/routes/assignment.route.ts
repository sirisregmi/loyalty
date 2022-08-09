import { FastifyInstance } from "fastify";
import { assignVechicleSchema } from "../validation";

import * as controllers from "../controllers/assignmentController";

import { IncomingMessage, Server, ServerResponse } from "http";

export default (
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  done: (err?: Error) => void
) => {
  fastify.route({
    method: "GET",
    url: "/",

    // preHandler:"",
    handler: controllers.getAllAssignment,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: assignVechicleSchema,
    // preHandler:"",
    handler: controllers.createAssignment,
  });
  done();
};
