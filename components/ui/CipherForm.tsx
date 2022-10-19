import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { encrypt, alertSuccess } from "../../utils/AES";
import { aesName } from "../../api";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../../context";

type FormData = {
  message?: string;
  key: string;
};

export const DecipherForm = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [value, setValue] = useState("message");
  const [currency, setCurrency] = useState(128);
  const [file, setFile] = useState(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrency(Number((event.target as HTMLInputElement).value));
  };

  const onSubmitCifrar = async ({ message, key }: FormData) => {
    let { messageF } =
      value === "message" ? encrypt(message, key) : encrypt(file, key);

    const obj = {
      user: user?.name || user?.email || "",
      type: value,
      cipher: currency,
      message: value === "message" ? message : file || "",
      messagein: messageF,
      key,
    };

    try {
      await aesName.post("/cipher/", obj);
      alertSuccess(obj.message, obj.messagein, obj.key);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitCifrar)} noValidate>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "725px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              <Typography variant="h6" component="h2">
                Elija una opción
              </Typography>
            </FormLabel>
            <RadioGroup row value={value} onChange={handleChange}>
              <FormControlLabel
                value="message"
                control={<Radio />}
                label="Mensaje"
              />
              <FormControlLabel
                value="file"
                control={<Radio />}
                label="Archivo"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tipo de cifrado"
              value={currency}
              onChange={handleChange2}
              variant="filled"
              fullWidth
              select
            >
              <MenuItem key={128} value={128}>
                AES - 128
              </MenuItem>
              <MenuItem key={192} value={192}>
                AES - 192
              </MenuItem>
              <MenuItem key={256} value={256}>
                AES - 256
              </MenuItem>
            </TextField>
          </Grid>
          {value === "message" && (
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Mensaje a encriptar"
                variant="filled"
                fullWidth
                multiline
                rows={3}
                {...register("message", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            </Grid>
          )}
          {value === "file" && (
            <Grid item xs={12}>
              <input
                type="file"
                id="file"
                name="file"
                accept=".txt"
                onChange={(e) => {
                  // Leer archivo txt y mostrarlo en consola
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.readAsText(file);
                  reader.onload = () => {
                    console.log(reader.result);
                    setFile(reader.result);
                  };
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label="Clave"
              type="text"
              variant="filled"
              fullWidth
              inputProps={{
                maxLength: currency / 8,
                minLength: currency / 8,
              }}
              {...register("key", {
                required: "Este campo es requerido, obvio",
                minLength: {
                  value: currency / 8,
                  message: `La clave debe tener al menos ${
                    currency / 8
                  } caracteres`,
                },
                maxLength: {
                  value: currency / 8,
                  message: `La clave debe tener máximo ${
                    currency / 8
                  } caracteres`,
                },
              })}
              error={!!errors.key}
              helperText={errors.key?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className={"circular-btn"}
              size="large"
              fullWidth
              type="submit"
            >
              Cifrar
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/" passHref>
              <Link underline="always">Regresar al Inicio</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default DecipherForm;
