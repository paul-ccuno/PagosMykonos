import "./styles.css";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  LibraryBooks as LibraryBooksIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from "@mui/icons-material";

const columns = [
  { field: "id", headerName: "Código", width: 100 },
  { field: "cliente", headerName: "Cliente", type: "string", minWidth: 150 },
  { field: "manzana", headerName: "Manzana", type: "string", minWidth: 150 },
  {
    field: "lote",
    headerName: "Número terreno",
    type: "string",
    minWidth: 150,
  },
  { field: "moneda", headerName: "Moneda", type: "number", minWidth: 150 },
  {
    field: "fechaInicio",
    headerName: "Fecha inicio",
    type: "date",
    minWidth: 150,
  },
  {
    field: "siguientePago",
    headerName: "Siguiente pago",
    type: "date",
    minWidth: 150,
  },
  {
    field: "cuotasVencidas",
    headerName: "Cuotas vencidas",
    type: "number",
    minWidth: 150,
  },
  {
    field: "deudaPendiente",
    headerName: "Deuda pendiente",
    type: "number",
    minWidth: 150,
  },
  {
    field: "actions",
    type: "actions",
    width: 150,
    getActions: (params) => [
      <GridActionsCellItem icon={<LibraryBooksIcon />} label="Excel" />,
      <GridActionsCellItem icon={<PictureAsPdfIcon />} label="Pdf" />,
      <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
    ],
  },
];

const rows = [
  {
    id: 1,
    cliente: "Damien",
    manzana: "A",
    lote: 25,
    moneda: 25,
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
  {
    id: 2,
    cliente: "Damien",
    manzana: "A",
    lote: 25,
    moneda: 25,
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
  {
    id: 3,
    cliente: "Damien",
    manzana: "A",
    lote: 25,
    moneda: 25,
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
  {
    id: 4,
    cliente: "Damien",
    manzana: "A",
    lote: 25,
    moneda: 25,
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
];

const PagosTable = () => {
  return (
    <div className="Pagos-table">
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

export default PagosTable;
