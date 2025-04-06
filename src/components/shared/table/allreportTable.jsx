import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Stack,
} from "@mui/material";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { BASE_URL } from "../../../constant";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment } from "react";

export default function AllTable({ rows, columns }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePreviewInvoice = (id) => {
    if (id) {
      navigate(`/invoices/preview/${id}`);
    }
  };

  const handleEditClick = (id) => {
    if (id) {
      navigate(`/invoices/edit-invoice/${id}`);
    }
  };

  const handleDownloadClick = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/invoices/${id}/download`, {
        headers: {
          "Content-Type": "application/pdf",
        },
        follow: "follow",
      });

      if (!response.ok) {
        console.error(`Failed to download PDF. Status: ${response.status}`);
        return;
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `invoice_${id}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <Paper className="Table">
      <TableContainer>
        <Table>
          <TableHead className="tableHead">
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} className="tableHeadingText">
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Fragment key={index}>
                  <TableRow>
                    {columns.map((column) => (
                      <Fragment key={index}>
                        <TableCell className="tableCell">
                          {column.field === "status" ? (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "56px",
                                height: "24px",
                                backgroundColor:
                                  row[column.field]?.toLowerCase() === "paid"
                                    ? "#46962b"
                                    : row[column.field]?.toLowerCase() ===
                                      "unpaid"
                                    ? "#FFC400"
                                    : row[column.field]?.toLowerCase() === "due"
                                    ? "#990000"
                                    : row[column.field]?.toLowerCase() ===
                                      "draft"
                                    ? "#FFC400"
                                    : row[column.field]?.toLowerCase() ===
                                      "sent"
                                    ? "#2676a5"
                                    : "#4a7dff",

                                color: "#fff",
                                textAlign: "center",
                                textTransform: "capitalize",
                                borderRadius: "4px",
                              }}
                            >
                              {row[column.field]}
                            </span>
                          ) : column.field === "edit" ? (
                            <Box className="center">
                              <Stack
                                direction="row"
                                alignItems="start"
                                justifyContent="space-around"
                                spacing={2}
                              >
                                <RemoveRedEyeIcon
                                  onClick={() => handlePreviewInvoice(row.id)}
                                  size="small"
                                  sx={{ color: "#666666" }}
                                  className="tableIcons"
                                />
                                <EditIcon
                                  sx={{
                                    fontSize: 20,
                                    cursor: "pointer",
                                    color: "#666666",
                                  }}
                                  onClick={() => handleEditClick(row.id)}
                                  className="tableIcons"
                                />
                                <FileDownloadOutlinedIcon
                                  onClick={() => handleDownloadClick(row.id)}
                                  size="small"
                                  sx={{ color: "#666666" }}
                                  className="tableIcons"
                                />
                              </Stack>
                            </Box>
                          ) : (
                            row[column.field]
                          )}
                        </TableCell>
                      </Fragment>
                    ))}
                  </TableRow>
                  <TableRow style={{ height: "5px" }}></TableRow>
                </Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
