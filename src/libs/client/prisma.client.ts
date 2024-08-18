import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

declare global {
  var prismaClient: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient();
} else {
  if (!global.prismaClient) {
    global.prismaClient = new PrismaClient();
  }
  prismaClient = global.prismaClient;
}

export default prismaClient;
