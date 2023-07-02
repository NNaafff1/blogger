import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  Container,
  InputBase,
  Stack,
  Toolbar,
  alpha,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
const Search = styled("div")(({ theme }) => ({
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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

  return (
    <AppBar>
      <Toolbar>
        <Box width='100%'>
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
                  compnent={Link}
                  to="/"
                  disableRipple
                  sx={{ fontSize: "20px" }}
                >
                  Home
                </ButtonBase>
              ) : (
                <></>
              )}
             
              <Avatar />
            </Stack>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
