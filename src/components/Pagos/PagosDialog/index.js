import "./styles.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import PagosStepper from "../PagosStepper";
import { PagosProvider } from "contexts/PagosContext";

const PagosDialog = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenDialog}>
        Crear
      </Button>
      <PagosProvider>
        <Dialog
          className="PagosDialog"
          open={open}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth={true}
          fullScreen={fullScreen}
        >
          <DialogTitle>Agregar Nuevo Pago</DialogTitle>
          <DialogContent>
            <PagosStepper />
          </DialogContent>
        </Dialog>
      </PagosProvider>
    </>
  );
};

export default PagosDialog;
