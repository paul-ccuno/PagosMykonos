import { Button, DialogActions, TextField, Autocomplete } from "@mui/material";
import { textFieldStyles } from "components/General/TextField";
import { pagosFields } from "models/Pagos.model";
import { useContext, useEffect, useState } from "react";
import { periodRegex } from "utils/regex";
import PagosContext from "contexts/PagosContext";

const clientes = [
  { label: "Cliente 1", id: 1 },
  { label: "Cliente 2", id: 2 },
  { label: "Cliente 3", id: 2 },
];

const proyectos = [{ label: "Mykonos", id: 1 }];

const lotes = [
  { id: "A-1", label: "A-1", precio: 12312.2 },
  { id: "A-2", label: "A-2", precio: 14351.1 },
  { id: "A-3", label: "A-3", precio: 12345.6 },
  { id: "B-1", label: "B-1", precio: 17432.9 },
  { id: "B-2", label: "B-2", precio: 19020.54 },
  { id: "B-3", label: "B-3", precio: 58402.5 },
  { id: "B-4", label: "B-4", precio: 43121.4 },
];

const FormStepOne = () => {
  const [cliente, setCliente] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [lote, setLote] = useState("");
  const [precio, setPrecio] = useState("");
  const { setPagos } = useContext(PagosContext);

  useEffect(() => {
    console.log(lote);
  }, [lote]);

  const handleSubmitStepOneForm = (e) => {
    e.preventDefault();
    const resStepOne = {
      [pagosFields.cliente]: cliente,
      [pagosFields.proyecto]: proyecto,
      [pagosFields.lote]: lote,
      [pagosFields.precio]: parseFloat(precio),
    };

    setPagos({ ...resStepOne });
    console.log(resStepOne);
  };
  return (
    <form onSubmit={handleSubmitStepOneForm}>
      <Autocomplete
        options={clientes}
        // getOptionLabel={(option) => {
        //   return option.label;
        // }}
        onChange={(_, data) => {
          setCliente(data?.id);
        }}
        renderInput={(params) => (
          <TextField {...params} {...textFieldStyles} label="Cliente" />
        )}
      />

      <Autocomplete
        options={proyectos}
        onChange={(_, data) => {
          setProyecto(data?.id);
        }}
        renderInput={(params) => (
          <TextField {...params} {...textFieldStyles} label="Proyecto" />
        )}
      />
      <Autocomplete
        options={lotes}
        onChange={(_, data) => {
          setLote(data?.id);
          setPrecio(data?.precio.toString());
        }}
        renderInput={(params) => (
          <TextField {...params} {...textFieldStyles} label="Lote" />
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
      <DialogActions>
        <Button type="submit">Next</Button>
      </DialogActions>
    </form>
  );
};

export default FormStepOne;
