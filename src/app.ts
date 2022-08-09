import { fastify, FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import fastifySwagger from "@fastify/swagger";

//import postRouter from "./routes/merchant.route";

import vechicleRoute from "./routes/vechicle.route";
import ownerRoute from "./routes/owner.route";
import driverRoute from "./routes/driver.route";
import assignmentRoute from "./routes/assignment.route";

import pino from "pino";
import { utils } from "./helpers/utils";

const server = fastify({
  logger: pino({ level: "info" }),
});

// register plugin below:
export default class App {
  /**
   * Application server instance.
   *
   * @private
   * @type {fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>}
   * @memberof App
   */
  private fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>;
  private port: number;

  /*private log = pino(
    pino.destination({
      dest: "/Users/siris/Documents/fastify/travel/logs/logs.out",
      sync: false,
    })
  );
  */

  constructor() {
    this.port = 8080;
    this.fastify = fastify({
      ignoreTrailingSlash: true,
      //  logger: this.log,
    });

    this.config();
  }

  /**
   * All Routes and Configs to be processed here
   */

  private config() {
    /**
     * Register Logger
     * Register Swagger
     * Register Routes Individually
     */

    this.fastify.register(vechicleRoute, {
      prefix: "/api/vechicle",
    });

    this.fastify.register(ownerRoute, {
      prefix: "/api/owner",
    });
    this.fastify.register(driverRoute, {
      prefix: "/api/driver",
    });

    this.fastify.register(assignmentRoute, {
      prefix: "/api/assignment",
    });

    //this.fastify.register(vechicleRoute, { prefix: "/api/vechicle" });

    this.fastify.register(fastifySwagger, {
      routePrefix: "/docs",
      swagger: {
        info: {
          title: "Test swagger",
          description: "Testing the Fastify swagger API",
          version: "0.1.0",
        },
      },
      exposeRoute: true,
    });

    this.fastify.get("/health-check", async (request, reply) => {
      try {
        // await utils.healthCheck();

        await utils.healthCheck();
        //reply.status(200).send();
      } catch (e) {
        reply.status(500).send();
      }
    });
  }
  /**
   *  async start
   */
  public async start() {
    try {
      await this.fastify.listen({ port: this.port });
    } catch (err) {
      process.on("uncaughtException", console.error);

      process.on("unhandledRejection", console.error);
      process.exit(1);
    }
  }
}
