import * as S from "./styles";
import { useUpdateOrderStatusMutation } from "../../../services/api";
import Order from "../../../models";
import { toast } from "react-toastify";

export type OnStatusChange = (status: string) => void;

type Props = {
  order: Order;
  onStatusChange: OnStatusChange;
};

const ButtonReady: React.FC<Props> = ({ order, onStatusChange }) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleAccept = async () => {
    try {
      onStatusChange("READY");

      await updateOrderStatus({
        orderId: order.id,
        status: "READY",
      }).unwrap();
      toast.success(
        `"Status do pedido #${order.id.slice(0, 6)} alterado para: READY"`,
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

  return <S.Ready onClick={handleAccept}>READY</S.Ready>;
};

export default ButtonReady;
