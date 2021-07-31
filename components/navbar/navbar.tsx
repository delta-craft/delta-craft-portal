/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { signOut, signIn } from "next-auth/client";
import Link from "next/link";
import classnames from "classnames";
import { UserConnections } from "../../src/db/entities/UserConnections";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useRouter } from "next/router";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { useAppContext } from "../../src/hooks";
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";

const Navbar: React.FC = () => {
  const router = useRouter();
  const indx =
    router.pathname === "/teams" ? 0 : router.pathname === "/players" ? 1 : 100;

  const [isRouting, setIsRouting] = useState(false);

  const handleRoutingEnd = () => {
    setIsRouting(false);
  };
  const handleRoutingStart = () => {
    setIsRouting(true);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRoutingStart);
    router.events.on("routeChangeComplete", handleRoutingEnd);
    return () => {
      router.events.off("routeChangeStart", handleRoutingStart);
      router.events.off("routeChangeComplete", handleRoutingEnd);
    };
  }, []);

  const { session } = useAppContext();
  const [tab, setTab] = useState(indx);

  const links = session?.links as UserConnections;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleTabChange = (index: number) => {
    setTab(index);

    const l = index === 0 ? "/teams" : "/players";

    setTimeout(() => {
      router.push(l);
    }, 150);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar className="container">
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography
          variant="h6"
          component="div"
          // sx={{ flexGrow: 1 }}
          className="pointer"
        >
          <Link href="/" passHref>
            <div className="text-white">DeltaCraft</div>
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Tabs
            value={tab}
            color="primary"
            onChange={(event, index) => handleTabChange(index)}
            centered
          >
            <Tab label="Týmy" />
            <Tab label="Hráči" />
          </Tabs>
        </Box>
        {session && (
          <div className="">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              <Avatar alt={session.user.name} src={session.user.image} />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Box style={{ minWidth: 150 }} className="text-center my-2">
                <Typography variant="h6">{session.user.name}</Typography>
              </Box>
              <Divider className="mb-2" />
              <Link href={`/players/${links?.name}`} passHref>
                <MenuItem
                  onClick={handleClose}
                  disabled={!links?.name || links?.name?.length < 1}
                >
                  <div>
                    Můj profil
                    {(!links?.name || links?.name?.length < 1) && (
                      <div>
                        <Typography variant="caption">
                          Nejprve si nastavte nickname
                        </Typography>
                      </div>
                    )}
                    {(!links?.name || links?.name?.length < 1) && (
                      <div>
                        <Typography variant="caption">
                          Nastavení profilu
                        </Typography>
                      </div>
                    )}
                  </div>
                </MenuItem>
              </Link>
              {links?.teamId && (
                <Link href={`/teams/${links?.teamId}`} passHref>
                  <MenuItem onClick={handleClose}>Můj tým</MenuItem>
                </Link>
              )}
              <Divider />
              <Link href="/login" passHref>
                <MenuItem onClick={handleClose}>Přihlášení na server</MenuItem>
              </Link>
              <Divider />
              <Link href="/profile" passHref>
                <MenuItem onClick={handleClose}>Nastavení profilu</MenuItem>
              </Link>
              <Link href="/teams/create" passHref>
                <MenuItem onClick={handleClose}>Nastavení týmu</MenuItem>
              </Link>
              <Divider />
              <Link href={`/consents`} passHref>
                <MenuItem onClick={handleClose}>Moje souhlasy</MenuItem>
              </Link>
              <Divider />
              <MenuItem onClick={() => signOut()}>Odhlásit se</MenuItem>
            </Menu>
          </div>
        )}
        {!session && (
          <Button color="inherit" onClick={() => signIn("discord")}>
            Přihlásit se
          </Button>
        )}
      </Toolbar>
      <Fade in={isRouting}>
        <LinearProgress className="routing-progress" />
      </Fade>
    </AppBar>
  );
};

export default Navbar;
