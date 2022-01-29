import "./styles.css";
import PagosTable from "components/Pagos/PagosTable";
import PagosDialog from "components/Pagos/PagosDialog";

import { Container, Typography, Box } from "@mui/material";

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
        <PagosDialog />
      </Box>
      <PagosTable />
    </Container>
  );
};

export default Pagos;
