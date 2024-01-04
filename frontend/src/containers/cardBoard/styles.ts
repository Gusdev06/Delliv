import styled from "styled-components";
import { colors } from "../../styles";

export const CardBoardContainer = styled.div`
  display: flex;
`;

export const CardBoardColumn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  h3 {
    margin-bottom: 20px;
    color: ${colors.grayDark};
  }
`;
