import * as S from "./styles";
import { useUpdateOrderStatusMutation } from "../../../services/api";
import Order from "../../../models";

export type OnStatusChange = (status: string) => void;

type Props = {
  order: Order;
  onStatusChange: OnStatusChange;
};

const ButtonReject: React.FC<Props> = ({ order, onStatusChange }) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleAccept = async () => {
    try {
      onStatusChange("CANCELLED");

      await updateOrderStatus({
        orderId: order.id,
        status: "CANCELLED",
      }).unwrap();
    } catch (error) {
      console.error("Erro ao atualizar o status do pedido", error);
    }
  };

  return (
    <S.Reject onClick={handleAccept}>
      <S.IConReject />
    </S.Reject>
  );
};

export default ButtonReject;
