import { FC, useContext, useState } from "react";
import {Button, FormControl} from "@mui/material";

import { AuthContext } from "../../context";
import { useForm } from "react-hook-form";
import { aesName } from "../../api";
import Swal from "sweetalert2";

interface IProps {
  messageAr: string;
}

export const EliminarTable: FC<IProps> = ({ messageAr }) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitEliminar = async (data: FormData) => {
    const obj = {
      user: user?.name,
      message: messageAr,
    };
    try {
      await aesName.post("/eliminarC/", obj);
      Swal.fire(
        "Mensaje Eliminado",
        `El mensaje ${messageAr} ha sido eliminado, por favor Recargar la pagina`,
        "success"
      );
    } catch (error) {
      Swal.fire("Error", `${error}`, "error");
    }
  };

  return (
    <FormControl fullWidth>
      <form onSubmit={handleSubmit(onSubmitEliminar)}>
        <div className="flex justify-center">
          <Button
            variant="contained"
            color="error"
            className="buttonError"
            sx={{ mt: 1, mb: 1, ml: 1 }}
            type="submit"
          >
            Eliminar
          </Button>
        </div>
      </form>
    </FormControl>
  );
};

export default EliminarTable;
