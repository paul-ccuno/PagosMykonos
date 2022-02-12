import "./styles.css";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  LibraryBooks as LibraryBooksIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from "@mui/icons-material";
import { useState } from "react";
import PagosEditDialog from "../PagosEditDialog";
import jsPDF from "jspdf";
import "jspdf-autotable";

const rows = [
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

const PagosTable = () => {
  const [cuotasEdit, setCuotasEdit] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleShowDeleteDialog = (params) => {
    setOpenDeleteDialog(true);
  };
  const DownloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Gestor de pagos", 14, 10);
    doc.autoTable({
      //columns:field.map(col=>({title:col.headerName,dataKey:col.field})),
      body: rows.map((row) => Object.values(row)),
    });
    doc.save("table.pdf");
  };
  const DownloadExcel = () => {};

  return (
    <div className="Pagos-table">
      <DataGridPro
        rows={rows}
        columns={[
          { field: "id", headerName: "Código", width: 70 },
          {
            field: "cliente",
            headerName: "Cliente",
            type: "string",
            minWidth: 150,
          },
          {
            field: "manzana",
            headerName: "Manzana",
            type: "string",
            minWidth: 100,
          },
          {
            field: "lote",
            headerName: "Número terreno",
            type: "string",
            minWidth: 150,
          },
          {
            field: "moneda",
            headerName: "Moneda",
            type: "string",
            minWidth: 100,
          },
          {
            field: "fechaInicio",
            headerName: "Fecha inicio",
            type: "date",
            minWidth: 120,
          },
          {
            field: "siguientePago",
            headerName: "Siguiente pago",
            type: "date",
            minWidth: 130,
          },
          {
            field: "estadoPago",
            headerName: "Estado pago",
            type: "date",
            minWidth: 130,
          },
          {
            field: "cuotasVencidas",
            headerName: "Cuotas vencidas",
            type: "number",
            minWidth: 140,
          },
          {
            field: "deudaPendiente",
            headerName: "Deuda pendiente",
            type: "number",
            minWidth: 140,
          },
          {
            field: "actions",
            type: "actions",
            width: 150,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<LibraryBooksIcon />}
                label="Excel"
                onClick={() => DownloadExcel()}
              />,
              <GridActionsCellItem
                icon={<PictureAsPdfIcon />}
                label="Pdf"
                onClick={() => DownloadPdf()}
              />,
              <PagosEditDialog pago={params.row} />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleShowDeleteDialog(params)}
              />,
            ],
          },
        ]}
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
