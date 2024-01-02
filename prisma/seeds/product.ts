import { PrismaClient } from "@prisma/client";

export const seedProduct = async (prisma: PrismaClient) => {
  const orderItens = await prisma.orderItem.findMany();
  if (orderItens.length > 0) {
    await prisma.orderItem.deleteMany();
  }
  const productsP = await prisma.product.findMany();
  if (productsP.length > 0) {
    await prisma.product.deleteMany();
  }

  await prisma.product.create({
    data: {
      name: "X Bacon",
      description: "pao, carne, queijo, bacon, salada",
      category: "Lanches",
      price: 15.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.product.create({
    data: {
      name: "X Egg",
      description: "pao, carne, queijo, ovo, salada",
      category: "Lanches",
      price: 10.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.product.create({
    data: {
      name: "X Egg Bacon",
      description: "pao, carne, queijo, ovo, bacon, salada",
      category: "Lanches",
      price: 20.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.product.create({
    data: {
      name: "X Tudo",
      description: "pao, carne, queijo, ovo, bacon, salada, presunto, frango",
      category: "Lanches",
      price: 25.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.product.create({
    data: {
      name: "Coca Cola",
      description: "Refrigerante de cola",
      category: "Bebidas",
      price: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.product.create({
    data: {
      name: "Guarana",
      description: "Refrigerante de guarana",
      category: "Bebidas",
      price: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.product.create({
    data: {
      name: "Fanta",
      description: "Refrigerante de laranja",
      category: "Bebidas",
      price: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};
