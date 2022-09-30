import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setOpen, setMessage } from "../store/userSlice";
import "./muisnackbar.scss";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return (
    <MuiAlert
      className="pink"
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
    />
  );
});

export const MuiSnackbar = (props) => {
  // const message = props.success;
  const open = useAppSelector((state) => state.user.open);
  const message = useAppSelector((state) => state.user.message);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setOpen(false));
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          className="pink"
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            className="pink"
            // classes={{ label: "my-class-name" }}
            // severity="success"
            sx={{ width: "100%" }}
          >
            <p>{message}</p>
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};
export default MuiSnackbar;
