import { PrismaClient } from "@/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";

let prisma: PrismaClient;

const accelerateUrl =
  process.env.PRISMA_ACCELERATE_URL ?? process.env.ACCELERATE_URL;
const connectionString = process.env.POSTGRES_PRISMA_URL;

function createPrismaClient(): PrismaClient {
  if (accelerateUrl) {
    return new PrismaClient({ accelerateUrl });
  }

  if (connectionString) {
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter });
  }

  return new PrismaClient();
}

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };

  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = createPrismaClient();
  }

  prisma = globalWithPrisma.prisma;
}

export default prisma;
