import * as React from "react";
import { createStyles, WithStyles, Theme, withStyles } from "@material-ui/core";
import { SideNavi } from "./sideNavi";
import { Header } from "./header";
import { RouteComponentProps, withRouter } from "react-router";
import { token } from "../util/api";
import { API } from "aws-amplify";
import { Line } from "react-chartjs-2";
import moment = require("moment");

interface MatchParams {
  id: string;
}

interface IProps
  extends WithStyles<typeof styles>,
    RouteComponentProps<MatchParams> {}
interface IState {
  data: [
    {
      conditions: {
        temperature: string;
        water_temperature: string;
      };
      createdAt: string;
    }?
  ];
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

class ConditionComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    let option = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    API.get("AQUAPI", `tanks/condition/${this.props.match.params.id}`, option)
      .then(response => {
        this.setState({
          data: response.reverse()
        });
      })
      .catch(err => {
        console.log(err);
        // localStorage.clear();
        // this.props.history.push("/login");
      });
  }
  render() {
    const { classes } = this.props;

    const chartData = {
      labels: [],
      datasets: [
        {
          label: "気温",
          fill: false,
          lineTension: 0.4,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        },
        {
          label: "水温",
          fill: false,
          lineTension: 0.4,
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "rgba(185,92,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(185,92,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(185,92,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    };
    chartData.labels = this.state.data.map(d => {
      return moment(d.createdAt).format("YYYY/MM/DD HH:mm");
    });
    chartData.datasets[0].data = this.state.data.map(d => {
      return d.conditions.temperature;
    });
    chartData.datasets[1].data = this.state.data.map(d => {
      return d.conditions.water_temperature;
    });
    const options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 18,
              max: 24
            }
          }
        ],
        xAxes: [
          {
            type: "time", // specify time series type
            distribution: "linear", // use 'linear'(default) or 'series'
            ticks: {
              source: "data"
            }
          }
        ]
      }
    };

    return (
      <div>
        <Header />
        <SideNavi />
        <div className={classes.root}>
          <Line data={chartData} options={options} type="line" />
        </div>
      </div>
    );
  }
}

export const Condition = withStyles(styles)(withRouter(ConditionComponent));
