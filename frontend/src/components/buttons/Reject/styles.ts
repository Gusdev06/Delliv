import styled from "styled-components";
import { colors } from "../../../styles";
import { IoMdClose } from "react-icons/io";

export const Reject = styled.button`
  width: 50px;
  height: 50px;
  margin-left: 20px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid ${colors.red};
  cursor: pointer;
`;

export const IConReject = styled(IoMdClose)`
  font-size: 18px;
  color: red;
`;
