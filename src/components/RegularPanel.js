import React, { Component } from "react";
import firebase from "firebase";
import AppBar from "@material-ui/core/AppBar";
import DrawerRegular from "./DrawerRegular";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import ChatWindow from "./ChatWindow";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    paddingTop: 16
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class RegularPanel extends Component {
  state = {
    mobileOpen: false
  };
//test
  /* componentDidMount() {
    this.checkUser(this.props.currentUser)
  } */
//to prevent loading panel via url manual writing. If no user signed in direct to home page.
  checkUser = user => {
    if(!user.name) {
      this.props.directToHomePage()
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleLogOutClick = e => {
    //e.preventDefault();
    this.props.logOut();
  };

  handleChange = () => this.props.handleChange;
  handleKeyUp = () => this.props.handleKeyUp;
  message = (message, messageInputElement) =>
    this.props.message(message, messageInputElement);

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Regular Panel
            </Typography>
            <Button color="inherit" onClick={this.handleLogOutClick}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <DrawerRegular />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              <DrawerRegular />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <ChatWindow
            sendMessage={this.props.sendMessage}
            handleChange={this.props.handleChange}
            handleKeyUp={this.props.handleKeyUp}
            btnDisableStatus={this.props.btnDisableStatus}
            messages={this.props.messages}
            currentUser={this.props.currentUser}
			      handleKeyDown={this.props.handleKeyDown}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RegularPanel);
