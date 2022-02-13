import { TableCell, TableRow, TextField } from "@mui/material";
import { textFieldStyles } from "components/General/TextField";
import { usePagos } from "contexts/PagosContext";
import { useListCuotasFinanciar } from "contexts/PagosContext/CuotasFinanciarContext";
import format from "date-fns/format";
import { useEffect } from "react";
import { calcCuotas, editarCouta } from "utils/cuotas";
import { periodRegex } from "utils/regex";

const CuotaFinanciar = ({
  n,
  fecha,
  monto = 0,
  saldo,
  tipo,
  estado,
  index,
}) => {
  const { saldoFinanciar } = usePagos();
  const { cuotas, setCuotas } = useListCuotasFinanciar();

  const handleChangeMount = ({ target: { value } }) => {
    if (!value) {
      const _cuotasFinanciar = cuotas;
      setCuotas([
        ...editarCouta(index + 1, 0, saldoFinanciar, _cuotasFinanciar),
      ]);
      return;
    }
    if (periodRegex.test(value)) {
      const _cuotasFinanciar = cuotas;
      setCuotas([
        ...editarCouta(index + 1, value, saldoFinanciar, _cuotasFinanciar),
      ]);
    }
    console.log(monto, saldo);
  };

  return (
    <TableRow>
      <TableCell>{n}</TableCell>
      <TableCell>
        <TextField
          {...textFieldStyles}
          type="date"
          onChange={({ target: { value } }) => {
            const _date = new Date(value);
            _date.setDate(_date.getDate() + 1);
            // setDate(format(_date, "yyyy-MM-dd"));
            const _cuotasFinanciar = cuotas;
            _cuotasFinanciar[index].fecha = _date;
            setCuotas([..._cuotasFinanciar]);
          }}
          value={format(fecha, "yyyy-MM-dd")}
        />
      </TableCell>
      <TableCell>
        <TextField
          {...textFieldStyles}
          value={monto || ""}
          type="number"
          onChange={handleChangeMount}
        />
      </TableCell>
      <TableCell>{saldo.toString()}</TableCell>
    </TableRow>
  );
};

export default CuotaFinanciar;
