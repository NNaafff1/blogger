import {
  TextField,
  Button,
  Typography,
  Stack,
  Card,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useRegister from "../../api/hooks/auth/useRegister";
import { LoadingButton } from "@mui/lab";

const formStyles = {
  form: {
    height: { xs: "620px", md: "740px" },
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
    // backgroundColor: "#F1F3F5",
    width: { xs: "200px", md: "250px" },
    // color: theme.palette.primary.main,
  },
};

const schema = yup.object({
  first_name: yup.string().required("first name is required").max(20).min(5),
  last_name: yup.string().required("last name is required").max(20).min(5),
  email: yup.string().required("email is required").email(),
  birthday: yup.date().required("birthay is required"),
  password1: yup
    .string()
    .required("password is required")
    .matches(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).*$",
      "password should contain at least one lowercase, at least one uppercase letter and at least on of !@#$%^&*()"
    ),
  password2: yup
    .string()
    .oneOf([yup.ref("password1"), null], "Password must match")
    .required("password confirmation is required"),
});

function RegisterForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      birthday: null,
      email: "",
      password1: "",
      password2: "",
    },
    resolver: yupResolver(schema),
  });

  const { isLoading, isError, mutate, error,data } = useRegister();


  const handleRegister = (data) => {
    data = {
      ...data,
      birthday: dayjs(data.birthday).format("YYYY-MM-DD"),
    };
    console.log(data)
    mutate(data);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordCon, setShowPasswordCon] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordCon = () => setShowPasswordCon((view) => !view);

  return (
    <Stack justifyContent="center" alignItems="center" mt={3} mb={3}>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Card sx={formStyles.form}>
          <Typography variant="h5">Sign in</Typography>
          <Controller
            control={control}
            name="first_name"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={error?.message}
                label="first name"
                type="text"
                sx={inputStyle.sx}
              />
            )}
          />
          <Controller
            control={control}
            name="last_name"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={error?.message}
                label="last name"
                type="text"
                sx={inputStyle.sx}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={error?.message}
                placeholder="email"
                type="email"
                sx={inputStyle.sx}
              />
            )}
          />
          <Controller
            control={control}
            name="birthday"
            render={({ field, fieldState: { invalid, error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  sx={inputStyle.sx}
                  error={invalid}
                  helperText={error?.message}
                  label="birthday"
                  disableFuture
                  maxDate={dayjs(
                    new Date().setFullYear(new Date().getFullYear() - 16)
                  )}
                  format="YYYY-MM-DD"
                  views={["year", "month", "day"]}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            control={control}
            name="password1"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                label="password1"
                error={invalid}
                helperText={error?.message}
                type={showPassword ? "text" : "password"}
                sx={inputStyle.sx}
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
          <Controller
            control={control}
            name="password2"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                error={invalid}
                helperText={error?.message}
                label="confirm password"
                type={showPasswordCon ? "text" : "password"}
                sx={inputStyle.sx}
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
            )}
          />
          <LoadingButton
            variant="contained"
            type="submit"
            sx={formStyles.button}
            loading={isLoading}
          >
            sign in
          </LoadingButton>
          <Button
            type="submit"
            variant="contained"
            sx={formStyles.button}
            component={Link}
            to="/login"
          >
            login
          </Button>
        </Card>
      </form>
    </Stack>
  );
}

export default RegisterForm;
