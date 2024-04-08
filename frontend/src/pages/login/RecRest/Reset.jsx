import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Card,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
// import theme from "../../../theme/theme";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, useParams } from "react-router-dom";
// import useHttpRequest from "../../../hooks/useHttpRequest";
import { LoadingButton } from "@mui/lab";
import useResetPassword from "../../../api/hooks/auth/useConfirmResetPassword";

const formStyles = {
  form: {
    height: { xs: "420px", md: "340px" },
    width: { xs: "300px", md: "400px" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: { xs: "10px", md: "20px" },
    alignItems: "center",
    marginTop: { xs: "20px", md: "20px" },
  },
  button: {
    width: { xs: "200px", md: "250px" },
    height: { md: "50px" },
    margin: "10px",
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.text.primary,
    // "&:hover": {
    //   backgroundColor: theme.palette.primary.dark,
    //   color: "#fff",
    // },
  },
};

const inputStyle = {
  sx: {
    backgroundColor: "#F1F3F5",
    width: { xs: "200px", md: "250px" },
    // color: theme.palette.primary.main,
  },
};

function ResetForm() {
  const [password, setPassword] = React.useState("");
  const [passwordCon, setPasswordCon] = React.useState("");
  const [alert, setAlert] = useState(null);
  const isAlertOpen = Boolean(alert);
  const navigate = useNavigate();

  const closeAlert = () => {
    setAlert(null);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordCon, setShowPasswordCon] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordCon = () => setShowPasswordCon((view) => !view);

  const { data, isLoading, isError, error, mutate, status } = useResetPassword({
    password,
    passwordCon,
  });

  const handleSubmit = () => {
    mutate(
      { password, passwordCon },
      {
        onSuccess: (data, variables, context) => {
          setAlert(data.detail);
          setPassword("");
          setPasswordCon("");
          navigate("/login");
        },
        onError: (error, variables, context) => {
          if (error?.response?.data?.new_password2) {
            setAlert(error?.response?.data?.new_password2[0]);
          } else {
            setAlert("هناك خطاء ما حاول مرة أخرى");
          }
        },
      }
    );
  };

  return (
    <Stack justifyContent="center" alignItems="center" mt={{ md: 5 }}>
      <Card sx={formStyles.form}>
        <Typography variant="h5">reset password</Typography>

        <TextField
          id=""
          placeholder="password "
          type={showPassword ? "text" : "password"}
          sx={inputStyle.sx}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id=""
          placeholder="confirm password"
          type={showPasswordCon ? "text" : "password"}
          sx={inputStyle.sx}
          value={passwordCon}
          onChange={(event) => setPasswordCon(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPasswordCon}>
                  {showPasswordCon ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          loading={status === "loading"}
          type="submit"
          variant="contained"
          sx={formStyles.button}
          onClick={handleSubmit}
        >
          تأكيد
        </LoadingButton>
      </Card>
      {error ? (
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

export default ResetForm;
