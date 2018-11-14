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

interface IProps extends WithStyles<typeof styles> {}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    }
  });

const TanksComponent = (props: IProps) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <p>TankList here</p>
    </div>
  );
};

export const Tanks = withStyles(styles)(TanksComponent);
