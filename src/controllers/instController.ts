import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";

import { prisma } from "../helpers/utils";

import { IOwner } from "../models";

type MyRequest = FastifyRequest<{
  Body: IOwner;
}>;

export const createOwner = async (request: MyRequest, reply: FastifyReply) => {
  try {
    const {
      firstName,
      lastName,
      email,
      account,
      primaryPhone,
      secondaryPhone,
      avatar,
    } = request.body;

    const post = await prisma.owner.create({
      data: {
        email,
        firstName,
        lastName,
        account,
        primaryPhone,
        secondaryPhone,
        avatar,
      },
    });

    reply.status(STANDARD.SUCCESS).send({ data: post });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const getOwner = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const allUsers = await prisma.owner.findMany();
  reply.status(STANDARD.SUCCESS).send({ data: allUsers });
};
