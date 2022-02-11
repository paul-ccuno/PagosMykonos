import "./styles.css";
import { useState } from "react";
import {
  FormGroup,
  ModalFooter,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import { useSnackbar } from "contexts/SnackbarContext";

function Mantenimiento() {
  const dataLote = [
    {
      id: 1,
      Lote: "A-1",
      Manzana: "A",
      Numero: 1,
      Area: 118.09,
      Precio: 1476.25,
      Estado: "Disponible",
    },
    {
      id: 2,
      Lote: "A-2",
      Manzana: "A",
      Numero: 2,
      Area: 118.09,
      Precio: 1476.25,
      Estado: "Disponible",
    },
    {
      id: 3,
      Lote: "A-3",
      Manzana: "A",
      Numero: 3,
      Area: 118.09,
      Precio: 1476.25,
      Estado: "Disponible",
    },
    {
      id: 4,
      Lote: "A-4",
      Manzana: "A",
      Numero: 4,
      Area: 118.09,
      Precio: 1476.25,
      Estado: "Disponible",
    },
  ];

  const [data, setData] = useState(dataLote);
  const [modalInsertar, setModalInsertar] = useState(0);
  const [modalEditar, setModalEditar] = useState(0);
  const [modalEliminar, setModalEliminar] = useState(0);
  const [loteSeleccionado, setLoteSeleccionado] = useState({
    id: "",
    Lote: "",
    Manzana: "",
    Numero: "",
    Area: "",
    Precio: "",
    Estado: "",
  });
  const { openSnackbar } = useSnackbar();

  const seleccionarLote = (elemento, caso) => {
    setLoteSeleccionado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoteSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const editar = () => {
    var dataNueva = data;
    dataNueva.map((lote) => {
      if (lote.id === loteSeleccionado.id) {
        lote.Lote = loteSeleccionado.Lote;
        lote.Manzana = loteSeleccionado.Manzana;
        lote.Numero = loteSeleccionado.Numero;
        lote.Area = loteSeleccionado.Area;
        lote.Precio = loteSeleccionado.Precio;
        lote.Estado = loteSeleccionado.Estado;
      }
    });
    setData(dataNueva);
    openSnackbar({
      severity: "success",
      text: "Se edito correctamente el lote",
    });
    setModalEditar(false);
  };
  const eliminar = () => {
    setData(data.filter((lote) => lote.id !== loteSeleccionado.id));
    openSnackbar({
      severity: "success",
      text: "Se elimino correctamente el lote",
    });
    setModalEliminar(false);
  };
  const abrirModalInsertar = () => {
    setLoteSeleccionado(null);
    setModalInsertar(true);
  };
  const insertar = () => {
    var valorInsertar = loteSeleccionado;
    valorInsertar.id = data[data.length - 1].id + 1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    openSnackbar({
      severity: "success",
      text: "Se inserto correctamente el lote",
    });
    setModalInsertar(false);
  };

  return (
    <div className="detallesSolicitudLote">
      <h2 id="terrenos">Terrenos</h2>
      <Button
        id="insertar"
        color="success"
        onClick={() => abrirModalInsertar()}
      >
        Insertar Nuevo Lote
      </Button>

      <div className="detallesProductos">
        <table>
          <thead>
            <tr>
              <th scope="col">Lote</th>
              <th scope="col">Manzana</th>
              <th scope="col">Numero</th>
              <th scope="col">Area</th>
              <th scope="col">Precio</th>
              <th scope="col"> Estado</th>
              <th scope="col"> Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elemento) => (
              <tr>
                <td>{elemento.Lote}</td>
                <td>{elemento.Manzana}</td>
                <td>{elemento.Numero}</td>
                <td>{elemento.Area}</td>
                <td>{elemento.Precio}</td>
                <td>{elemento.Estado}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => seleccionarLote(elemento, "Editar")}
                  >
                    Editar
                  </Button>
                  {"   "}
                  <Button
                    color="danger"
                    onClick={() => seleccionarLote(elemento, "Eliminar")}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* // * MODAL INSERTAR */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Nuevo Terreno</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <input
              className="form-control"
              readonly
              type="hidden"
              value={loteSeleccionado && loteSeleccionado.id}
              onChange={handleChange}
              value={data[data.length - 1].id + 1}
            />
          </FormGroup>
          <FormGroup>
            <label>Lote:</label>
            <input
              className="form-control"
              name="Lote"
              type="text"
              value={loteSeleccionado ? loteSeleccionado.Lote : ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Manzana:</label>
            <input
              className="form-control"
              name="Manzana"
              type="text"
              value={loteSeleccionado ? loteSeleccionado.Manzana : ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Numero:</label>
            <input
              className="form-control"
              name="Numero"
              type="text"
              value={loteSeleccionado ? loteSeleccionado.Numero : ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Area:</label>
            <input
              className="form-control"
              name="Area"
              type="text"
              value={loteSeleccionado ? loteSeleccionado.Area : ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Precio:</label>
            <input
              className="form-control"
              name="Precio"
              type="text"
              value={loteSeleccionado ? loteSeleccionado.Precio : ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              name="Estado"
              type="text"
              value={loteSeleccionado ? loteSeleccionado.Estado : ""}
              onChange={handleChange}
            >
              <option value="Disponible">Disponible</option>
              <option value="Vendido">Vendido</option>
              <option value="Reservado">Reservado</option>
              <option value="Bloqueado">Bloqueado</option>
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => insertar()}>
            Insertar
          </Button>
          <Button color="danger" onClick={() => setModalInsertar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* // * MODAL EDITAR */}
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div className="textModal">
            <h3>Editar Lote</h3>
            <h1>{loteSeleccionado && loteSeleccionado.Lote}</h1>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <input
              className="form-control"
              readonly
              type="hidden"
              value={loteSeleccionado && loteSeleccionado.id}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              className="form-control"
              name="Lote"
              type="hidden"
              value={loteSeleccionado && loteSeleccionado.Lote}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              className="form-control"
              name="Manzana"
              type="hidden"
              value={loteSeleccionado && loteSeleccionado.Manzana}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              className="form-control"
              name="Numero"
              type="hidden"
              value={loteSeleccionado && loteSeleccionado.Numero}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              className="form-control"
              name="Area"
              type="hidden"
              value={loteSeleccionado && loteSeleccionado.Area}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Precio:</label>
            <input
              className="form-control"
              name="Precio"
              type="text"
              value={loteSeleccionado && loteSeleccionado.Precio}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              name="Estado"
              type="text"
              value={loteSeleccionado && loteSeleccionado.Estado}
              onChange={handleChange}
            >
              <option value="Disponible">Disponible</option>
              <option value="Vendido">Vendido</option>
              <option value="Reservado">Reservado</option>
              <option value="Bloqueado">Bloqueado</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => editar()}>
            Grabar
          </Button>
          <Button color="danger" onClick={() => setModalEditar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* // * MODAL ELIMINAR */}
      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estas seguro que deseas eliminar el lote{" "}
          {loteSeleccionado && loteSeleccionado.Lote} ?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => eliminar()}>
            Si
          </Button>
          <Button color="secondary" onClick={() => setModalEliminar(false)}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Mantenimiento;
