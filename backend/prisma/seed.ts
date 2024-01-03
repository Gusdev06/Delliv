import { PrismaClient } from "@prisma/client";

import { seedProduct } from "./seeds/product";
import { seedUser } from "./seeds/user";
import { seedOrder } from "./seeds/seedOrder";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const main = async () => {
  await seedProduct(prisma);
  await seedUser(prisma);
  await seedOrder(prisma);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Prisma was disconnected");
  });
