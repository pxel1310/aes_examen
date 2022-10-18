import React, { FC, useContext } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  CoPresentOutlined,
  LoginOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { AuthContext } from "../../context";

interface Props {
  title: string;
  description: string;
  type: number;
}

export const CardInfo: FC<Props> = ({ title, description, type }) => {
  const router = useRouter();

  const navigateTo = (url: string) => {
    router.push(`/${url}`);
  };

  const action: string[] = [
    "Iniciar Sesión",
    "Cifrar",
    "Compartir",
    "Cerrar Sesión",
  ];
  const routes: string[] = ["auth/login", "cipher", "share"];

  const iconReq = (type: number): any => {
    if (type === 0) {
      return <LoginOutlined />;
    }
    if (type === 1) {
      return <VpnKeyOutlined />;
    }
    if (type === 2) {
      return <CoPresentOutlined />;
    }
    if (type === 3) {
      return <LoginOutlined />;
    }
  };

  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="fadeIn"
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Divider />

      {type <= 2 && (
        <ListItem button onClick={() => navigateTo(`${routes[type]}`)}>
          <ListItemIcon>{iconReq(type)}</ListItemIcon>
          <ListItemText primary={action[type]} />
        </ListItem>
      )}

      {type === 3 && (
        <ListItem button onClick={logout}>
          <ListItemIcon>{iconReq(type)}</ListItemIcon>
          <ListItemText primary={action[type]} />
        </ListItem>
      )}
    </Card>
  );
};
