import { Snackbar, Alert } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../context";

export const SnackBar = ({ type, massage, open }) => {
  const { setDataSnackBar } = useContext(UserContext);
  let openSnackBar = open;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openSnackBar = false;
    setDataSnackBar({});
  };

  return (
    <>
      {type !== undefined && massage !== undefined && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={type}
              sx={{ width: "100%" }}
            >
              {massage}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};
