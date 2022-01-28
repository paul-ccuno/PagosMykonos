import "./styles.css";
import PagosTable from "components/Pagos/PagosTable";

import { Container, Typography, Box, Button } from "@mui/material";

const pagosStyles = {
  paddingTop: "1em",
  display: "flex",
  flexDirection: "column",
};

const Pagos = () => {
  return (
    <Container className="Pagos" maxWidth="xl" style={pagosStyles}>
      <Typography variant="h4" align="center">
        Pagos
      </Typography>
      <Box>
        <Button>Crear</Button>
      </Box>
      <PagosTable />
    </Container>
  );
};

export default Pagos;
