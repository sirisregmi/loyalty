import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";

import { prisma } from "../helpers/utils";

import { IAssignment } from "../models";

type DriverRequest = FastifyRequest<{
  Body: IAssignment;
}>;

type OwnerQueryRequest = FastifyRequest<{
  Params: { ownerId: number };
}>;

export const createAssignment = async (
  request: DriverRequest,
  reply: FastifyReply
) => {
  try {
    const { bookingReference, driverAssigned, vechicleId, ownerId } =
      request.body;

    const driver = await prisma.assignment.create({
      data: {
        bookingReference,
        driverAssigned,
        vechicleId,
        ownerId,
      },
    });

    reply.status(STANDARD.SUCCESS).send({ data: driver });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const getAllAssignment = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const allAssignment = await prisma.assignment.findMany();
    reply.status(STANDARD.SUCCESS).send({ data: allAssignment });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const getAllAssignmentByOwner = async (
  request: OwnerQueryRequest,
  reply: FastifyReply
) => {
  try {
    const { ownerId } = request.params;

    //Convert the Owner ID to Integer using + sign
    const allAssignment = await prisma.driver.findMany({
      where: { ownerId: +ownerId },
    });

    reply.status(STANDARD.SUCCESS).send({ data: allAssignment });
  } catch (e) {
    handleServerError(reply, e);
  }
};
