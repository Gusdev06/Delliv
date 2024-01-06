import * as S from "./styles";
import { useUpdateOrderStatusMutation } from "../../../services/api";
import Order from "../../../models";
import { toast } from "react-toastify";

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
      toast.warn(
        `"Status do pedido #${order.id.slice(0, 6)} alterado para: DELIVERING"`,
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
    <S.Dispatch onClick={handleAccept}>
      <strong>DISPATCH</strong>
    </S.Dispatch>
  );
};

export default ButtonDispatch;
