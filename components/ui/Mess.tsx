import { FC, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context";
import { aesName } from "../../api";
import Swal from "sweetalert2";
import { AccountCircle } from "@mui/icons-material";

interface IProps {
  messageAr: string;
}

type FormData = {
  message: string;
  name: string;
};

export const Mess: FC<IProps> = ({ messageAr }) => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitShare = async ({ message, name }) => {
    let obj = {
      user: name,
      message,
      userCreated: user?.name,
    };
    try {
      await aesName.post("/mess", obj);
      Swal.fire(
        "Mensaje Personal Creado",
        `El mensaje se ha enviado, a ${name}`,
        "success"
      );
    } catch (error) {
      Swal.fire("Error", `${error}`, "error");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <FormControl variant="standard">
        <form onSubmit={handleSubmit(onSubmitShare)} noValidate>
          <TextField
            value={messageAr}
            {...register("name", { required: true })}
            InputProps={{
              readOnly: true,
            }}
            style={{
              display: "none",
            }}
          ></TextField>
          <TextField
            id="input-with-icon-textfield"
            label="Mensaje priv"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            {...register("message", { required: true })}
          />
          <Button
            variant="contained"
            sx={{ mt: 1, mb: 1, ml: 1 }}
            type="submit"
            className="buttonWarning"
          >
            Enviar
          </Button>
        </form>
      </FormControl>
    </Box>
  );
};

export default Mess;
