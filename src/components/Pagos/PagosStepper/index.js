import "./styles.css";
import { useState } from "react";

import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Button,
} from "@mui/material";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";

const steps = [
  { label: "Paso 1", component: <FormStepOne /> },
  { label: "Paso 2", component: <FormStepTwo /> },
];

export const PagosStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className="PagosStepper" sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label }, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label || ""} {...stepProps}>
              <StepLabel {...labelProps}>{label || ""}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            {steps[activeStep]?.label || ""}
          </Typography>
          <Box>
            <Button>REset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            {steps[activeStep].label}
          </Typography>
          <Box>
            {steps[activeStep].component}
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
          </Box>
          <Box>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PagosStepper;
