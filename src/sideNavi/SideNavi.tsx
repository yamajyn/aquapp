import {
  withStyles,
  createStyles,
  Theme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  WithStyles
} from "@material-ui/core";
import * as React from "react";
import BubbleChartIcon from "@material-ui/icons/BubbleChartRounded";
import BarChartIcon from "@material-ui/icons/BarChartRounded";
import BrightnessIcon from "@material-ui/icons/Brightness7Rounded";
import OpacityIcon from "@material-ui/icons/OpacityRounded";
import PlayForWorkIcon from "@material-ui/icons/PlayForWorkRounded";

interface IProps extends WithStyles<typeof styles> {}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "15%",
      height: "100%",
      bottom: 0,
      top: theme.spacing.unit * 9,
      position: "absolute"
    }
  });

const SideNaviComponent = (props: IProps) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <BubbleChartIcon />
          </ListItemIcon>
          <ListItemText primary="水温" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="気温" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <OpacityIcon />
          </ListItemIcon>
          <ListItemText primary="湿度" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PlayForWorkIcon />
          </ListItemIcon>
          <ListItemText primary="気圧" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BrightnessIcon />
          </ListItemIcon>
          <ListItemText primary="照度" />
        </ListItem>
      </List>
    </div>
  );
};

export const SideNavi = withStyles(styles)(SideNaviComponent);
