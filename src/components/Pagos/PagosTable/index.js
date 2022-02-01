import "./styles.css";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  LibraryBooks as LibraryBooksIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from "@mui/icons-material";
// https://codi.link/%7C%7CY29uc3QgbmV4dFdlZWsgPSAoZGF0ZSkgPT4gew0KICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKGRhdGUpOw0KICBjb25zdCBuZXh0RGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlKTsNCiAgDQogIG5leHREYXRlLnNldE1vbnRoKG5leHREYXRlLmdldE1vbnRoKCkgKyAxKTsNCg0KICBjb25zb2xlLmxvZygnY3VycmVudCcsIGN1cnJlbnREYXRlKQ0KICBjb25zb2xlLmxvZygnbmV4dCcsIG5leHREYXRlKQ0KfQ0KDQpuZXh0V2VlaygnMjAyMi0xLTMwJyk7
const columns = [
  { field: "id", headerName: "Código", width: 100 },
  { field: "cliente", headerName: "Cliente", type: "string", minWidth: 150 },
  { field: "pera", headerName: "Pera", type: "string", minWidth: 100 },
  { field: "manzana", headerName: "Manzana", type: "string", minWidth: 100 },
  {
    field: "lote",
    headerName: "Número terreno",
    type: "string",
    minWidth: 150,
  },
  { field: "moneda", headerName: "Moneda", type: "string", minWidth: 150 },
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

const rows = [];
/* const rows = [
  {
    id: 1,
    cliente: "Damien",
    manzana: "B",
    lote: 2,
    moneda: "Dolar",
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
  {
    id: 2,
    cliente: "Jorge",
    manzana: "A",
    lote: 3,
    moneda: "Dolar",
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
  {
    id: 3,
    cliente: "Manrique",
    manzana: "C",
    lote: 2,
    moneda: "Sol",
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
  {
    id: 4,
    cliente: "Eduardo",
    manzana: "B",
    lote: 2,
    moneda: "Sol",
    fechaInicio: 25,
    siguientePago: 25,
    cuotasVencidas: 25,
    deudaPendiente: 25,
  },
];
 */
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
