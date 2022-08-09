import { FastifyInstance } from "fastify";
import { createDriverSchema, driverByOwnerSchema } from "../validation";

import * as controllers from "../controllers/driverController";

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
    handler: controllers.getAllDrivers,
  });

  fastify.route({
    method: "GET",
    url: "/byOwner/:ownerId",

    // preHandler:"",
    handler: controllers.getDriverByOwner,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: createDriverSchema,
    // preHandler:"",
    handler: controllers.createDriver,
  });
  done();
};
