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
import { Button } from "@mui/material";
import XLSX from "xlsx";

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
  const DownloadPdf = (contract) => {
    console.warn(contract);
    const doc = new jsPDF();
    doc.text("Gestor de pagos", 14, 10);
    doc.autoTable({
      columns: [
        { title: "Cliente", dataKey: "cliente" },
        { title: "Manzana", dataKey: "manzana" },
        { title: "Lote", dataKey: "lote" },
        { title: "Moneda", dataKey: "moneda" },
        { title: "Fecha Inicio", dataKey: "fechaInicio" },
        { title: "Siguiente Pago", dataKey: "siguientePago" },
        { title: "Cuotas Vencidas", dataKey: "cuotasVencidas" },
        { title: "Deuda Pendiente", dataKey: "deudaPendiente" },
      ],
      body: rows.filter((row) => row.id === contract.id),
    });
    doc.save("Gestor de pagos.pdf");
  };
  const DownloadExcel = (contract) => {
    const ws = XLSX.utils.json_to_sheet(
      rows.filter((row) => row.id === contract.id)
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Gestor de pagos");
    XLSX.writeFile(wb, "Gestor de pagos.xlsx");
  };

  const DownloadExcelAll = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Gestor de pagos");
    XLSX.writeFile(wb, "Gestor de pagos.xlsx");
  };

  return (
    <div className="Pagos-table">
      <Button
        id="exportar"
        variant="contained"
        color="success"
        onClick={() => DownloadExcelAll()}
      >
        Exportar a Excel
      </Button>
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
                onClick={() => DownloadExcel(params.row)}
              />,
              <GridActionsCellItem
                icon={<PictureAsPdfIcon />}
                label="Pdf"
                onClick={() => DownloadPdf(params.row)}
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
