import React, { useState } from "react";
import {
  TextField,
  Typography,
  Stack,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";
import useResendVerification from "../../../api/hooks/auth/useResendVerification";
import { LoadingButton } from "@mui/lab";
const formStyles = {
  form: {
    height: "240px",
    width: { xs: "300px", md: "400px" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
    alignItems: "center",
    marginTop: "20px",
  },
  button: {
    width: { xs: "200px", md: "250px" },
    height: { md: "50px" },
    margin: "10px",
  },
};

const inputStyle = {
  sx: {
    backgroundColor: "#F1F3F5",
    width: { xs: "200px", md: "250px" },
    // color: theme.palette.primary.main,
  },
};

function RecoveryForm() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);
  const isAlertOpen = Boolean(alert);

  const closeAlert = () => {
    setAlert(null);
  };

  const { error, isLoading, mutate } = useResendVerification();

  const [isVaidEmail, setValidEmail] = useState(false);

  const handleSubmit = () => {
    mutate(
      { email },
      {
        onSuccess: (data) => {
          setAlert("تم الارسال");
          setValidEmail(true);
        },
        onError: (data) => {
          setAlert("هناك خطاء ما حاول مرة أخرى");
        },
      }
    );
  };

  return (
    <Stack justifyContent="center" alignItems="center" mt={{ md: 5 }}>
      <Card sx={formStyles.form}>
        <Typography variant="h5">User Email</Typography>
        <TextField
          id=""
          placeholder="email"
          type="Email"
          required
          sx={inputStyle.sx}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <LoadingButton
          loading={status === "loading"}
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          sx={formStyles.button}
        >
          submit
        </LoadingButton>
      </Card>
      {error || !isVaidEmail ? (
        <Snackbar
          open={isAlertOpen}
          autoHideDuration={6000}
          onClose={closeAlert}
        >
          <Alert
            onClose={closeAlert}
            variant="filled"
            elevation={6}
            severity="error"
            sx={{
              width: "100%",
              "& .MuiAlert-action": {
                marginLeft: 0,
              },
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            {alert}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={isAlertOpen}
          autoHideDuration={6000}
          onClose={closeAlert}
        >
          <Alert
            onClose={closeAlert}
            variant="filled"
            elevation={6}
            severity="success"
            sx={{
              width: "100%",
              "& .MuiAlert-action": {
                marginLeft: 0,
              },
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            {alert}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
}

export default RecoveryForm;
