import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const SuccessBookmarkAlert = (props: Props) => {
  return (
    <Snackbar
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={props.open}
      onClose={props.handleClose}
    >
      <Alert severity="success">You successfully bookmark the book!</Alert>
    </Snackbar>
  );
};

export default SuccessBookmarkAlert;
