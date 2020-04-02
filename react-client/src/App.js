import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import { ProtectedRoutes } from "./protectedRoutes";
import Posts from "./components/posts";
import MyPosts from "./components/posts/MyPosts";
import AllPosts from "./components/posts/AllPosts";
import { toast } from "react-toastify";

toast.configure({
  draggable: false,
  autoClose: 7000
});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/registration" component={Registration} />
          <ProtectedRoutes path="/posts" component={Posts} />
          <ProtectedRoutes path="/my-posts" component={MyPosts} />
          <ProtectedRoutes path="/all-posts" component={AllPosts} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
