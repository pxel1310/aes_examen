import { Box, Button, Typography } from "@mui/material";
import { AesLayout } from "../components/layouts";
import {NextPage} from "next";

const Custom404: NextPage = () => {
  return (
    <AesLayout
      title="Page not found"
      pageDescription="No hay nada que mostrar aquí"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Typography variant="h1" component="h1" fontSize={80} fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}>
          No hay nada en esta ruta, por favor regresa al inicio
        </Typography>
      </Box>
    </AesLayout>
  );
};

export default Custom404;
