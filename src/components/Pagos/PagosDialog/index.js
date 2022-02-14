import "./styles.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  DialogActions,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext, useState } from "react";
import PagosStepper from "../PagosStepper";
import PagosContext from "contexts/PagosContext";
import FormStepOne from "../PagosStepper/FormStepOne";
import { CuotasInicialProvider } from "contexts/PagosContext/CuotasInicialContext";
import FormStepTwo from "../PagosStepper/FormStepTwo";
import apiMykonos from "services/apiMykonos";
import FormStepThree from "../PagosStepper/FormStepThree";
import { CuotasFinanciarProvider } from "contexts/PagosContext/CuotasFinanciarContext";
import { cuotasFields, pagosFields } from "models/Pagos.model";
import { format } from "date-fns";

const PagosDialog = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const {
    pagos,
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

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      },
      {
        label: "Cuotas iniciales",
        component: (
          <CuotasInicialProvider>
            <FormStepTwo />
          </CuotasInicialProvider>
        ),
      },
      {
        label: "Cuotas a financiar",
        component: (
          <CuotasFinanciarProvider>
            <FormStepThree />
          </CuotasFinanciarProvider>
        ),
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

  const handleSubmit = () => {
    const _pagos = JSON.parse(JSON.stringify(pagos));
    console.log(_pagos);
    _pagos[pagosFields.fechaInicial] = format(
      _pagos[pagosFields.fechaInicial],
      "yyyy-MM-dd"
    );
    for (let i = 0; i < _pagos[pagosFields.cuotasInicial].length; i++) {
      _pagos[pagosFields.cuotasInicial][i][cuotasFields.fecha] = format(
        _pagos[pagosFields.cuotasInicial][i][cuotasFields.fecha],
        "yyyy-MM-dd"
      );
    }
    for (let i = 0; i < _pagos[pagosFields.cuotasFinanciar].length; i++) {
      _pagos[pagosFields.cuotasFinanciar][i][cuotasFields.fecha] = format(
        _pagos[pagosFields.cuotasFinanciar][i][cuotasFields.fecha],
        "yyyy-MM-dd"
      );
    }
    // console.log(_pagos);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenDialog}>
        Crear
      </Button>

      {open && (
        <Dialog
          className="PagosDialog"
          open={open}
          maxWidth="sm"
          fullWidth={true}
          fullScreen={fullScreen}
        >
          <DialogTitle>Agregar Nuevo Pago</DialogTitle>
          <DialogContent>
            <PagosStepper />
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={handleCloseDialog}>Cancelar</Button>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Atras
                </Button>
                {activeStep === steps.length ? (
                  <Button variant="contained" onClick={handleSubmit}>
                    Enviar
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={isDisabledNext}
                    variant="contained"
                  >
                    {activeStep === steps.length - 1
                      ? "Finalizar"
                      : "Siguiente"}
                  </Button>
                )}
              </Box>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default PagosDialog;
