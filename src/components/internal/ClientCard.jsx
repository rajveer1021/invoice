import React from "react";
import { Box, Stack, Avatar, Typography, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import organisation from "../../assets/images/organisation.jpeg";
import DeleteClient from "./dialog-box/DeleteClient";

const ClientCard = ({ client,handleClientData }) => {
  const [dialogeOpen, setDialogeOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClientEditClick = (id) => {
    navigate(`/clients/edit-client/${id}`);
  };
  const handleDeleteClientClick = (id) => {
    setDialogeOpen(true);
  };

  const renderAmountContainer = (status, value, styling) => (
    <Box key={status} className="amountContainer">
      <Typography className="font-14">{status}</Typography>
      <Typography className={`mt-10 ${styling} center`}>
        {value} {Number(value) > 1 ? "Invoices" : "Invoice"}
      </Typography>
    </Box>
  );

  const amounts = [
    { status: "Total", value: client?.total, styling: "totalamountContainer" },
    { status: "Paid", value: client?.paid, styling: "paidamountContainer" },
    {
      status: "Unpaid",
      value: client?.unpaid,
      styling: "unpaidamountContainer",
    },
  ];

  return (
    <Box>
      <Box className="clientContainer">
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box className="clientNameContainer">
            <Avatar
              alt={client?.name}
              src={organisation}
              variant="square"
              className="clientImage"
            />
            <Box className="ml-10">
              <Typography className="clientName">{client?.name}</Typography>
              <Typography className="clientAddress">
                {client?.country}
              </Typography>
            </Box>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            <Box
              className="IconContainer editIcon center"
              onClick={() => handleClientEditClick(client?.id)}
            >
              <EditIcon className="icon" />
            </Box>
            <Box
              className="IconContainer deleteIcon center"
              onClick={() => handleDeleteClientClick(client?.id)}
            >
              <DeleteIcon className="icon" />
            </Box>
            <DeleteClient
              dialogeOpen={dialogeOpen}
              setDialogeOpen={setDialogeOpen}
              clientName={client?.name}
              id={client?.id}
              handleClientData={handleClientData}
            />
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%" }} className="mt-18 mb-18" />
        <Stack direction="row" spacing={2}>
          {amounts?.map((amount) =>
            renderAmountContainer(
              amount?.status,
              amount?.value,
              amount?.styling
            )
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default ClientCard;
