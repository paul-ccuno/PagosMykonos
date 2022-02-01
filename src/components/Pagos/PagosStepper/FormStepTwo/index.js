import { textFieldStyles } from "components/General/TextField";
import { useState, useEffect, useContext } from "react";
import { pagosFields } from "models/Pagos.model";
import PagosContext from "contexts/PagosContext";

import {
  TextField,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  TableRow,
  DialogActions,
} from "@mui/material";
import { dateNextMonth, getDateSameDayNextMonth, getEndDay } from "utils/date";
import { format } from "date-fns";
import { integerRegex, periodRegex } from "utils/regex";

const FormStepTwo = () => {
  const [nCuotasInicial, setNCuotasInicial] = useState("");
  const [fechaCuotasInicial, setFechaCuotasInicial] = useState("");
  const [cuotasInicial, setCuotasInicial] = useState([]);
  const { pagos, setPagos } = useContext(PagosContext);
  const [saldoTotal, setSaldoTotal] = useState(pagos.precio);

  const CuotaInicial = ({ n, fecha, monto, saldo, index }) => {
    const [date, setDate] = useState(format(fecha, "yyyy-MM-dd"));
    const [mount, setMount] = useState(monto);

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
              setDate(format(_date, "yyyy-MM-dd"));
              const _cuotasInicial = cuotasInicial;
              _cuotasInicial[index].fecha = _date;
              console.log(_cuotasInicial);
              setCuotasInicial(_cuotasInicial);
            }}
            value={date}
          />
        </TableCell>
        <TableCell>
          <TextField
            {...textFieldStyles}
            value={mount}
            onChange={({ target: { value } }) => {
              if (value == 0) setMount(value);
              if (periodRegex.test(value)) {
                setMount(value);
                const _cuotasInicial = cuotasInicial;
                _cuotasInicial[index].monto = parseFloat(value);
                for (let i = index; i < +nCuotasInicial; i++) {
                  const saldo = saldoTotal - parseFloat(value);
                  _cuotasInicial[i].saldo = saldo;
                  setSaldoTotal(saldo);
                }
                console.log(_cuotasInicial);
                setCuotasInicial(_cuotasInicial);
              }
            }}
          />
        </TableCell>
        <TableCell>{saldo}</TableCell>
      </TableRow>
    );
  };

  useEffect(() => {
    if (nCuotasInicial && fechaCuotasInicial) {
      const _nCuotasInicial = parseInt(nCuotasInicial);
      const _cuotasInicial = new Array(_nCuotasInicial);

      let date = new Date(fechaCuotasInicial);
      const initialEndDay = date.getDate();

      _cuotasInicial[0] = {};
      _cuotasInicial[0].n = 1;
      _cuotasInicial[0].fecha = date;
      _cuotasInicial[0].monto = 0;
      _cuotasInicial[0].saldo = pagos.precio;

      for (let i = 1; i < _nCuotasInicial; i++) {
        _cuotasInicial[i] = {};
        const currentDate = date;

        /* Fecha */
        date = getDateSameDayNextMonth(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          initialEndDay
        );

        /* Monto */

        _cuotasInicial[i].n = i + 1;
        _cuotasInicial[i].fecha = date;
        _cuotasInicial[i].monto = 0;
        _cuotasInicial[i].saldo = pagos.precio;
      }
      setCuotasInicial(_cuotasInicial);
    }
  }, [nCuotasInicial, fechaCuotasInicial]);

  const handleSubmitStepTwoForm = (e) => {
    e.preventDefault();
    const resStepTwo = {
      [pagosFields.cantidadCuotasMontoInicial]: nCuotasInicial,
      [pagosFields.fechaInicioCuotasMontoInicial]: fechaCuotasInicial,
      [pagosFields.cuotasMontoInicial]: cuotasInicial,
    };
    console.log(resStepTwo);
    setPagos({ ...pagos }, ...resStepTwo);
  };

  return (
    <form>
      <TextField
        {...textFieldStyles}
        label="Cantidad Cuotas Monto Inicial"
        onChange={({ target: { value } }) => {
          console.log(value);
          if (value == 0) setNCuotasInicial(value);
          if (integerRegex.test(value)) setNCuotasInicial(value);
        }}
        value={nCuotasInicial}
        helperText="Debe ingresar un numero menor a 300"
      />
      <TextField
        {...textFieldStyles}
        type="date"
        label="Fecha Cuotas Monto Inicial"
        InputLabelProps={{ shrink: true }}
        onChange={({ target: { value } }) => {
          const date = new Date(value);
          date.setDate(date.getDate() + 1);
          setFechaCuotasInicial(date);
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Monto Cuota</TableCell>
              <TableCell>Saldo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuotasInicial.map((props, i) => (
              <CuotaInicial key={props.n} {...props} index={i} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogActions>
        <Button onSubmit={handleSubmitStepTwoForm}>Next</Button>
      </DialogActions>
    </form>
  );
};

export default FormStepTwo;
