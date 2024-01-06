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

  const hashedPasswordUser = await bcrypt.hash("123456", 10);
  const hashedPasswordAdmin = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      email: "usuario@delliv.com",
      name: "Gustavo Gomes",
      password: hashedPasswordUser,
      role: "USER",
      address: "Rua João Urizzi	Parque Olimpico	Mogi das Cruzes/SP	08746-170",
      createdAt: new Date(),
    },
  });

  await prisma.user.create({
    data: {
      email: "admin@delliv.com",
      name: "Gustavo Admin",
      password: hashedPasswordAdmin,
      role: "ADMIN",
      address: "Rua do admin, 123",
      createdAt: new Date(),
    },
  });
};
