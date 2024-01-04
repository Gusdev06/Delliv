import styled from "styled-components";
import { colors } from "../../../styles";

export const ButtonStyle = styled.button`
  height: 40px;
  border: none;
  width: 100%;
  font-size: 14px;
  color: #333;
  margin-bottom: 40px;
  background-color: ${colors.purple};
  color: ${colors.white};
  cursor: pointer;
  border-radius: 4px;
`;
