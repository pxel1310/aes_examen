import type { NextPage } from "next"
import { Box, Divider, Typography } from "@mui/material"

import { AesLayout } from "../components/layouts"

import { CardInfo } from "../components/ui"
import { useContext } from "react"
import { AuthContext } from "../context"

const HomePage: NextPage = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext)

  return (
    <AesLayout
      title={"AES - Home"}
      pageDescription={"Lo mejor de lo mejor para cifrar en AES"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          className="fadeIn"
          sx={{ color: "primary.main" }}
        >
          Bienvenido a AES - Examen de Seguridad
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" component="h2" className="fadeIn">
          Ofrecemos la mejor practicidad y seguridad en la encriptación de
          archivos, y la mejor manera de compartirlos con tus amigos.
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 2,
          "@media (min-width: 500px)": {
            gridTemplateColumns: "1fr 1fr 1fr",
          },
        }}
      >
        {!isLoggedIn && (
          <CardInfo
            title={"Inicio De Sesión"}
            description={
              "Inicia sesión para cifrar tus mensajes o documentos, ademas con la opcion de " +
              "compartir tus mensajes cifrados con tus amigos"
            }
            type={0}
          />
        )}

        <CardInfo
          title={"Cifrador"}
          description={
            "Puedes cifrar tus mensajes o documentos, con cifrado AES, seleccionando el tamaño " +
            "de la llave : 128, 192 o 256 bits"
          }
          type={1}
        />
        <CardInfo
          title={"Compartir mensaje secreto"}
          description={
            "Comparte tus mensajes cifrados con tus amigos, sin necesidad de compartir tu llave, " +
            "solo seleccionado a quien quieres compartir"
          }
          type={2}
        />
        {isLoggedIn && (
          <CardInfo
            title={"Cerrar Sesión"}
            description={"Cierra tu sesión actual"}
            type={3}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6" component="h2" className="fadeIn">
          Realizado por: <strong>Ayala González Ian</strong>,{" "}
          <strong>Edwin Uriel Astudillo Perez</strong>,
          <strong>Axel Gomez Herrera</strong>,
          <strong>Garcia Gomez Jaret Xchel</strong>
        </Typography>
      </Box>
    </AesLayout>
  )
}

export default HomePage
