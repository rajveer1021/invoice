import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { valuesByComma } from "../../services/Utils";

const ClientDetails = ({ clientDetails }) => {
  return (
    <>
      {clientDetails && (
        <>
          <Box className="client-details">
            <Typography className="client-content">
              {clientDetails?.company_name}
            </Typography>
            <Typography className="client-content">
              {clientDetails?.address_1}
            </Typography>
            <Typography className="client-content">
              {clientDetails?.address_2}
            </Typography>
            <Typography className="client-content">
              {valuesByComma(
                clientDetails?.city,
                clientDetails?.state,
                clientDetails?.postal_code
              )}
            </Typography>
            <Typography className="client-content">
              {clientDetails?.country}
            </Typography>
            {clientDetails?.custom_fields_attributes &&
              clientDetails?.custom_fields_attributes.map(
                ({ name, value }, index) =>
                  name && (
                    <Typography key={index} className="user-content">
                      {name}: {value}
                    </Typography>
                  )
              )}
          </Box>
        </>
      )}
    </>
  );
};

export default ClientDetails;
