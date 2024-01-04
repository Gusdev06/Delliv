import { colors } from "../../styles";

type Props = {
  status: string;
};

const Status = ({ status }: Props) => {
  let color;
  switch (status) {
    case "PENDING":
      color = `${colors.grayDark}`;
      break;
    case "READY":
      color = `${colors.green}`;
      break;
    case "DELIVERED":
      color = `${colors.green}`;
      break;
    case "CANCELLED":
      color = `${colors.red}`;
      break;
    case "DELIVERING":
      color = `${colors.yellow}`;
      break;
    default:
      color = "grey";
  }

  return <span style={{ color: color }}>{status}</span>;
};

export default Status;
