import styled from "styled-components";
import { colors } from "../../../styles";
import { IoMdCheckmark } from "react-icons/io";

export const Accept = styled.button`
  width: 50px;
  height: 50px;
  margin-left: 20px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid ${colors.green};
  cursor: pointer;
`;

export const IConCheck = styled(IoMdCheckmark)`
  font-size: 18px;
  color: ${colors.green};
`;
