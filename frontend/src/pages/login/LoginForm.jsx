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
import React, { useContext } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import { Link } from "react-router-dom";
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

function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loginUser, authError } = useContext(AuthContext);


  
  const handleLogin = (event) => {
    // event.preventDefault();
    console.log(email,password);
    loginUser({email:email,password:password});
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Stack justifyContent="center" alignItems="center" mt={{ md: 5 }}>
      <Card sx={formStyles.form}>
        <Typography variant="h5">تسجيل الدخول</Typography>
        <TextField
          id=""
          placeholder="اسم المستخدم"
          type="text"
          sx={inputStyle.sx}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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

        <Typography>{authError ? authError.detail : ""}</Typography>

        <Button
          onSubmit={handleLogin}
          type="submit"
          variant="contained"
          sx={formStyles.button}
          onClick={handleLogin}
        >
          تسجيل الدخول
        </Button>

        <Button
          variant="contained"
          sx={formStyles.button}
          component={Link}
          to={`/register`}
        >
          انشأ حساب
        </Button>

        <Typography>
          نسيت كلمةالمرور؟ <Link>اضغط هنا</Link>
        </Typography>
        <Link></Link>
      </Card>
    </Stack>
  );
}

export default LoginForm;
