import { BadRequestException } from "@nestjs/common";
import PrismaService  from "../prisma.service";
import { generateHTTPErrorFromPrismaError, isPrismaError } from "./prisma_error.format";
import { formatAxiosError } from "./axios";
import { isAxiosError } from "axios";

export function errorFormat(error: any) {
    if (isPrismaError(error)) {
      throw new BadRequestException(
        generateHTTPErrorFromPrismaError(error),
      );
    }
    if (isAxiosError(error)) {
        formatAxiosError(error)
    }
    else if (error.message) {
      throw new BadRequestException(error.message)
    }
    throw error;
  }