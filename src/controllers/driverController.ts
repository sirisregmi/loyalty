import { FastifyReply, FastifyRequest } from "fastify";
import { STANDARD } from "../helpers/constants";
import { handleServerError } from "../helpers/errors";

import { prisma } from "../helpers/utils";

import { IDriver } from "../models";

type DriverRequest = FastifyRequest<{
  Body: IDriver;
}>;

type DriversByOwner = FastifyRequest<{
  Params: { ownerId: number };
}>;

export const createDriver = async (
  request: DriverRequest,
  reply: FastifyReply
) => {
  try {
    const {
      firstName,
      lastName,
      licenseNumber,
      primaryPhoneNum,
      secondaryPhoneNum,
      ownerId,
    } = request.body;

    const driver = await prisma.driver.create({
      data: {
        firstName,
        lastName,
        licenseNumber,
        primaryPhoneNum,
        secondaryPhoneNum,
        ownerId,
      },
    });

    reply.status(STANDARD.SUCCESS).send({ data: driver });
  } catch (e) {
    handleServerError(reply, e);
  }
};

export const getDriverByOwner = async (
  request: DriversByOwner,
  reply: FastifyReply
) => {
  const { ownerId } = request.params;

  //Convert the Owner ID to Integer using + sign
  const allDrivers = await prisma.driver.findMany({
    where: { ownerId: +ownerId },
  });
  reply.status(STANDARD.SUCCESS).send({ data: allDrivers });
};

export const getDriver = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const allDrivers = await prisma.driver.findMany();
  reply.status(STANDARD.SUCCESS).send({ data: allDrivers });
};

export const getAllDrivers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const allDrivers = await prisma.driver.findMany();
  reply.status(STANDARD.SUCCESS).send({ data: allDrivers });
};
