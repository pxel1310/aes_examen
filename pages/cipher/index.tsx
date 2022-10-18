import { ChangeEvent, useContext, useState } from "react"
import { NextPage } from "next"
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
} from "@mui/material"
import Swal from "sweetalert2"
import NextLink from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"

import { AesLayout } from "../../components/layouts"
import { encrypt, decrypt } from "../../utils/AES"
import { AuthContext } from "../../context"
import { aesName } from "../../api"

type FormData = {
  user: string
  type: string
  cipher: number
  message: string
  messagein: string
  key: string
}

export const CipherPage: NextPage = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [value, setValue] = useState("message")
  const [value1, setValue1] = useState("cifrar")
  const [currency, setCurrency] = useState(128)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
    setValue1((event.target as HTMLInputElement).value)
  }

  const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrency(Number((event.target as HTMLInputElement).value))
  }

  const alertSuccessSweet = (
    message: String,
    messagein: String,
    key: String
  ) => {
    Swal.fire(
      "Realizado!",
      `Tu mensaje es: ${message},\n con llave: ${key},\n su mensaje cifrado es: ${messagein}\n,
      fue guardado en la base de datos`,
      "success"
    )
  }

  const onSubmitCifrar = async (data: FormData) => {
    const { message, key } = data
    let { messageinF } = encrypt(message, key)
    const objEnc = {
      user: user?.name || user?.email || "",
      type: value,
      cipher: currency,
      message,
      messagein: messageinF,
      key,
    }
    try {
      await aesName.post("/cipher/", objEnc)
      alertSuccessSweet(objEnc.message, objEnc.messagein, objEnc.key)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmitDescifrar = async (data: FormData) => {
    const { message, key } = data
    let { messageF } = decrypt(message, key)
    const objDec = {
      user: user?.name || user?.email || "",
      type: value,
      cipher: currency,
      message: messageF,
      messagein: message,
      key,
    }
    try {
      await aesName.post("/cipher/", objDec)
      alertSuccessSweet(objDec.message, objDec.messagein, objDec.key)
    } catch (error) {
      console.log(error)
    }
  }

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
            <form
              onSubmit={
                value1 === "cifrar"
                  ? handleSubmit(onSubmitCifrar)
                  : handleSubmit(onSubmitDescifrar)
              }
              noValidate
            >
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
                      id="filled-select-currency"
                      label="Select"
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
                  {value !== "message" && (
                    <Grid item xs={12}>
                      <TextField
                        type="file"
                        label="Archivo a encriptar"
                        variant="filled"
                        fullWidth
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
                      className={
                        value1 === "cifrar"
                          ? "circular-btn"
                          : "circular-btn buttonDe"
                      }
                      size="large"
                      fullWidth
                      type="submit"
                    >
                      {value1 === "cifrar" ? "Cifrar" : "Descifrar"}
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
            <Divider sx={{ my: 2 }} />
          </Box>
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
  )
}

export default CipherPage
