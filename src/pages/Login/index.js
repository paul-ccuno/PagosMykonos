import { Box, Button, Container, TextField, Typography } from "@mui/material";
import "./styles.css";

const Login = () => {
  return (
    <>
      <Container maxWidth="xs" sx={{ paddingTop: "2em" }}>
        <Typography
          variant="h4"
          align="center"
          component="div"
          noWrap
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Iniciar Sesión
        </Typography>
        <form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* <TextField
            variant="outlined"
            label="xd"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          /> */}

            <TextField
              variant="outlined"
              label="Usuario"
              type="text"
              size="small"
            />
            <TextField
              variant="outlined"
              label="Contraseña"
              type="password"
              size="small"
            />
            <Button variant="contained" type="">
              Iniciar Sesión
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default Login;
