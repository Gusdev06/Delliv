import * as S from "./styles";
import { useUpdateOrderStatusMutation } from "../../../services/api";
import Order from "../../../models";

export type OnStatusChange = (status: string) => void;

type Props = {
  order: Order;
  onStatusChange: OnStatusChange;
};

const ButtonAcept: React.FC<Props> = ({ order, onStatusChange }) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleAccept = async () => {
    try {
      onStatusChange("PREPARING");

      await updateOrderStatus({
        orderId: order.id,
        status: "PREPARING",
      }).unwrap();
    } catch (error) {
      console.error("Erro ao atualizar o status do pedido", error);
    }
  };

  return (
    <S.Accept onClick={handleAccept}>
      <S.IConCheck />
    </S.Accept>
  );
};

export default ButtonAcept;
