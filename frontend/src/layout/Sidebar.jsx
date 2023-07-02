import { ButtonBase, Drawer, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleSideBar = ()=> setOpen(!isOpen)


  return (
    <>
      <Drawer
        open={isOpen}
        onClose={() => setOpen(false)}
        anchor="left"
        sx={{
          padding: "100px",
        }}
      >
        <Stack gap="20px" width="200px" marginTop={3} padding={2}>
          <ButtonBase
            component={Link}
            to="/group"
            disableRipple
            sx={{ fontSize: "20px" }}
            onClick={toggleSideBar}
          >
            Home
          </ButtonBase>
        </Stack>
      </Drawer>
      <IconButton
        onClick={toggleSideBar}
        disableRipple
        disableFocusRipple
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Sidebar;
