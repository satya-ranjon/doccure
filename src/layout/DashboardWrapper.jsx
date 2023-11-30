import { Link, Outlet, useNavigate } from "react-router-dom";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { images } from "../constant";
import { Avatar, Menu, MenuItem, Skeleton, Tooltip } from "@mui/material";
import useAuthentication from "../hooks/useAuthentication";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DatasetIcon from "@mui/icons-material/Dataset";
import AddCardIcon from "@mui/icons-material/AddCard";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import DvrIcon from "@mui/icons-material/Dvr";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessIcon from "@mui/icons-material/Business";
import useAxiosSecure from "../hooks/useAxiosSecure";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const navLink = [
  {
    icon: <AccountCircleIcon />,
    label: "Profile",
    link: "/dashboard/profile",
    role: "user",
  },
  {
    icon: <AccountCircleIcon />,
    label: "Profile",
    link: "/dashboard/profile",
    role: "admin",
  },
  {
    icon: <AirlineSeatReclineExtraIcon />,
    label: "Test Results",
    link: "/dashboard/test-result",
    role: "user",
  },
  {
    icon: <BusinessIcon />,
    label: "Appointments",
    link: "/dashboard/my-appointments",
    role: "user",
  },
  {
    icon: <BusinessIcon />,
    label: "Reservation",
    link: "/dashboard/reservation",
    role: "admin",
  },
  {
    icon: <DvrIcon />,
    label: "Banners",
    link: "/dashboard/banners",
    role: "admin",
  },

  {
    icon: <DatasetIcon />,
    label: "Add Banner",
    link: "/dashboard/add-banner",
    role: "admin",
  },
  {
    icon: <PeopleAltIcon />,
    label: "Users",
    link: "/dashboard/users",
    role: "admin",
  },
  {
    icon: <AlignHorizontalLeftIcon />,
    label: "ALL Test",
    link: "/dashboard/all-test",
    role: "admin",
  },
  {
    icon: <AddCardIcon />,
    label: "Add Test",
    link: "/dashboard/add-test",
    role: "admin",
  },
];

const settings = [
  { link: "/", label: "Home" },
  { link: "/logout", label: "Logout" },
];

function DashboardWrapper() {
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:1024px)");
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, logoutUser } = useAuthentication();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const axios = useAxiosSecure();

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`/user/${user?.email}`)
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const handleCloseUserMenu = (data) => {
    if (data === "/logout") {
      logoutUser();
      return;
    }
    navigate(data);
    setAnchorElUser(null);
  };
  React.useEffect(() => {
    setOpen(matches);
  }, [matches]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" color="inherit" open={open}>
        <div className="flex justify-between items-center">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}>
              <MenuIcon />
            </IconButton>
            <Typography noWrap component="div">
              <img src={images.footerLogo} alt="" className=" w-32 " />
            </Typography>
          </Toolbar>
          <Box sx={{ flexGrow: 0, pr: 2 }}>
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
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </div>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {loading && (
            <>
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
              <Skeleton sx={{ mt: 2 }} variant="rectangular" height={35} />
            </>
          )}
          {!loading &&
            navLink.map((item, index) => {
              return (
                item.role == userData.role && (
                  <Link to={item.link} key={index}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                )
              );
            })}
        </List>
      </Drawer>
      <Main open={matches ? open : matches}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}

export default DashboardWrapper;
