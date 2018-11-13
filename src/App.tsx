import * as React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Amplify from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import { Header } from "./header";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { SideNavi } from "./sideNavi";

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
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/tanks" component={Tanks} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
);

const Home = () => (
  <div>
    <Header />
    <SideNavi />
    <h2>Home</h2>
    <p>Welcome to ようこそ</p>
    <Link to="/login">ログイン</Link>
  </div>
);
const Login = () => (
  <div>
    <Header />
    <Authenticator />
  </div>
);
const Tanks = () => (
  <div>
    <h2>Tanks</h2>
    <p>ここリスト</p>
  </div>
);

export default App;
