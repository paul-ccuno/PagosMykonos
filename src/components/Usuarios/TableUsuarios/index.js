import DialogEditUsuarios from "../DialogEditUsuarios";
import { DataGrid } from "@mui/x-data-grid";
import { useUsuarios } from "contexts/UsuariosContext";
import { usuariosFields } from "models/Usuarios.model";
import { useEffect } from "react";
import apiMykonos from "services/apiMykonos";
import DialogDeleteUsuarios from "../DialogDeleteUsuarios";

const styles = {
  height: "100%",
  width: "100%",
};

const TableUsuarios = () => {
  const { users, setUsers, isCreated, setIsCreated } = useUsuarios();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const _users = await apiMykonos.users.getUsers();
    console.log(_users);
    setUsers(_users);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (isCreated) {
      const _users = await apiMykonos.users.getUsers();
      setUsers(_users);
      setIsCreated(false);
    }
  }, [isCreated]);

  return (
    <div className="Usuarios-table" style={styles}>
      <DataGrid
        rows={users}
        columns={[
          {
            field: [usuariosFields.username],
            headerName: "Correo electrónico",
            type: "string",
            minWidth: 200,
          },
          {
            field: "actions",
            headerName: "Acciones",
            type: "actions",
            minWidth: 100,
            getActions: (params) => [
              <DialogEditUsuarios />,
              <DialogDeleteUsuarios />,
            ],
          },
        ]}
        initialState={{
          pinnedColumns: {
            right: ["actions"],
          },
        }}
      />
    </div>
  );
};

export default TableUsuarios;
