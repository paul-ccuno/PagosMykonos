import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import TablePagosEdit from "./TablePagosEdit";
import { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { Edit } from "@mui/icons-material";

const PagosEditDialog = ({ pago, cuotas, setCuotas }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    console.log(pago);
  }, []);

  return (
    <>
      <GridActionsCellItem
        icon={<Edit />}
        label="Edit"
        onClick={handleOpenDialog}
      />
      {open && (
        <Dialog
          className="PagosDialog"
          open={open}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth={true}
          fullScreen={fullScreen}
        >
          <DialogTitle>Modificar Cuotas</DialogTitle>
          <DialogContent>
            <TablePagosEdit />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default PagosEditDialog;
