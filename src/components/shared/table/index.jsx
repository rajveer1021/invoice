import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  Paper,
  TablePagination,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdateInvoiceMutation } from "../../../services/Api";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomTable({
  rows,
  columns,
  onEditClick,
  statusUpdate,
  handlePreviewClick,
  handleDownload,
  handleDeleteInvoice,
}) {
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

  const handleEditClick = (id) => {
    if (onEditClick) {
      onEditClick(id);
    }
  };

  const handlePreviewInvoice = (id) => {
    if (handlePreviewClick) {
      handlePreviewClick(id);
    }
  };

  const handleDeleteClick = (id) => {
    if (handleDeleteInvoice) {
      handleDeleteInvoice(id);
    }
  };

  const handleDuplicateInvoice = (id) => {
    navigate(`/invoices/duplicate-invoice/${id}`);
  };

  const handleDownloadClick = (id, invoiceName) => {
    handleDownload(id, invoiceName);
  };
  const [updateInvoice] = useUpdateInvoiceMutation();

  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleCheckboxChange = async (id) => {
    const updatedSelectedRows = [...selectedRows];
    const index = updatedSelectedRows.findIndex((row) => row.id === id);

    if (index !== -1) {
      updatedSelectedRows.splice(index, 1);
    } else {
      updatedSelectedRows.push({ id, checked: true });
    }

    setSelectedRows(updatedSelectedRows);
    try {
      await UpdateInvoiceAPI(id, updatedSelectedRows);
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  const getPaymentStatus = (id) => {
    const row = rows.find((row) => row.id === id);

    if (row && row.status?.toLowerCase() === "paid") {
      return { label: "Unpaid", status: "unpaid" };
    } else {
      return { label: "Paid", status: "paid" };
    }
  };

  const UpdateInvoiceAPI = async (id) => {
    const row = rows.find((row) => row.id === id);
    const status =
      row && row.status?.toLowerCase() === "paid" ? "unpaid" : "paid";

    const { data, error } = await updateInvoice({
      invoice_id: id,
      invoice: {
        status: status,
      },
    });

    if (data) {
      statusUpdate(true);
    } else if (error) {
      statusUpdate(false);
    }
  };
  return (
    <Paper className="Table">
      <TableContainer>
        <Table>
          <TableHead className="tableHead">
            <TableRow>
              {columns.map((column, index) => (
                <Fragment key={index}>
                  <TableCell className="tableHeadingText">
                    {column.headerName}
                  </TableCell>
                </Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Fragment key={index}>
                  <TableRow>
                    {columns.map((column, index) => (
                      <Fragment key={index}>
                        <TableCell className="tableCell">
                          {column.field === "total" ? (
                            `${row.currency} ${Math.round(row[column.field])
                              .toFixed(2)
                              .toLocaleString()}`
                          ) : column.field === "status" ? (
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
                                justifyContent="space-between"
                                sx={{ width: "100%" }}
                                spacing={1}
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
                                  onClick={() =>
                                    handleDownloadClick(
                                      row.id,
                                      row.invoice_name
                                    )
                                  }
                                  size="small"
                                  sx={{ color: "#666666" }}
                                  className="tableIcons"
                                />

                                <ContentCopyIcon
                                  onClick={() => handleDuplicateInvoice(row.id)}
                                  size="small"
                                  sx={{ color: "#666666" }}
                                  className="tableIcons"
                                />
                                <DeleteIcon
                                  onClick={() => handleDeleteClick(row.id)}
                                  size="small"
                                  sx={{ color: "#990000" }}
                                  className="tableIcons"
                                />

                                <FormGroup className="tableIconsCheckbox center">
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        size="small"
                                        className="statusCheckbox"
                                        color="primary"
                                        checked={selectedRows.some(
                                          (selectedRow) =>
                                            selectedRow.id === row.id
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(row.id)
                                        }
                                      />
                                    }
                                    label={
                                      <Typography className="label">
                                        {getPaymentStatus(row.id).label}
                                      </Typography>
                                    }
                                  />
                                </FormGroup>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
