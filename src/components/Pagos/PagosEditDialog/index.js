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

const PagosEditDialog = ({
  cuotas,
  setCuotas,
  open = false,
  setOpen = () => {},
}) => {
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
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
  );
};

export default PagosEditDialog;
