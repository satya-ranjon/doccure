import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Logo from "../common/Logo";
import { Link } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo (1).png";
import useAuthentication from "../../hooks/useAuthentication";
const pages = [
  { link: "/", label: "Home" },
  { link: "/service", label: "Service" },
  { link: "/blog", label: "Blog" },
  { link: "/contact", label: "Contact" },
];
const settings = [
  { link: "/", label: "Dashboard" },
  { link: "/logout", label: "Logout" },
];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, logoutUser } = useAuthentication();
  const toggleDrawer = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (data) => {
    if (data === "/logout") {
      logoutUser();
    }
    setAnchorElUser(null);
  };

  return (
    <div className=" py-5 ">
      <Container>
        <div className="flex justify-between items-center">
          <Button
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer}>
            <MenuIcon />
          </Button>
          <Drawer
            left={"left"}
            open={("left", mobileMenu)}
            onClose={toggleDrawer}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
              <List>
                {pages.map((item) => (
                  <ListItem key={item.link} disablePadding>
                    <ListItemButton>
                      <ListItemText
                        sx={{ textAlign: "center" }}
                        primary={item.label}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          <div className=" hidden lg:flex justify-start items-center gap-8">
            <Logo />

            {pages.map((item) => (
              <Link className=" text-indigo-500" key={item.link} to={item.link}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className=" sm:flex lg:hidden">
            <img src={logo} alt="" className=" w-32" />
          </div>

          <div>
            {user ? (
              <>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={user.photoURL} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.link}
                        onClick={() => handleCloseUserMenu(setting.link)}>
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outlined" startIcon={<Person2Icon />}>
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
