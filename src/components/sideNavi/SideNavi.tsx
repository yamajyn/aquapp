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
import { Mode }from "../../enum"

interface IProps extends WithStyles<typeof styles> {
  onClick(mode: Number): void
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      verticalAlign: "top",
      width: "15%",
      height: "100%",
      display: "inline-block"
    }
  });

const SideNaviComponent = (props: IProps) => {
  const { classes, onClick } = props;
  return <div className={classes.root}>
      <List component="nav">
        <ListItem button onClick={() => onClick(Mode.WaterTemperature)}>
          <ListItemIcon>
            <BubbleChartIcon />
          </ListItemIcon>
          <ListItemText primary="水温" />
        </ListItem>
      <ListItem button onClick={() => onClick(Mode.Temperature)}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="気温" />
        </ListItem>
      <ListItem button onClick={() => onClick(Mode.Humidity)}>
          <ListItemIcon>
            <OpacityIcon />
          </ListItemIcon>
          <ListItemText primary="湿度" />
        </ListItem>
      <ListItem button onClick={() => onClick(Mode.Pressure)}>
          <ListItemIcon>
            <PlayForWorkIcon />
          </ListItemIcon>
          <ListItemText primary="気圧" />
        </ListItem>
      <ListItem button onClick={() => onClick(Mode.Illumination)}>
          <ListItemIcon>
            <BrightnessIcon />
          </ListItemIcon>
          <ListItemText primary="照度" />
        </ListItem>
      </List>
    </div>;
};

export const SideNavi = withStyles(styles)(SideNaviComponent);
