import * as S from "./styles";
import { useUpdateOrderStatusMutation } from "../../../services/api";
import Order from "../../../models";
import { toast } from "react-toastify";

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
      toast.success(
        `"Status do pedido #${order.id.slice(0, 6)} alterado para: DELIVERED"`,
        {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
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
