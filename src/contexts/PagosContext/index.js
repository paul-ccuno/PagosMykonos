import { useState, createContext } from "react";

const PagosContext = createContext({
  pagos: {},
  setPagos: () => {},
});

export const PagosProvider = ({ children }) => {
  const [pagos, setPagos] = useState({});

  const value = { pagos, setPagos };
  return (
    <PagosContext.Provider value={value}>{children}</PagosContext.Provider>
  );
};

export default PagosContext;
