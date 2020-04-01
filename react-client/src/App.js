import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import { ProtectedRoutes } from "./protectedRoutes";
import Posts from "./components/posts";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/registration" component={Registration} />
          <ProtectedRoutes path="/posts" component={Posts} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
