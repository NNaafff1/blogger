import {
  TextField,
  Button,
  Typography,
  Stack,
  Card,
  InputAdornment,
  IconButton,
} from "@mui/material";
// import theme from "../../theme/theme";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import React from "react";

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
    backgroundColor: "#F1F3F5",
    width: { xs: "200px", md: "250px" },
    // color: theme.palette.primary.main,
  },
};

function RegisterForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [date, setDate] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [passwordCon, setPasswordCon] = React.useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);
    console.log("Date:", date);
    console.log("Phone:", phone);
    console.log("PasswodCon:", passwordCon);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordCon, setShowPasswordCon] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordCon = () => setShowPasswordCon((view) => !view);

  return (
    <Stack justifyContent="center" alignItems="center" mt={{ md: 5 }}>
      <Card sx={formStyles.form} onSubmit={handleLogin}>
        <Typography variant="h5">انشأ حساب</Typography>
        <TextField
          id=""
          placeholder="اسم المستخدم"
          type="text"
          sx={inputStyle.sx}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id=""
          placeholder="البريد الالكتروني"
          type="email"
          sx={inputStyle.sx}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          id=""
          placeholder="تاريخ الميلاد"
          type="date"
          sx={inputStyle.sx}
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <TextField
          id=""
          placeholder="رقم الهاتف"
          type="text"
          sx={inputStyle.sx}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <TextField
          id=""
          placeholder=" كلمة المرور"
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
          placeholder=" تأكيد كلمة المرور"
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

        <Button variant="contained" sx={formStyles.button}>
          انشأ حساب
        </Button>

        <Button
          onSubmit={handleLogin}
          type="submit"
          variant="contained"
          sx={formStyles.button}
          component={Link}
          to="/login"
        >
          تسجيل الدخول
        </Button>
      </Card>
    </Stack>
  );
}

export default RegisterForm;
