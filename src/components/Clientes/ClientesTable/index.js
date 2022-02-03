import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

const columns = [
  { field: "nombre", headerName: "Nombre", type: "string", minWidth: 150 },
  {
    field: "direccion",
    headerName: "Dirección",
    type: "string",
    minWidth: 150,
  },
  { field: "distrito", headerName: "Distrito", type: "string", minWidth: 150 },
  { field: "dni", headerName: "DNI", type: "string", minWidth: 100 },
  { field: "telefono", headerName: "Telefono", type: "string", minWidth: 150 },
  { field: "correo", headerName: "Correo", type: "string", minWidth: 150 },
  {
    field: "actions",
    type: "actions",
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
    ],
  },
];

const rows = [
  {
    id: 1,
    nombre: "juan",
  },
];

const styles = {
  height: "100%",
  width: "100%",
};

const ClientesTable = () => {
  return (
    <div className="Clientes-table" style={styles}>
      <DataGridPro
        rows={rows}
        columns={columns}
        initialState={{
          pinnedColumns: {
            right: ["actions"],
          },
        }}
      />
    </div>
  );
};

export default ClientesTable;
