import { Prisma } from "@prisma/client";

export function isPrismaError(e: Error): boolean {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError ||
      e instanceof Prisma.PrismaClientUnknownRequestError ||
      e instanceof Prisma.PrismaClientUnknownRequestError ||
      e instanceof Prisma.PrismaClientRustPanicError ||
      e instanceof Prisma.PrismaClientInitializationError||
      e instanceof Prisma.PrismaClientValidationError
    ) {
      return true;
    }
    return false;
  }

 export function generateHTTPErrorFromPrismaError(error: any): string {
    if (!isPrismaError(error)) {
        return
    }
    let errMsg = '';
    if (error instanceof Prisma.PrismaClientValidationError) {
      return error.message
    }
    if (error.code) {
    switch (error.code) {
      case 'P2002':
        errMsg=`${error.meta.target} already exists.${error.message}`
        break;
      
      case 'P2025':
        errMsg=`${error.meta.cause}`

    case 'P2031':
        errMsg=`db connection issues`
      default:
        errMsg=`${error}`
        break;
    }
    }
    return errMsg;
  }