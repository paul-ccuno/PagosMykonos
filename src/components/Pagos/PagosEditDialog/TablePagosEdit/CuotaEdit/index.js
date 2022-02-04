import { MenuItem, Select, TableCell, TableRow } from "@mui/material";

const CuotaEdit = ({ n, tipo, fecha, monto = 0, saldo, estado = 1, index }) => {
  return (
    <TableRow>
      <TableCell>{tipo}</TableCell>
      <TableCell>{fecha}</TableCell>
      <TableCell>{monto}</TableCell>
      <TableCell>
        <Select defaultValue={estado}>
          <MenuItem value={1}>Pendiente</MenuItem>
          <MenuItem value={2}>Pagado</MenuItem>
        </Select>
      </TableCell>
    </TableRow>
  );
};

export default CuotaEdit;
