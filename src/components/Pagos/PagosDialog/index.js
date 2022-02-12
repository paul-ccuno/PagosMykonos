import "./styles.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext, useState } from "react";
import PagosStepper from "../PagosStepper";
import PagosContext from "contexts/PagosContext";
import FormStepOne from "../PagosStepper/FormStepOne";
import { CuotasProvider } from "contexts/PagosContext/CuotasContext";
import FormStepTwo from "../PagosStepper/FormStepTwo";
import apiMykonos from "services/apiMykonos";

const PagosDialog = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const {
    setPagos,
    steps,
    setSteps,
    activeStep,
    setActiveStep,
    isDisabledNext,
    setIsDisabledNext,
  } = useContext(PagosContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setIsDisabledNext(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenDialog = async () => {
    const _clients = await apiMykonos.clients.getClients(true);
    const _lots = await apiMykonos.lots.getLotsLN();
    const _dolar = await apiMykonos.divisas.getDolar();

    const STEPS = [
      {
        label: "Datos del pago",
        component: (
          <FormStepOne lots={_lots} clients={_clients} dolar={_dolar} />
        ),
        handleNext: () => {},
      },
      {
        label: "Cuotas iniciales",
        component: (
          <CuotasProvider>
            <FormStepTwo />
          </CuotasProvider>
        ),
        handleNext: () => {},
      },
      {
        label: "Cuotas a financiar",
        component: <CuotasProvider></CuotasProvider>,
        handleNext: () => {},
      },
    ];

    setSteps(STEPS);

    setOpen(true);
  };

  const handleCloseDialog = () => {
    setPagos({});
    setOpen(false);
    setActiveStep(0);
  };

  return (
    <>
      <Button color="success" variant="contained" onClick={handleOpenDialog}>
        Crear
      </Button>
      <Button variant="contained" onClick={handleOpenDialog}>
        Exportar
      </Button>
      {open && (
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
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>

            <Button onClick={handleNext} disabled={isDisabledNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default PagosDialog;
