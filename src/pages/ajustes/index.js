import "./styles.css";
import { Button } from "reactstrap";
import apiMykonos from "services/apiMykonos";
import { useEffect } from "react";
import React, { Fragment, useState } from "react";
import { useSnackbar } from "contexts/SnackbarContext";
import { Typography } from "@mui/material";

function Ajustes() {
  const [datos, setDatos] = useState({
    cambio: "",
  });

  useEffect(() => {
    const _cambio = apiMykonos.divisas.getDolar();
    setDatos(_cambio);
  }, []);

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    console.log("enviando datos..." + datos.cambio);
    openSnackbar({
      severity: "success",
      text: "Se realizo correctamente el tipo de cambio",
    });
  };

  const { openSnackbar } = useSnackbar();

  return (
    <div class="detallesAjustes">
      <Fragment>
        <Typography variant="h4" align="center">
          Ajustes
        </Typography>
        <label>Tipo de cambio 1 USD a Sol</label>
        <form className="row" onSubmit={enviarDatos}>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Tipo de cambio"
              className="form-control"
              onChange={handleInputChange}
              name="cambio"
              value={datos.cambio}
            ></input>
          </div>
          <Button
            type="submit"
            color="success"
            className="btn btn-primary  col-auto"
          >
            Enviar
          </Button>
        </form>
      </Fragment>
    </div>
  );
}

export default Ajustes;
