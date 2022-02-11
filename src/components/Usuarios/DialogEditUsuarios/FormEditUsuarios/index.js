import { yupResolver } from "@hookform/resolvers/yup";
import { useClientes } from "contexts/ClientesContext";
import { useSnackbar } from "contexts/SnackbarContext";
import Usuario, { usuariosFields } from "models/Usuarios.model";
import { useForm } from "react-hook-form";
import apiMykonos from "services/apiMykonos";

import {
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import { textFieldStyles } from "components/General/TextField";

const FormEditUsuarios = ({ setOpen, user, handleCloseDialog }) => {
  const { openSnackbar } = useSnackbar();
  const { setIsCreated } = useClientes();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Usuario),
  });

  const handleSubmitUpdate = async (values) => {
    try {
      const res = await apiMykonos.users.updateUser({ data: values });
      console.log(res);
      setIsCreated(true);
      setOpen(false);
      openSnackbar({ text: "Cliente modificado correctamente" });
    } catch (error) {
      console.error(error);
      openSnackbar({ severety: "error", text: "Error al modificar cliente" });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitUpdate)}>
      <DialogTitle>
        Modificar Cliente <b>{user[usuariosFields.dni]}</b>
      </DialogTitle>
      <DialogContent
        sx={{
          paddingTop: "1rem !important",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          {...textFieldStyles}
          {...register(usuariosFields.nombre)}
          label="Contraseña actual"
          error={errors[usuariosFields.nombre]?.message && true}
          helperText={errors[usuariosFields.nombre]?.message}
        />
      </DialogContent>
      <DialogActions></DialogActions>
    </form>
  );
};

export default FormEditUsuarios;
