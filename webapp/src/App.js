import React from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import TopicPage from "./pages/TopicPage";
import CreateTopicPage from "./pages/CreateTopicPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/new-topic" component={CreateTopicPage} />
        <Route exact path="/topics/:id" component={TopicPage} />
        <Route path="/home" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;

// <Route exact path="/" component={} />
// <Route exact path="/new" component={} />
// <Route exact path="/reviews" component={} />
