import TableBody from "@mui/material/TableBody";

import TableHead from "@mui/material/TableHead";

import Paper from "@mui/material/Paper";
import { useGetOrdersQuery } from "../../../services/api";
import formatDate from "../../../utils/dateFormat";
import { StyledTableCell, StyledTableRow, StyledTable, Resume } from "./styles";
import { TableContainer } from "@mui/material";
import countOrdersByStatus from "../../../utils/countOrderByStatus";
import Status from "../../../components/status";

export default function BasicTable() {
  const { data: orders, error, isLoading } = useGetOrdersQuery();

  if (isLoading) return <div>Carregando pedidos...</div>;
  if (error) return <div>Ocorreu um erro ao buscar os pedidos.</div>;

  const ordersCountByStatus = countOrdersByStatus(orders || []);

  return (
    <TableContainer component={Paper}>
      <Resume>
        <h3>Order History</h3>
        <div>
          {Object.entries(ordersCountByStatus).map(([status, count]) => (
            <p key={status}>
              {status}: {count} |
            </p>
          ))}
        </div>
      </Resume>
      <StyledTable aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">OrderId</StyledTableCell>
            <StyledTableCell align="center">Payment</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {(orders || []).map((order) => (
            <StyledTableRow key={order.id}>
              <StyledTableCell component="th" scope="row">
                {order.user.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                #{order.id.slice(0, 6)}
              </StyledTableCell>
              <StyledTableCell align="center">Cash</StyledTableCell>
              <StyledTableCell align="center">
                {formatDate(order.created_at)}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Status status={order.status} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
