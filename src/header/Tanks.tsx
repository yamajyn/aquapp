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
  Toolbar,
  List,
  GridList,
  Paper,
  GridListTile,
  GridListTileBar
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorderRounded";
import { SideNavi } from "../sideNavi";
import { Header } from "./header";
import { Link } from "react-router-dom";
import { API, Auth } from "aws-amplify";

interface IProps extends WithStyles<typeof styles> {}
interface IState {
  data: [
    {
      id: string;
      imageUrl: string;
      tankName: string;
    }?
  ];
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    main: {
      width: "80%",
      display: "inline-block",
      verticalAlign: "top",
      margin: theme.spacing.unit * 3
    },
    list: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
    },
    icon: {
      color: "white"
    }
  });

class TanksComponent extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    // Auth.signIn("yamamoto", "A5jyunnya27")
    //   .then(data => {
    //     alert("サインインに成功しました");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     alert("サインインに失敗しました");
    //     return;
    //   });
    const token = (() => {
      for (let strage in localStorage) {
        if (strage.includes("idToken")) {
          return localStorage.getItem(strage);
        }
      }
    })();
    let option = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    console.log("API Call");
    API.get("AQUAPI", "tanks", option)
      .then(response => {
        this.setState({
          data: response
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <div>
        <Header />
        <SideNavi />
        <div className={classes.main}>
          <div className={classes.list}>
            <GridList spacing={10} cols={3}>
              {data.map((tank, index) => {
                return (
                  <GridListTile key={index} cols={1}>
                    <Link to={`/tank/condition/${tank.id}`}>
                      <img src={tank.imageUrl} alt={tank.tankName} />
                      <GridListTileBar
                        title={tank.tankName}
                        titlePosition="bottom"
                        actionIcon={
                          <IconButton className={classes.icon}>
                            <StarBorderIcon />
                          </IconButton>
                        }
                        actionPosition="left"
                        className={classes.titleBar}
                      />
                    </Link>
                  </GridListTile>
                );
              })}
            </GridList>
          </div>
        </div>
      </div>
    );
  }
}

export const Tanks = withStyles(styles)(TanksComponent);
