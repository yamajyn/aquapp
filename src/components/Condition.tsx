import * as React from "react";
import { createStyles, WithStyles, Theme, withStyles } from "@material-ui/core";
import { SideNavi } from "./sideNavi";
import { Header } from "./header";
import { RouteComponentProps, withRouter } from "react-router";
import { token } from "../util/api";
import { API } from "aws-amplify";
import { Line } from "react-chartjs-2";
import moment = require("moment");
import { Mode } from "../enum";

interface MatchParams {
  id: string;
}

interface IProps
  extends WithStyles<typeof styles>,
    RouteComponentProps<MatchParams> {}
interface IState {
  mode: Number;
  data: [
    {
      conditions: {
        temperature: string;
        water_temperature: string;
        humidity: string;
        pressure: string;
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
      mode: Mode.WaterTemperature,
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
  onClickSideNavi = (mode: Number) => {
    this.setState({ mode: mode });
  };
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
      switch (this.state.mode) {
        case Mode.WaterTemperature:
          return;
        case Mode.Temperature:
          return d.conditions.temperature;
        case Mode.Temperature:
          return d.conditions.temperature;
        case Mode.Pressure:
          return d.conditions.pressure;
        case Mode.Humidity:
          return d.conditions.humidity;
        case Mode.Illumination:
          return;
        default:
          return d.conditions.temperature;
      }
    });
    // chartData.datasets[1].data = this.state.data.map(d => {
    //   return d.conditions.humidity;
    // });
    const options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: parseInt(Math.min.apply(null, chartData.datasets[0].data)) - 1,
              max: parseInt(Math.max.apply(null, chartData.datasets[0].data)) + 1
            }
          }
        ],
        xAxes: [
          { type: "time", distribution: "linear", ticks: { source: "data" } }
        ]
      }
    }; // specify time series type // use 'linear'(default) or 'series'

    return (
      <div>
        <Header />
        <SideNavi onClick={this.onClickSideNavi} />
        <div className={classes.root}>
          <Line data={chartData} options={options} type="line" />
        </div>
      </div>
    );
  }
}

export const Condition = withStyles(styles)(withRouter(ConditionComponent));
