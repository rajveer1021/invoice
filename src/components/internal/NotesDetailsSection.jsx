import React from "react";
import { Divider, Typography } from "@mui/material";

const NotesDetailsSection = ({ notesContent }) => {
  return (
    <>
      <Divider sx={{ width: "100%" }} className="mt-60 mb-18" />
      <Typography className="invoiceNotes-heading ">Invoice Note</Typography>
      <Typography
        className="notes mt-10"
        component="div"
        dangerouslySetInnerHTML={{
          __html: notesContent,
        }}
      />
    </>
  );
};

export default NotesDetailsSection;
