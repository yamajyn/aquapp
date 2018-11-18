import * as React from "react";
import { createStyles, WithStyles, Theme, withStyles } from "@material-ui/core";
import { SideNavi } from "./sideNavi";
import { Header } from "./header";
import { token } from "../util/api";
import { API } from "aws-amplify";
import { Line } from "react-chartjs-2";
import moment = require("moment");

interface IProps extends WithStyles<typeof styles> {}
interface IState {
  userName: string;
  password: string;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit * 4,
      display: "inline-block",
      width: "80vw",
      height: "70vh"
    }
  });

class LoginComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header />
        <SideNavi />
        <div className={classes.root} />
      </div>
    );
  }
}

export const Login = withStyles(styles)(LoginComponent);
