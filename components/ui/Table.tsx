import { ChangeEvent, FC, useContext, useState } from "react";

import { ICipher } from "../../interfaces";
import {
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
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context";
import { aesName } from "../../api";
import Swal from "sweetalert2";

interface Column {
  id:
    | "id"
    | "cipher"
    | "key"
    | "message"
    | "messagein"
    | "userCreated"
    | "buttons";
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
    id: "buttons",
    label: "Acciones",
    minWidth: 275,
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
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  console.log(ciphers);

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [message, setMessage] = useState("");
  const [share, setShare] = useState("");

  const onSubmit = async (data: FormData) => {
    if (message && share == "") {
      const obj = {
        user: user?.name,
        message: message,
      };

      try {
        const { data } = await aesName.post("/eliminarC/", obj);
        Swal.fire(
          "Mensaje Eliminado",
          `El mensaje ${message} ha sido eliminado, por favor Recargar la pagina`,
          "success"
        );
      } catch (error) {
        Swal.fire("Error", `${error}`, "error");
      }
    }

    if (share) {
      const obj = {
        userf: share,
        newuserf: message,
        messagef: user?.name,
      };
      try {
        const { data } = await aesName.post("/addUs/", obj);
        Swal.fire(
          "Mensaje Compartido",
          `El mensaje ${message} ha sido compartido con ${share}`,
          "success"
        );
      } catch (error) {
        Swal.fire("Error", `${error}`, "error");
      }
    }
  };

  rows = rows.map((row) => {
    return {
      ...row,
      buttons: (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <TextField
              type="text"
              value={row.message}
              //ocultar el mensaje
              hidden
              disabled
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              onClick={() => {
                setMessage(row.message);
              }}
            >
              Eliminar
            </button>

            <TextField type="text" onChange={(e) => setShare(e.target.value)} />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Compartir
            </button>
          </div>
        </form>
      ),
    };
  });

  let columnsTable = columns.map((column) => {
    return {
      field: column.id,
      headerName: column.label,
      width: column.minWidth,
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
