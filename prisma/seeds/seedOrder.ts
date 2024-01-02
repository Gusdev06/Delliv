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

  // Itens do pedido
  const orderItems = [
    {
      productId: products[0].id,
      quantity: 2,
      price: products[0].price,
    },
    {
      productId: products[1].id,
      quantity: 1,
      price: products[1].price,
    },
  ];

  // Calculando o total do pedido
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
};
