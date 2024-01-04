import { useState } from "react";
import ButtonAcept, { OnStatusChange } from "../../components/buttons/Accept";
import Order from "../../models";
import * as S from "./styles";
import ButtonReject from "../../components/buttons/Reject";
import ButtonReady from "../../components/buttons/ready";
import ButtonDispatch from "../../components/buttons/dispatch";
import ButtonDelivered from "../../components/buttons/delivered";

import { useUpdateOrderStatusMutation } from "../../services/api";

type Props = {
  order: Order;
};

const OrderCard = ({ order }: Props) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [orderStatus, setOrderStatus] = useState(order.status);

  const handleStatusChange: OnStatusChange = async (newStatus) => {
    try {
      await updateOrderStatus({
        orderId: order.id,
        status: newStatus,
      }).unwrap();

      setOrderStatus(newStatus);
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  if (orderStatus === "CANCELLED" || orderStatus === "DELIVERED") {
    return null;
  }

  return (
    <S.Card>
      <S.Header>
        <p>Order #{order.id.slice(0, 6)}</p>

        <S.StatusText status={orderStatus}>{orderStatus}</S.StatusText>
      </S.Header>
      <S.Itens>
        {order.items.map((item) => (
          <S.CardItens key={item.id}>
            <S.FoodImg src="https://i.imgur.com/DKpNTYn.jpg" alt="" />
            <div>
              <p>{item.product.name}</p>
              <S.Description>
                {item.product.description.slice(0, 50)}
              </S.Description>

              <S.PriceAndQuantity>
                <p> R${item.price.toFixed(2)}</p>
                <p>Qty: {item.quantity}</p>
              </S.PriceAndQuantity>
            </div>
          </S.CardItens>
        ))}
      </S.Itens>
      <S.Details>
        <S.User>
          <S.Total> R${order.total.toFixed(2)}</S.Total>
          <p> {order.user.name} </p>
          <p> {order.user.address.slice(0, 19)} </p>
          <p>08746-170</p>
        </S.User>
        <div>
          {orderStatus === "PENDING" ? (
            <>
              <ButtonAcept order={order} onStatusChange={handleStatusChange} />
              <ButtonReject order={order} onStatusChange={handleStatusChange} />
            </>
          ) : orderStatus === "PREPARING" ? (
            <>
              <ButtonReady order={order} onStatusChange={handleStatusChange} />
              <ButtonDispatch
                order={order}
                onStatusChange={handleStatusChange}
              />
            </>
          ) : orderStatus === "READY" ? (
            <>
              <ButtonDelivered
                order={order}
                onStatusChange={handleStatusChange}
              />
              <ButtonDispatch
                order={order}
                onStatusChange={handleStatusChange}
              />
            </>
          ) : orderStatus === "DELIVERING" ? (
            <>
              <ButtonDelivered
                order={order}
                onStatusChange={handleStatusChange}
              />
            </>
          ) : null}
        </div>
      </S.Details>
    </S.Card>
  );
};

export default OrderCard;
