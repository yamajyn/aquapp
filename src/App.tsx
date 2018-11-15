import * as React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Amplify from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import { Header, Condition } from "./header";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { SideNavi } from "./sideNavi";
import { Tanks } from "./header/Tanks";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#222"
    },
    secondary: {
      main: "#f44336"
    }
  }
});

Amplify.configure({
  Auth: {
    region: "ap-northeast-1", // REQUIRED - Amazon Cognito Region
    userPoolId: "ap-northeast-1_mo5hcLxYA", //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: "7sqvchnkmk88ngob1rnco0r6bc" //OPTIONAL - Amazon Cognito Web Client ID
  },
  API: {
    endpoints: [
      {
        name: "AQUAPI",
        endpoint:
          "https://bzzbgbfsc7.execute-api.ap-northeast-1.amazonaws.com/dev/",
        region: "ap-northeast-1"
      }
    ]
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Tanks} />
        <Route exact path="/tank/condition/*" component={Condition} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
);
const Login = () => (
  <div>
    <Header />
    <Authenticator />
  </div>
);

export default App;
