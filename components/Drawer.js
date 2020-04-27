import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import vinderTheme from "../components/theme";
import CreateIcon from "@material-ui/icons/Create";

import NoteIcon from "@material-ui/icons/Note";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Link from "next/link";

import NewPost from "./newpost";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
}));

function ResponsiveDrawer({ isAuthenticated }) {
  let categories, links, icons;
  if (isAuthenticated) {
    categories = ["Posts", "Tags", "Profile", "Sign out"];
    links = ["/posts", "/tags", `/profile/[id]`, "/signout"];
    icons = [
      <NoteIcon />,
      <span
        style={{
          alignContent: "bottom",
          textAlign: "center",
          fontSize: "1.5rem",
          paddingLeft: 3,
        }}
      >
        #
      </span>,
      <PersonIcon />,
      <ExitToAppIcon />,
    ];
  } else {
    categories = ["Posts", "Tags", "Sign in"];
    links = ["/posts", "/tags", "/signin"];
    icons = [
      <NoteIcon />,
      <span
        style={{
          alignContent: "bottom",
          textAlign: "center",
          fontSize: "1.5rem",
          paddingLeft: 3,
        }}
      >
        #
      </span>,
      <PersonIcon />,
    ];
  }

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <List>
        {categories.map((text, index) =>
          text !== "Profile" ? (
            <Link href={links[index]} key={text}>
              <ListItem style={{ color: "white" }} button>
                <ListItemIcon style={{ color: "#FFCC00" }}>
                  {icons[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ) : (
            <Link
              href={links[index]}
              as={`/profile/${JSON.parse(
                localStorage.getItem("vinder-username")
              )}`}
              key={text}
            >
              <ListItem style={{ color: "white" }} button>
                <ListItemIcon style={{ color: "#FFCC00" }}>
                  {icons[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          )
        )}
        {isAuthenticated && (
          <ListItem style={{ color: "white" }} button>
            <ListItemIcon style={{ color: "#FFCC00" }}>
              <CreateIcon />
            </ListItemIcon>
            <NewPost />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ color: "#FFCC00" }}>
            Vinder
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
              color="secondary"
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </div>
  );
}

export default ResponsiveDrawer;
