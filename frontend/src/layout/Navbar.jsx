import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonBase,
  Container,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  alpha,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import React, { useContext } from "react";
import useAuth from "../hooks/useAuth";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { authState, logoutUser, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const avatarMenu = (
    <div>
      <Button onClick={handleClick}>
        <Avatar alt="" />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate(`/users/${user?.user_id}`);
            handleClose();
          }}
          value="profile"
        >
          Profile
        </MenuItem>
        <MenuItem onClick={logoutUser}>Logout</MenuItem>
      </Menu>
    </div>
  );

  return (
    <AppBar position="static" sx={{ marginBottom: "50px" }}>
      <Toolbar sx={{ padding: "0 !important" }}>
        <Container maxWidth="lg">
          <Box width="100%">
            <Stack
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
            >
              <Stack flexDirection="row" alignItems="center" gap={1}>
                {isMatch ? <Sidebar /> : <></>}
                <Box sx={{ fontSize: "24px" }}>Bloger</Box>
              </Stack>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Stack flexDirection="row" alignItems="center" gap={4}>
                {!isMatch ? (
                  <ButtonBase
                    component={Link}
                    to="/"
                    disableRipple
                    sx={{ fontSize: "20px" }}
                  >
                    Home
                  </ButtonBase>
                ) : (
                  <></>
                )}

                {!authState ? (
                  <Button
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      color: "white",
                    }}
                    disableRipple
                    component={Link}
                    to={"/login"}
                  >
                    login
                  </Button>
                ) : (
                  avatarMenu
                )}
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
