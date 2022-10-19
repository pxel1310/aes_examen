import { ChangeEvent, useContext, useState } from "react";
import { AesLayout } from "../../components/layouts";
import { NextPage } from "next";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  MenuItem,
  RadioGroup,
  TextField,
  Typography,
  Radio,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";

import Swal from "sweetalert2";

import NextLink from "next/link";

import { encrypt, decrypt } from "../../utils/AES";
import { AuthContext } from "../../context";

import { useForm } from "react-hook-form";
import { aesName } from "../../api";
import CipherForm from "../../components/ui/CipherForm";
import DecipherForm from "../../components/ui/DecipherForm";

type FormData = {
  user: string;
  type: string;
  cipher: number;
  message: string;
  messagein: string;
  key: string;
};

export const CipherPage: NextPage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [value1, setValue1] = useState("cifrar");

  const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    setValue1((event.target as HTMLInputElement).value);
  };

  return (
    <AesLayout
      title={"AES - Cipher"}
      pageDescription={"Cifrador en AES-128, AES-192, AES-256"}
    >
      {isLoggedIn && (
        <Box className="fadeIn">
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">
              <AlertTitle>Informativo</AlertTitle>
              Recuerda que todos los datos que ingreses serán guardados en la
              base de datos, por lo que no debes ingresar datos sensibles.
            </Alert>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              mb: 2,
            }}
            style={{
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: "primary.main" }}
            >
              Enciptador AES para mensajes y documentos
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              mb: 2,
              borderRadius: "10px",
            }}
          >
            <Grid item xs={12}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                <Typography variant="h6" component="h2">
                  ¿Qué desea hacer?
                </Typography>
              </FormLabel>
              <RadioGroup row value={value1} onChange={handleChange1}>
                <FormControlLabel
                  value="cifrar"
                  control={<Radio />}
                  label=" Cifrar "
                />
                <FormControlLabel
                  value="descifrar"
                  control={<Radio />}
                  label=" Descifrar "
                />
              </RadioGroup>
            </Grid>

            <Divider sx={{ my: 2 }} />
            {value1 === "cifrar" ? <CipherForm /> : <DecipherForm />}
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
      )}

      {!isLoggedIn && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <Typography
            variant="h1"
            component="h1"
            fontSize={80}
            fontWeight={200}
          >
            403 |
          </Typography>
          <Typography marginLeft={2}>
            No tienes permisos para acceder a esta ruta, por favor regresa al
            inicio
          </Typography>
        </Box>
      )}
    </AesLayout>
  );
};

export default CipherPage;
