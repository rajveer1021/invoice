import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

export const CustomButton = ({
  title,
  handleClick,
  url,
  variant,
  fullWidth,
  endIcon,
  styles,
  startIcon,
  id,
  tooltipMessage,
  disabled = false,
  type = "submit",
}) => {
  const buttonProps = {
    variant: variant || "contained",
    fullWidth: fullWidth || true,
    className: styles || "",
    onClick: handleClick,
    endIcon: endIcon || null,
    startIcon: startIcon || null,
    type: type,
    disabled: disabled,
  };

  const disabledStyle = {
    "&.Mui-disabled": {
      opacity: 0.7,
    },
  };

  if (url) {
    return (
      <Button
        component={Link}
        to={url}
        sx={{ cursor: "pointer", ...disabledStyle }}
        {...buttonProps}
        id={id}
        disabled={disabled}
      >
        {title}
      </Button>
    );
  }

  return (
    <Tooltip title={tooltipMessage || ""} arrow placement="top">
      <span>
        <Button {...buttonProps} sx={disabledStyle}>
          {title}
        </Button>
      </span>
    </Tooltip>
  );
};