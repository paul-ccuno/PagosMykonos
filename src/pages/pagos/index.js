import "./styles.css";
import PagosTable from "components/Pagos/PagosTable";
import PagosDialog from "components/Pagos/PagosDialog";

import { Container, Typography, Box, Button } from "@mui/material";
import { PagosProvider } from "contexts/PagosContext";

const pageStyles = {
  paddingTop: "1em",
  display: "flex",
  flexDirection: "column",
};

const Pagos = () => {
  return (
    <Container className="Pagos" maxWidth="xl" style={pageStyles}>
      <Typography variant="h4" align="center">
        Pagos
      </Typography>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <PagosProvider>
          <PagosDialog />
        </PagosProvider>
        <Button>Exportar</Button>
      </Box>
      <PagosTable />
    </Container>
  );
};

export default Pagos;
