import { TextField, Autocomplete } from "@mui/material";
import { textFieldStyles } from "components/General/TextField";
import { pagosFields } from "models/Pagos.model";
import { useContext, useEffect, useState } from "react";
import { periodRegex } from "utils/regex";
import PagosContext from "contexts/PagosContext";

const proyectos = [{ id: 1, label: "Mykonos" }];

const divisas = [
  { id: 1, label: "Dolar" },
  { id: 2, label: "Sol" },
];

const FormStepOne = ({ clients, lots, dolar }) => {
  const { pagos, setPagos, setIsDisabledNext } = useContext(PagosContext);

  const [cliente, setCliente] = useState(pagos[pagosFields.cliente] || "");
  const [proyecto, setProyecto] = useState(pagos[pagosFields.proyecto] || 1);
  const [lote, setLote] = useState(pagos[pagosFields.lote] || "");
  const [moneda, setMoneda] = useState(pagos[pagosFields.moneda] || 1);
  const [precio, setPrecio] = useState(
    moneda === 2
      ? pagos[pagosFields.precio] / dolar
      : pagos[pagosFields.precio] || 0
  );

  const [defaultCliente] = useState(
    clients.find(({ id }) => cliente === id) || null
  );
  const [defaultProyecto] = useState(
    proyectos.find(({ id }) => proyecto === id) || 1
  );
  const [defaultLote] = useState(
    lots.find(({ id }) => lote === id) || undefined
  );
  const [defaultMoneda] = useState(
    divisas.find(({ id }) => moneda === id) || 1
  );

  useEffect(() => {
    console.log("moneda", moneda);
  }, [moneda]);

  const handleFormStepOneForm = () => {
    // e.preventDefault();
    const resStepOne = {
      [pagosFields.cliente]: cliente,
      [pagosFields.proyecto]: proyecto,
      [pagosFields.lote]: lote,
      [pagosFields.moneda]: moneda,
      [pagosFields.precio]: moneda === 2 ? +precio * dolar : +precio,
    };

    setPagos({ ...resStepOne });
    console.log(resStepOne);
  };

  useEffect(() => {
    if (cliente && proyecto && lote && precio) {
      handleFormStepOneForm();
      setIsDisabledNext(false);
      return;
    }
    setIsDisabledNext(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cliente, proyecto, lote, precio, moneda]);

  return (
    <form>
      <Autocomplete
        options={clients}
        onChange={(_, data) => {
          setCliente(data?.id);
        }}
        defaultValue={defaultCliente}
        renderInput={(params) => (
          <TextField {...params} {...textFieldStyles} label="Cliente" />
        )}
      />
      <Autocomplete
        options={proyectos}
        onChange={(_, data) => {
          setProyecto(data?.id);
        }}
        defaultValue={defaultProyecto}
        renderInput={(params) => (
          <TextField {...params} {...textFieldStyles} label="Proyecto" />
        )}
      />
      <Autocomplete
        options={lots}
        onChange={(_, data) => {
          setLote(data?.id);
          setPrecio(+data?.precio);
        }}
        defaultValue={defaultLote}
        renderInput={(params) => (
          <TextField {...params} {...textFieldStyles} label="Lote" />
        )}
      />
      <Autocomplete
        options={divisas}
        onChange={(_, data) => {
          setMoneda(data?.id);
        }}
        defaultValue={defaultMoneda}
        renderInput={(params) => (
          <TextField {...params} {...textFieldStyles} label="Moneda" />
        )}
      />
      <TextField
        {...textFieldStyles}
        label="Precio"
        onChange={({ target: { value } }) => {
          if (value == 0) setPrecio(value);
          if (periodRegex.test(value)) setPrecio(value);
        }}
        value={precio}
      />
    </form>
  );
};

export default FormStepOne;
