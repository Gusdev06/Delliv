import * as S from "./styles";
import { useUpdateOrderStatusMutation } from "../../../services/api";
import Order from "../../../models";
import { toast } from "react-toastify";

export type OnStatusChange = (status: string) => void;

type Props = {
  order: Order;
  onStatusChange: OnStatusChange;
};

const ButtonAcept: React.FC<Props> = ({ order, onStatusChange, ...props }) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleAccept = async () => {
    try {
      onStatusChange("PREPARING");

      await updateOrderStatus({
        orderId: order.id,
        status: "PREPARING",
      }).unwrap();
      toast.success(
        `"Status do pedido #${order.id.slice(0, 6)} alterado para: PREPARING"`,
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
    <S.Accept onClick={handleAccept} {...props}>
      <S.IConCheck />
    </S.Accept>
  );
};

export default ButtonAcept;
