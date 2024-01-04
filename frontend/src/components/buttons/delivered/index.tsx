import * as S from "./styles";
import { useUpdateOrderStatusMutation } from "../../../services/api";
import Order from "../../../models";

export type OnStatusChange = (status: string) => void;

type Props = {
  order: Order;
  onStatusChange: OnStatusChange;
};

const ButtonDelivered: React.FC<Props> = ({ order, onStatusChange }) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleAccept = async () => {
    try {
      onStatusChange("DELIVERED");

      await updateOrderStatus({
        orderId: order.id,
        status: "DELIVERED",
      }).unwrap();
    } catch (error) {
      console.error("Erro ao atualizar o status do pedido", error);
    }
  };

  return (
    <S.Delivered onClick={handleAccept}>
      <span>DELIVERED</span>
    </S.Delivered>
  );
};

export default ButtonDelivered;
