import { ChangeEvent, FC, useState } from "react";

import { ICipher } from "../../interfaces";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { EliminarTable, ShareTable } from "./";

interface Column {
  id:
    | "id"
    | "cipher"
    | "key"
    | "message"
    | "messagein"
    | "userCreated"
    | "eliminar"
    | "share";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "center";
}

const columns: readonly Column[] = [
  {
    id: "id",
    label: "ID",
    maxWidth: 10,
    align: "center",
  },
  { id: "cipher", label: "Cifrador AES", maxWidth: 50 },
  {
    id: "key",
    label: "Llave",
    align: "center",
    maxWidth: 70,
  },
  {
    id: "message",
    label: "Mensaje",
    minWidth: 255,
    align: "center",
  },
  {
    id: "messagein",
    label: "Mensaje Cifrado",
    minWidth: 255,
    align: "center",
  },
  {
    id: "userCreated",
    label: "Creador",
    minWidth: 175,
    align: "center",
  },
  {
    id: "eliminar",
    label: "Acciones",
    minWidth: 75,
    align: "center",
  },
  {
    id: "share",
    label: "Compartir",
    minWidth: 75,
    align: "center",
  },
];

interface Data {
  id: number;
  cipher: number;
  key: string;
  message: string;
  messagein: string;
  userCreated: string;
}

function createData(
  id: number,
  cipher: number,
  key: string,
  message: string,
  messagein: string,
  userCreated: string
): Data {
  return {
    id,
    cipher,
    key,
    message,
    messagein,
    userCreated,
  };
}

interface Props {
  ciphers: ICipher[];
}

export const StickyHeadTable: FC<Props> = ({ ciphers }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rows = ciphers.map((cipher, id) => {
    return createData(
      id,
      cipher.cipher,
      cipher.key,
      cipher.message,
      cipher.messagein,
      cipher.userCreated
    );
  });

  rows = rows.map((row) => {
    return {
      ...row,
      eliminar: (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <EliminarTable messageAr={row.message} />
          </Box>
        </>
      ),
      share: (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ShareTable messageAr={row.message} />
          </Box>
        </>
      ),
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
                    key={row.cipher}
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
export default StickyHeadTable;
