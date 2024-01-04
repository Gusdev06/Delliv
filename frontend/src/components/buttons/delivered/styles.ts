import styled from "styled-components";
import { colors } from "../../../styles";

export const Delivered = styled.button`
  width: 70px;
  height: 50px;
  text-align: center;
  font-size: 10px;
  margin-left: 10px;
  color: ${colors.green};
  border-radius: 10px;
  border: 1px solid ${colors.green};

  cursor: pointer;

  span {
    font-weight: bold;
  }
`;
