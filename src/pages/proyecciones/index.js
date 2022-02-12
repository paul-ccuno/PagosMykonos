import "./styles.css";
import { useState } from "react";
import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

function Proyecciones() {
  const [mesesDesde, setMesesDesde] = React.useState("");
  const [añosDesde, setAñosDesde] = React.useState("");
  const [mesesHasta, setMesesHasta] = React.useState("");
  const [añosHasta, setAñosHasta] = React.useState("");
  const [añoEspecifico, setAñoEspecifico] = React.useState("");
  const [mesEspecifico, setMesEspecifico] = React.useState("");
  const [value, setValue] = React.useState("1");
  const [totalSoles, setTotalSoles] = React.useState(0);
  const [totalDolares, setTotalDolares] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeAñosDesde = (event) => {
    setAñosDesde(event.target.value);
  };
  const handleChangeMesesDesde = (event) => {
    setMesesDesde(event.target.value);
  };
  const handleChangeAñosHasta = (event) => {
    setAñosHasta(event.target.value);
  };
  const handleChangeMesesHasta = (event) => {
    setMesesHasta(event.target.value);
  };

  const handleChangeAñoEspecifico = (event) => {
    setAñoEspecifico(event.target.value);
  };
  const handleChangeMesEspecifico = (event) => {
    setMesEspecifico(event.target.value);
  };

  return (
    <div className="detallesProyecciones">
      <Typography variant="h4" align="center">
        Proyecciones
      </Typography>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Intervalo de meses" value="1" />
              <Tab label="Mes específico" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <label>Desde</label>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Año
              </InputLabel>

              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select"
                value={añosDesde}
                label="Años"
                onChange={handleChangeAñosDesde}
              >
                <MenuItem value={2015}>2015</MenuItem>
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Mes
              </InputLabel>

              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select"
                value={mesesDesde}
                label="Meses"
                onChange={handleChangeMesesDesde}
              >
                <MenuItem value={"Enero"}>Enero</MenuItem>
                <MenuItem value={"Febrero"}>Febrero</MenuItem>
                <MenuItem value={"Marzo"}>Marzo</MenuItem>
                <MenuItem value={"Abril"}>Abril</MenuItem>
                <MenuItem value={"Mayo"}>Mayo</MenuItem>
                <MenuItem value={"Junio"}>Junio</MenuItem>
                <MenuItem value={"Julio"}>Julio</MenuItem>
                <MenuItem value={"Agosto"}>Agosto</MenuItem>
                <MenuItem value={"Septiembre"}>Septiembre</MenuItem>
                <MenuItem value={"Noviembre"}>Noviembre</MenuItem>
                <MenuItem value={"Diciembre"}>Diciembre</MenuItem>
              </Select>
            </FormControl>
            <label>Hasta</label>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Año
              </InputLabel>

              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select"
                value={añosHasta}
                label="Años"
                onChange={handleChangeAñosHasta}
              >
                <MenuItem value={2015}>2015</MenuItem>
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Mes
              </InputLabel>

              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select"
                value={mesesHasta}
                label="Meses"
                onChange={handleChangeMesesHasta}
              >
                <MenuItem value={"Enero"}>Enero</MenuItem>
                <MenuItem value={"Febrero"}>Febrero</MenuItem>
                <MenuItem value={"Marzo"}>Marzo</MenuItem>
                <MenuItem value={"Abril"}>Abril</MenuItem>
                <MenuItem value={"Mayo"}>Mayo</MenuItem>
                <MenuItem value={"Junio"}>Junio</MenuItem>
                <MenuItem value={"Julio"}>Julio</MenuItem>
                <MenuItem value={"Agosto"}>Agosto</MenuItem>
                <MenuItem value={"Septiembre"}>Septiembre</MenuItem>
                <MenuItem value={"Noviembre"}>Noviembre</MenuItem>
                <MenuItem value={"Diciembre"}>Diciembre</MenuItem>
              </Select>
            </FormControl>
            <table>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th style={{ textAlign: "center" }} colspan="3">
                    Proyeccion Soles del Mes
                  </th>
                </tr>
                <tr>
                  <th>Desde</th>
                  <th>Hasta</th>
                  <th>Total Soles</th>
                </tr>
              </thead>
              <tbody>
                <td>
                  {añosDesde}
                  {" - "}
                  {mesesDesde}
                </td>
                <td>
                  {añosHasta}
                  {" - "}
                  {mesesHasta}
                </td>
                <td></td>
              </tbody>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th style={{ textAlign: "center" }} colspan="3">
                    Proyeccion Dolares del Mes
                  </th>
                </tr>
                <tr>
                  <th>Desde</th>
                  <th>Hasta</th>
                  <th>Total Dolares</th>
                </tr>
              </thead>
              <tbody>
                <td>
                  {añosDesde}
                  {" - "}
                  {mesesDesde}
                </td>
                <td>
                  {añosHasta}
                  {" - "}
                  {mesesHasta}
                </td>
                <td></td>
              </tbody>
            </table>
          </TabPanel>

          <TabPanel value="2">
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Año
              </InputLabel>

              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select"
                value={añoEspecifico}
                label="Años"
                onChange={handleChangeAñoEspecifico}
              >
                <MenuItem value={2015}>2015</MenuItem>
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Mes
              </InputLabel>

              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select"
                value={mesEspecifico}
                label="Meses"
                onChange={handleChangeMesEspecifico}
              >
                <MenuItem value={"Enero"}>Enero</MenuItem>
                <MenuItem value={"Febrero"}>Febrero</MenuItem>
                <MenuItem value={"Marzo"}>Marzo</MenuItem>
                <MenuItem value={"Abril"}>Abril</MenuItem>
                <MenuItem value={"Mayo"}>Mayo</MenuItem>
                <MenuItem value={"Junio"}>Junio</MenuItem>
                <MenuItem value={"Julio"}>Julio</MenuItem>
                <MenuItem value={"Agosto"}>Agosto</MenuItem>
                <MenuItem value={"Septiembre"}>Septiembre</MenuItem>
                <MenuItem value={"Noviembre"}>Noviembre</MenuItem>
                <MenuItem value={"Diciembre"}>Diciembre</MenuItem>
              </Select>
            </FormControl>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Proyeccion Soles del mes</th>
                  <th>Total Soles</th>
                </tr>
              </thead>
              <tbody>
                <td>{value.length}</td>
                <td>
                  {añoEspecifico} {" - "} {mesEspecifico}
                </td>
                <td></td>
              </tbody>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Proyeccion soles del mes</th>
                  <th>Total Dolares</th>
                </tr>
              </thead>
              <tbody>
                <td>{value.length}</td>
                <td>
                  {añoEspecifico} {" - "} {mesEspecifico}
                </td>
                <td></td>
              </tbody>
            </table>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
export default Proyecciones;
