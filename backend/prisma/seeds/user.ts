import { PrismaClient } from "@prisma/client";
import bcrypt = require("bcrypt");

export const seedUser = async (prisma: PrismaClient) => {
  const ordersItens = await prisma.orderItem.findMany();
  if (ordersItens.length > 0) {
    await prisma.orderItem.deleteMany();
  }

  const order = await prisma.order.findMany();

  if (order.length > 0) {
    await prisma.order.deleteMany();
  }
  const existingUsers = await prisma.user.findMany();
  if (existingUsers.length > 0) {
    await prisma.user.deleteMany();
  }

  const hashedPasswordUser = await bcrypt.hash("Delliv123@", 10);
  const hashedPasswordAdmin = await bcrypt.hash("Delliv123@", 10);

  await prisma.user.create({
    data: {
      email: "usuario@delliv.com",
      name: "Nome do Usuário",
      password: hashedPasswordUser,
      role: "USER",
      address: "Rua do Usuário, 123",
      createdAt: new Date(),
    },
  });

  await prisma.user.create({
    data: {
      email: "admin@delliv.com",
      name: "Nome do Admin",
      password: hashedPasswordAdmin,
      role: "ADMIN",
      address: "Rua do admin, 123",
      createdAt: new Date(),
    },
  });
};
