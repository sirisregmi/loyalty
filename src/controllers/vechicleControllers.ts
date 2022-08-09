import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";

import { prisma } from "../helpers/utils";

import { IVechicle } from "../models";

type MyRequest = FastifyRequest<{
  Body: IVechicle;
}>;

export const createVechicle = async (
  request: MyRequest,
  reply: FastifyReply
) => {
  try {
    const { brand, vechicleNumber, ownerId, color } = request.body;

    const vechicle = await prisma.vechicle.create({
      data: {
        brand,
        vechicleNumber,

        ownerId: ownerId,
        lastUpdatedBy: "lastUpdatedBy",
        color,
      },
    });

    reply.status(STANDARD.SUCCESS).send({ data: vechicle });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const getVechicle = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const allUsers = await prisma.vechicle.findMany();
  reply.status(STANDARD.SUCCESS).send({ data: allUsers });
};
