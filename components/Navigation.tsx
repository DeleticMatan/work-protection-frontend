import React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Tooltip,
} from "@material-ui/core";
import { Security, ExitToApp, Menu, Home, OndemandVideo, Group } from "@material-ui/icons";
import LoginModal from "./modals/LoginModal";
import { isBrowser } from "../lib/isBrowser";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const NavLinkWrapper = styled.div`
  margin-right: 10px;
  margin-left: 10px;
`;

const NavLink = styled(Typography as any)`
  text-transform: uppercase;
  cursor: pointer;
`;

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 12,
  },
});

const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;

export interface Props extends WithStyles<typeof styles> {}

// @ts-ignore
class Navigation extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      width: 0,
      name: null,
      isAdmin: null,
      sidemenu: false,
      loginModal: false,
    };
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.update);
    this.update();
    if (isBrowser) {
      this.setState({ name: localStorage.getItem("name") });
      this.setState({ isAdmin: localStorage.getItem("isAdmin") === "true" ? true : false });
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.update);
  };

  update = () => {
    this.setState({
      width: window.innerWidth,
      sidemenu: false,
      //loginModal: false,
    });
  };

  goToPage = (route: string) => {
    this.setState(
      {
        sidemenu: false,
      },
      () => Router.push(route),
    );
  };

  openLoginModal = () => {
    this.setState({
      sidemenu: false,
      loginModal: true,
    });
  };

  closeLoginModal = () => {
    this.setState({
      loginModal: false,
    });
  };

  renderLinks = () => {
    const { name, width, isAdmin } = this.state;
    if (name && width >= 768) {
      return (
        <>
          {isAdmin && (
            <NavLinkWrapper>
              <Link href="/admin">
                <NavLink variant="button" color="inherit">
                  Korisnici
                </NavLink>
              </Link>
            </NavLinkWrapper>
          )}
          <NavLinkWrapper>
            <Link href="/lessons">
              <NavLink variant="button" color="inherit">
                Lekcije
              </NavLink>
            </Link>
          </NavLinkWrapper>
        </>
      );
    } else {
      return null;
    }
  };

  renderSideList = () => {
    const { name, isAdmin } = this.state;
    return (
      <div style={{ width: "250px" }}>
        <div
          style={{
            backgroundColor: "#E64A19",
            width: "100%",
            height: "110px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            style={{
              color: "white",
            }}
            aria-label="Security"
          >
            <Security />
          </IconButton>
          <Typography style={{ color: "white" }} variant="h6" color="inherit">
            ZNR
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem onClick={() => this.goToPage("/")} button key={"Početna"}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Početna"} />
          </ListItem>
          {isAdmin && (
            <ListItem onClick={() => this.goToPage("/admin")} button key={"Korisnici"}>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary={"Korisnici"} />
            </ListItem>
          )}
          <ListItem onClick={() => this.goToPage("/lessons")} button key={"Lekcije"}>
            <ListItemIcon>
              <OndemandVideo />
            </ListItemIcon>
            <ListItemText primary={"Lekcije"} />
          </ListItem>
        </List>
        <Divider />
        {name ? (
          <List>
            <ListItem onClick={() => this.goToPage("/logout")} button key={"Odjavi se"}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={"Odjavi se"} />
            </ListItem>
          </List>
        ) : (
          <ListItem onClick={() => this.openLoginModal()} button key={"Prijavi se"}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={"Prijavi se"} />
          </ListItem>
        )}
      </div>
    );
  };

  renderAccountActions = () => {
    // @ts-ignore
    const { name, loginModal } = this.state;
    if (this.state.width >= 768) {
      if (name) {
        return (
          <RightWrapper>
            <Typography variant="caption" color="inherit">
              {name}
            </Typography>
            <Link href="/logout">
              <Tooltip title="Odjavi se" placement="bottom-start">
                <IconButton color="secondary">
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </Link>
          </RightWrapper>
        );
      }
      return (
        <Button variant="contained" color="secondary" onClick={() => this.openLoginModal()}>
          Prijavi se
        </Button>
      );
    } else {
      const { sidemenu } = this.state;
      return (
        <IconButton
          onClick={() =>
            this.setState({
              sidemenu: !sidemenu,
            })
          }
          color="inherit"
        >
          <Menu />
        </IconButton>
      );
    }
  };

  render() {
    const { classes } = this.props;
    const { sidemenu, loginModal } = this.state;
    return (
      <div className={classes.root}>
        <LoginModal handleClose={this.closeLoginModal} open={loginModal} />
        <AppBar position="fixed">
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <LinksWrapper>
              <Link href="/">
                <LogoWrapper>
                  <IconButton className={classes.menuButton} color="inherit" aria-label="Security">
                    <Security />
                  </IconButton>

                  <NavLink variant="h6" color="inherit" className={classes.grow}>
                    ZNR
                  </NavLink>
                </LogoWrapper>
              </Link>
              {this.renderLinks()}
            </LinksWrapper>

            {this.renderAccountActions()}

            <SwipeableDrawer
              onClose={() => this.setState({ sidemenu: false })}
              onOpen={() => this.setState({ sidemenu: true })}
              anchor="right"
              open={sidemenu && this.state.width < 768}
            >
              {this.renderSideList()}
            </SwipeableDrawer>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
