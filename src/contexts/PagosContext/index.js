import { useState, createContext, useContext } from "react";

const PagosContext = createContext({
  pagos: {},
  setPagos: () => {},
  isCreated: false,
  setIsCreated: () => {},
  activeStep: 0,
  setActiveStep: () => {},
  steps: [],
  setSteps: () => {},
  isDisabledNext: true,
  setIsDisabledNext: () => {},
});

export const PagosProvider = ({ children }) => {
  const [pagos, setPagos] = useState({});
  const [isCreated, setIsCreated] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [steps, setSteps] = useState([]);

  const value = {
    pagos,
    setPagos,
    isCreated,
    setIsCreated,
    saldo,
    setSaldo,
    activeStep,
    setActiveStep,
    steps,
    setSteps,
    isDisabledNext,
    setIsDisabledNext,
  };
  return (
    <PagosContext.Provider value={value}>{children}</PagosContext.Provider>
  );
};

export const usePagos = () => useContext(PagosContext);

export default PagosContext;
