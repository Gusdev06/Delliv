/* eslint-disable no-constant-condition */
import Order from "../../models";
import * as S from "./styles";

import formatDate from "../../utils/dateFormat";

type Props = {
  order: Order;
};

const OrderCardHistory = ({ order }: Props) => {
  return (
    <S.Card status={order.status}>
      <S.Header>
        <p>Order #{order.id.slice(0, 6)}</p>

        <S.StatusText status={order.status}>{order.status}</S.StatusText>
      </S.Header>
      <S.Itens>
        {order.items.map((item) => (
          <S.CardItens key={item.id}>
            <S.FoodImg src="https://i.imgur.com/DKpNTYn.jpg" alt="" />
            <div>
              <p>{item.product.name}</p>
              <S.Description status={order.status}>
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
          <S.Total status={order.status}> R${order.total.toFixed(2)}</S.Total>
          {order.status === "DELIVERED" || order.status === "CANCELLED" ? (
            <>
              <p> {order.user.name} </p>
              <p> {formatDate(order.created_at)}</p>
            </>
          ) : (
            <>
              <p> {order.user.name} </p>
              <p> {order.user.address.slice(0, 19)} </p>
              <p>08746-170</p>
            </>
          )}
        </S.User>
        <div>
          {order.status === "DELIVERED" && (
            <>
              <S.Avaliation />
              <S.Avaliation />
              <S.Avaliation />
              <S.Avaliation />
              <S.Avaliation />
            </>
          )}
        </div>
      </S.Details>
    </S.Card>
  );
};

export default OrderCardHistory;
