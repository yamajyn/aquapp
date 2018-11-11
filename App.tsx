import * as React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Amplify from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import { Header } from "./src/header";

Amplify.configure({
  Auth: {
    region: "ap-northeast-1", // REQUIRED - Amazon Cognito Region
    userPoolId: "ap-northeast-1_gsiOZ5rJX", //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: "2fkbpdjej3s1d063uses8oj5vc" //OPTIONAL - Amazon Cognito Web Client ID
  }
});

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/friends" component={Friends} />
    </Switch>
  </BrowserRouter>
);

const Home = () => (
  <div>
    <Header />
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
const Friends = () => (
  <div>
    <h2>Friends</h2>
    <p>ここにフレンズのリストを書きます</p>
  </div>
);

export default App;
