import { AesLayout } from "../../components/layouts";
import StickyHeadTable from "../../components/ui/Table";
import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { useAllUsers, useCipher } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";
import UserAllTable from "../../components/ui/TableMap";

export const SharePage = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const { data, isLoading } = useCipher(`${user?.name}`);
  const { users, isLoadingAll } = useAllUsers();
  console.log(users);
  // @ts-ignore
  // @ts-ignore
  return (
    <AesLayout
      title={"AES - Share"}
      pageDescription={"Comparte tus mensajes cifrados"}
    >
      {isLoggedIn && (
        <Box className="fadeIn">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
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
              Comparte tus mensajes cifrados
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "75rem",
              }}
            >
              {isLoading ? (
                <FullScreenLoading />
              ) : (
                // @ts-ignore
                <StickyHeadTable ciphers={data} />
              )}
              <br />

              {isLoadingAll ? (
                <FullScreenLoading />
              ) : (
                // @ts-ignore
                <UserAllTable users={users} />
              )}
              <Grid item xs={12} display="flex" justifyContent="end">
                <NextLink href="/" passHref>
                  <Link underline="always">Regresar al Inicio</Link>
                </NextLink>
              </Grid>
            </Box>
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
  );
};

export default SharePage;
