import React from "react";
import styles from "../../styles/Layout.module.scss";
import { Navbar } from "../navbar";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { theme } from "../theme/theme";
import classNames from "classnames";
import { Footer } from "../footer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: theme.palette?.background.default,
    },
  })
);

const Layout: React.FC = ({ children }) => {
  const classes = useStyles(theme);

  return (
    <div className={classNames(styles.main, classes.main)}>
      <Navbar />
      <div className={styles.toolbar} />
      <main className="">{children}</main>
      <div className={styles.footer} />
      <Footer />
    </div>
  );
};

export default Layout;
