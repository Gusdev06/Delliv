import styled from "styled-components";
import { HiOutlineHome } from "react-icons/hi2";
import { MdReplay } from "react-icons/md";
import { MdOutlineFastfood } from "react-icons/md";

export const ProductIcon = styled(MdOutlineFastfood)`
  margin-right: 16px;
`;

export const OrderHistoryIcon = styled(MdReplay)`
  margin-right: 16px;
`;

export const HomeIcon = styled(HiOutlineHome)`
  margin-right: 16px;
`;

export const Container = styled.div`
  padding-top: 80px;
`;

export const NavList = styled.ul``;

export const NavItem = styled.li`
  display: flex;
  align-items: center;

  margin-bottom: 64px;
  cursor: pointer;

  a {
    text-decoration: none;
    color: #000;
  }
`;
