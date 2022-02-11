import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { useClientes } from "contexts/ClientesContext";
import { useSnackbar } from "contexts/SnackbarContext";
import { clientesFields } from "models/Clientes.model";
import { useState } from "react";
import apiMykonos from "services/apiMykonos";

const PagosDeleteDialog = ({ pago }) => {
  const [open, setOpen] = useState(false);
  const { setIsCreated } = useClientes();
  const { openSnackbar } = useSnackbar();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenDialog = async () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await apiMykonos.clients.deleteClient({
        id: pago[clientesFields.dni],
      });
      setOpen(false);
      setIsCreated(true);
      openSnackbar({ text: "Pago eliminado correctamente" });
    } catch (error) {
      openSnackbar({ severity: "error", text: "Error al eliminar pago" });
    }
  };

  return (
    <>
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={handleOpenDialog}
      />
      {open && (
        <Dialog
          className="ClientesDialog"
          open={open}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth={true}
          fullScreen={fullScreen}
        >
          <DialogTitle>Eliminar Pago</DialogTitle>
          <DialogContent>
            Está seguro eliminar el pago: <b>{pago[clientesFields.nombre]}</b>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default PagosDeleteDialog;
