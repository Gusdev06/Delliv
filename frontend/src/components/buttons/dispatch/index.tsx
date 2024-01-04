import * as S from "./styles";
import { useUpdateOrderStatusMutation } from "../../../services/api";
import Order from "../../../models";

export type OnStatusChange = (status: string) => void;

type Props = {
  order: Order;
  onStatusChange: OnStatusChange;
};

const ButtonDispatch: React.FC<Props> = ({ order, onStatusChange }) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleAccept = async () => {
    try {
      onStatusChange("DELIVERING");

      await updateOrderStatus({
        orderId: order.id,
        status: "DELIVERING",
      }).unwrap();
    } catch (error) {
      console.error("Erro ao atualizar o status do pedido", error);
    }
  };

  return (
    <S.Dispatch onClick={handleAccept}>
      <strong>DISPATCH</strong>
    </S.Dispatch>
  );
};

export default ButtonDispatch;
