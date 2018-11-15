import * as React from "react";
import { createStyles, WithStyles, Theme, withStyles } from "@material-ui/core";
import { SideNavi } from "../sideNavi";
import { Header } from "./header";

interface IProps extends WithStyles<typeof styles> {}

const styles = (theme: Theme) =>
  createStyles({
    root: {}
  });

const ConditionComponent = (props: IProps) => {
  const { classes } = props;

  return (
    <div>
      <Header />
      <SideNavi />
    </div>
  );
};

export const Condition = withStyles(styles)(ConditionComponent);
