import "./styles.css";
import { DataGridPro, GridActionsCellItem } from "@mui/x-data-grid-pro";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  LibraryBooks as LibraryBooksIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import PagosEditDialog from "../PagosEditDialog";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@mui/material";
import XLSX from "xlsx";
import apiMykonos from "services/apiMykonos";
import { useContratos } from "contexts/ContratosContext";
import { contratosFields } from "models/Pagos.model";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

const rows = [
  {
    id: 1,
    Nombres: "Damien",
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
    Nombres: "Jorge",
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
    Nombres: "Manrique",
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
    Nombres: "Eduardo",
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
  const { contracts, setContracts, isCreated, setIsCreated } = useContratos();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleShowDeleteDialog = (params) => {
    setOpenDeleteDialog(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const _contracts = await apiMykonos.contracts.getContracts();
    setContracts(_contracts);
    console.log(contracts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isCreated) {
      const _contracts = await apiMykonos.contracts.getContracts();
      for (let i = 0; i < _contracts.length; i++) {
        _contracts[i][contratosFields.fechaInicio] = format(
          new Date(_contracts[i][contratosFields.fechaInicio]),
          "yyyy-MM-dd"
        );
      }
      console.log(_contracts);
      setContracts(_contracts);
      setIsCreated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreated]);

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
        rows={contracts}
        columns={[
          { field: "id", headerName: "Código", width: 70 },
          {
            field: contratosFields.cliente,
            headerName: "Cliente",
            type: "string",
            minWidth: 150,
          },
          {
            field: contratosFields.mz,
            headerName: "Manzana",
            type: "string",
            minWidth: 100,
          },
          {
            field: contratosFields.lote,
            headerName: "Número terreno",
            type: "number",
            minWidth: 150,
          },
          {
            field: contratosFields.moneda,
            headerName: "Moneda",
            type: "string",
            minWidth: 100,
          },
          {
            field: contratosFields.fechaInicio,
            headerName: "Fecha inicio",
            type: "string",
            minWidth: 120,
          },
          {
            field: contratosFields.fechaPago,
            headerName: "Siguiente pago",
            type: "string",
            minWidth: 130,
          },
          {
            field: contratosFields.estadoPago,
            headerName: "Estado pago",
            type: "string",
            minWidth: 130,
          },
          {
            field: contratosFields.cuotasVencidas,
            headerName: "Cuotas vencidas",
            type: "string",
            minWidth: 140,
          },
          {
            field: contratosFields.deudaPendiente,
            headerName: "Deuda pendiente",
            type: "string",
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
