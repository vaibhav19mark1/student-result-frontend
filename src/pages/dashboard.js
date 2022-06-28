import * as React from "react";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import PersonIcon from "@mui/icons-material/Person";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import background from "../college.jpeg";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleResult = () => {
    navigate("/sreport");
  };

  const handleTeacher = () => {
    navigate("/teachers");
  };

  const handleStudent = () => {
    navigate("/students");
  };

  const handleAllResult = () => {
    navigate("/results");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ marginRight: "65%" }}
          >
            Student Result Management System
          </Typography>
          <Button color="inherit" paddingLeft="60px" onClick={handleLogout}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography marginRight="30%" fontWeight="500">
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {JSON.parse(localStorage.getItem("user")).data.user.role === "student" ? (
            <ListItem button onClick={handleResult}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Result" />
            </ListItem>
          ) : (
            ""
          )}
          {JSON.parse(localStorage.getItem("user")).data.user.role === "admin" ? (
            <>
              <ListItem button onClick={handleTeacher}>
                <ListItemIcon>
                  <CoPresentIcon />
                </ListItemIcon>
                <ListItemText primary="Teachers" />
              </ListItem>
              <ListItem button onClick={handleStudent}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItem>
            </>
          ) : (
            ""
          )}
          {JSON.parse(localStorage.getItem("user")).data.user.role === "faculty" ? (
            <ListItem button onClick={handleAllResult}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="All Students Result" />
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Drawer>
      <Box
        style={{
          backgroundImage: `url(${background})`,
          paddingLeft: "420px",
          paddingTop: "280px",
        }}
        sx={{ flexGrow: 1, p: 54.6 }}
      >
        {/* <Typography fontSize="3rem" color= "#eeeee4" fontFamily= "cursive">
            Dashboard
          </Typography> */}
      </Box>
    </Box>
  );
}
