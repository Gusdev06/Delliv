import styled from "styled-components";
import { colors } from "../../styles";
import { IoStarSharp } from "react-icons/io5";

type StatusTextProps = {
  status: string;
};

export const Avaliation = styled(IoStarSharp)`
  color: ${colors.yellow};
  font-size: 20px;
`;

export const Card = styled.div<StatusTextProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 411px;
  max-width: 340px;
  background-color: ${(props) =>
    props.status === "DELIVERED"
      ? `${colors.greenLight}`
      : props.status === "CANCELLED"
      ? `${colors.redLight}`
      : `${colors.white}`};
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${colors.gray};
  margin-left: 30px;
  margin-bottom: 25px;
  color: ${(props) =>
    props.status === "DELIVERED"
      ? `${colors.grayDark}`
      : props.status === "CANCELLED"
      ? `${colors.white}`
      : `${colors.grayDark}`};
  box-sizing: border-box;
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: ${colors.black};
    font-size: 14px;
    font-weight: 700;
    margin-top: 8px;
  }
`;

export const Itens = styled.div`
  margin-top: 20px;
  max-height: 240px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Details = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FoodImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const CardItens = styled.li`
  display: flex;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.gray};
`;

export const Description = styled.p<StatusTextProps>`
  padding-top: 4px;
  color: ${(props) =>
    props.status === "DELIVERED"
      ? `${colors.grayDark}`
      : props.status === "CANCELLED"
      ? `${colors.white}`
      : `${colors.grayDark}`};
  padding-bottom: 10px;
`;

export const PriceAndQuantity = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
`;

export const Total = styled.h2<StatusTextProps>`
  color: ${(props) =>
    props.status === "DELIVERED"
      ? `${colors.green}`
      : props.status === "CANCELLED"
      ? `${colors.green}`
      : `${colors.green}`};
  font-size: 14px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StatusText = styled.p<StatusTextProps>`
  color: ${(props) =>
    props.status === "PREPARING"
      ? `${colors.green}`
      : props.status === "CANCELLED"
      ? `${colors.red}`
      : props.status === "DELIVERED"
      ? `${colors.green}`
      : props.status === "READY"
      ? `${colors.green}`
      : props.status === "DELIVERING"
      ? `${colors.yellow}`
      : `${colors.grayDark}`};
`;
