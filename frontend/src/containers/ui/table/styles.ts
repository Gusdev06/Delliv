import styled from "styled-components";
import Table from "@mui/material/Table";

import TableCell from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";
import { colors } from "../../../styles";

export const StyledTable = styled(Table)`
  min-width: 650px;
`;

export const StyledTableCell = styled(TableCell)`
  font-weight: bold;
  color: #333;
  background-color: #f0f0f0;
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const Resume = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;

  div {
    display: flex;

    p {
      margin-left: 10px;
      font-weight: bold;
      color: ${colors.grayDark};
    }
  }
`;
