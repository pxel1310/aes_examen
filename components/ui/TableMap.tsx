import {
  Box,
  Button,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { ChangeEvent, FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Mess from "./Mess";
import { AuthContext } from "../../context";

interface UserAll {
  name: string;
  email: string;
}

interface Column {
  id: "name" | "email" | "message";
  label: string;
  minWidth?: number;
  align?: "center";
}
type FormData = {
  name: string;
  email: string;
  password: string;
};

const columns: readonly Column[] = [
  {
    id: "email",
    label: "Email",
    align: "center",
  },
  {
    id: "name",
    label: "Nombre",
    minWidth: 255,
    align: "center",
  },
  {
    id: "message",
    label: "Mensaje Normal",
    minWidth: 255,
    align: "center",
  },
];

function createData(name: string, email: string): UserAll {
  return {
    name,
    email,
  };
}

interface Props {
  users: UserAll[];
}

export const UserAllTable: FC<Props> = ({ users }) => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rows = users.map((cipher) => {
    return createData(cipher.name, cipher.email);
  });

  rows = rows.map((row) => {
    return {
      ...row,
      message: user?.name != row.name ? <Mess messageAr={row.name} /> : <></>,
    };
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row["email"]}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default UserAllTable;
