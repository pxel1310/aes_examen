import { useState, useContext } from "react";
import NextLink from "next/link";

import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../context";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { useRouter } from "next/router";
import {NextPage} from "next";

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Todo: navegar a la pantalla que el usuario estaba
    router.replace("/");
  };

  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <AuthLayout title={"Ingresar"}>
      {!isLoggedIn && (
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
          <Box sx={{ width: 350, padding: "10px 20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h1" component="h1">
                  Iniciar Sesión
                </Typography>
                <Chip
                  label="No reconocemos ese usuario / contraseña"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ display: showError ? "flex" : "none" }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="Correo"
                  variant="filled"
                  fullWidth
                  {...register("email", {
                    required: "Este campo es requerido",
                    validate: validations.isEmail,
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  type="password"
                  variant="filled"
                  fullWidth
                  {...register("password", {
                    required: "Este campo es requerido",
                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="secondary"
                  className="circular-btn"
                  size="large"
                  fullWidth
                >
                  Ingresar
                </Button>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="end">
                <NextLink
                  href={
                    router.query.p
                      ? `/auth/register?p=${router.query.p}`
                      : "/auth/register"
                  }
                  passHref
                >
                  <Link underline="always">¿No tienes cuenta?</Link>
                </NextLink>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="end">
                <NextLink href="/" passHref>
                  <Link underline="always">Regresar al Inicio</Link>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
      {isLoggedIn && (
        // Mostrar error para mobile en caso de que el usuario ya esté logueado
        <Box
          sx={{
            width: 350,
            padding: "10px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h1">
            No derías estar aqui, mejor cierra sesión.
          </Typography>
          <Divider sx={{ width: "100%", margin: "20px 0" }} />
          <Button variant="contained" color="secondary" onClick={logout}>
            Cerrar Sesión
          </Button>
        </Box>
      )}
    </AuthLayout>
  );
};

export default LoginPage;
