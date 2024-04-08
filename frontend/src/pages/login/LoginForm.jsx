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
// import theme from "../../theme/theme";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "../../api/hooks/auth/useLogin";
import { LoadingButton } from "@mui/lab";

const formStyles = {
  form: {
    height: "440px",
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
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.text.primary,
    "&:hover": {
      // backgroundColor: theme.palette.primary.dark,
      color: "#fff",
    },
  },
};

const inputStyle = {
  sx: {
    backgroundColor: "#F1F3F5",
    width: { xs: "200px", md: "250px" },
    // color: theme.palette.primary.main,
  },
};

const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

function LoginForm() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const {
    error,
    isLoading,
    mutate,
    isSuccess,
    data,
    reset,
  } = useLogin();
  const [alert, setAlert] = useState(null);
  const [resend, setResend] = useState(false);

  const { loginUser } = useAuth();

    const closeAlert = () => {
      setAlert(null);
    };


  const handleLogin = (data) => {
    mutate(data);
  };
  const authError = error?.response?.data

  console.log(authError)

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  if (isSuccess) {
    reset();
    loginUser(data.data);
  }

   useEffect(() => {
     if (authError?.non_field_errors) {
       setAlert(authError.non_field_errors[0]);
       if (authError.non_field_errors[0] === "E-mail is not verified.") {
         setResend(true);
       }
     }
   }, [authError]);


  return (
    <Stack justifyContent="center" alignItems="center" mt={{ md: 5 }}>
      <Card sx={formStyles.form}>
        <Typography variant="h5">Login</Typography>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              {...field}
              placeholder="username"
              type="text"
              sx={inputStyle.sx}
              error={invalid}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              {...field}
              placeholder="password"
              type={showPassword ? "text" : "password"}
              sx={inputStyle.sx}
              error={invalid}
              helperText={error?.message}
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
          )}
        />

        {alert && (
          <Snackbar open={alert} autoHideDuration={3000} onClose={closeAlert}>
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
        )}

        {/* <Typography>{error ? error.message : ""}</Typography> */}

        <LoadingButton
          type="submit"
          variant="contained"
          sx={formStyles.button}
          onClick={handleSubmit(handleLogin)}
          loading={isLoading}
        >
          login
        </LoadingButton>
        {resend ? (
          <Button
            variant="contained"
            sx={formStyles.button}
            component={Link}
            to={`/resend`}
          >
            send verification 
          </Button>
        ) : (
          <></>
        )}

        <Button
          variant="contained"
          sx={formStyles.button}
          component={Link}
          to={`/register`}
        >
          sign in
        </Button>

        <Typography>
          did you forgit password? <Link to="/password/reset/">click here</Link>
        </Typography>
        <Link></Link>
      </Card>
    </Stack>
  );
}

export default LoginForm;
