import { PrismaClient } from "@prisma/client";

export const seedOrder = async (prisma: PrismaClient) => {
  const existingOrders = await prisma.order.findMany();
  if (existingOrders.length > 0) {
    await prisma.order.deleteMany();
  }

  const users = await prisma.user.findMany();
  const products = await prisma.product.findMany();

  if (users.length === 0 || products.length === 0) {
    throw new Error("Usuários ou produtos não encontrados para criar pedidos.");
  }

  const orderItems = [
    {
      productId: products[0].id,
      quantity: 2,
      price: products[0].price,
    },
    {
      productId: products[1].id,
      quantity: 3,
      price: products[1].price,
    },
    {
      productId: products[2].id,
      quantity: 1,
      price: products[2].price,
    },

    {
      productId: products[3].id,
      quantity: 1,
      price: products[3].price,
    },

    {
      productId: products[4].id,
      quantity: 4,
      price: products[4].price,
    },

    {
      productId: products[5].id,
      quantity: 1,
      price: products[5].price,
    },

    {
      productId: products[6].id,
      quantity: 1,
      price: products[6].price,
    },

    {
      productId: products[7].id,
      quantity: 1,
      price: products[7].price,
    },

    {
      productId: products[8].id,
      quantity: 1,
      price: products[8].price,
    },
  ];

  const total = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await prisma.order.create({
    data: {
      userId: users[0].id,
      status: "PENDING",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[0].id,
      status: "PENDING",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[1].id,
      status: "PREPARING",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[0].id,
      status: "PREPARING",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[0].id,
      status: "READY",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[1].id,
      status: "READY",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[0].id,
      status: "DELIVERED",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[0].id,
      status: "DELIVERED",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[1].id,
      status: "DELIVERING",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[0].id,
      status: "DELIVERING",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[0].id,
      status: "CANCELLED",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[1].id,
      status: "CANCELLED",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[0].id,
      status: "PENDING",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[0].id,
      status: "PENDING",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: users[1].id,
      status: "PENDING",
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: {
        create: orderItems.map((item) => ({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
    },
  });
};
