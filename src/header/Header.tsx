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

export const HeaderComponent = (props: IProps) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            AQUA
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export const Header = withStyles(styles)(HeaderComponent);
