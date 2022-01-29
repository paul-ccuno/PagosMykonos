import { useState } from "react";

import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Button,
} from "@mui/material";

const steps = ["Step 1", "Step 2", "Step 3"];

console.log("me estoy ejecutando");
export default function PagosStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          console.log(label);
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography variant="h6">{steps[activeStep]}</Typography>
          <Box>
            <Button>REset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6">{steps[activeStep]}</Typography>
          <Box>
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
}
