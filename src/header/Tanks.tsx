import * as React from "react";
import {
  AppBar,
  createStyles,
  WithStyles,
  Theme,
  withStyles,
  Typography,
  IconButton,
  Button,
  Toolbar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { SideNavi } from "../sideNavi";
import { Header } from "./header";

interface IProps extends WithStyles<typeof styles> {}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    main: {
      width: "85%",
      backgroundColor: "#000",
      display: "inline-block",
      verticalAlign: "top"
    }
  });

const TanksComponent = (props: IProps) => {
  const { classes } = props;
  return (
    <div>
      <Header />
      <SideNavi />
      <div className={classes.main}>
      
      </div>
    </div>
  );
};

export const Tanks = withStyles(styles)(TanksComponent);
