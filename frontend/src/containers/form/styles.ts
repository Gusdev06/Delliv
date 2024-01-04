import styled from "styled-components";
import { colors } from "../../styles";

export const Container = styled.div`
  max-width: 700px;
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  height: 500px;
  background-color: ${colors.white};
  h1 {
    text-align: center;
    color: ${colors.purple};
  }
`;

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  padding: 90px;
  justify-content: center;
  height: 100%;
`;
