import { FC, useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useAllUsers } from "../../hooks";
import { AuthContext } from "../../context";
import { useForm } from "react-hook-form";
import { aesName } from "../../api";
import Swal from "sweetalert2";

interface IProps {
  messageAr: string;
}

export const ShareTable: FC<IProps> = ({ messageAr }) => {
  const { users } = useAllUsers();
  const { user } = useContext(AuthContext);

  const [userMess, setUserMess] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setUserMess(event.target.value as string);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitShare = async (data: FormData) => {
    const obj = {
      userf: user?.name,
      messagef: messageAr,
      newuserf: userMess,
    };
    try {
      await aesName.post("/addUs", obj);
      Swal.fire(
        "Mensaje Compartido",
        `El mensaje ${messageAr} ha sido compartido con ${userMess}, por favor Recargar la pagina`,
        "success"
      );
    } catch (error) {
      Swal.fire("Error", `${error}`, "error");
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Usuarios</InputLabel>
      <form onSubmit={handleSubmit(onSubmitShare)}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userMess}
          label="Usuario"
          onChange={handleChange}
        >
          {
            // @ts-ignore
            users?.map((data) =>
              data.name !== user?.name ? (
                <MenuItem value={data.name}>{data.name}</MenuItem>
              ) : null
            )
          }
        </Select>
        <br />
        <Button
          className="buttonSuccess"
          variant="contained"
          sx={{ mt: 1, mb: 1, ml: 1 }}
          type="submit"
        >
          Compartir
        </Button>
      </form>
    </FormControl>
  );
};

export default ShareTable;
