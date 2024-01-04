import styled from "styled-components";
import { colors } from "../../styles";

export const Container = styled.div`
  position: fixed;
  top: 0;
  height: 100vh;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 280px;
  z-index: 10;
`;

export const AsideStyle = styled.aside`
  background-color: ${colors.bege};
  padding: 32px 16px;
  height: 100vh;
  border-right: 1px solid ${colors.gray};
  width: 100%; /* Aqui garantimos que o aside use a largura definida no Container */
  h1 {
    text-align: center;
    font-weight: bold;
    color: ${colors.purple};
    margin-bottom: 32px;
  }
`;
