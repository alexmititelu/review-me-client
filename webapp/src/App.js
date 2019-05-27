import React from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ArticlePage from "./pages/ArticlePage";
import CreateArticle from "./pages/CreateArticle";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/new-article" component={CreateArticle} />
        <Route exact path="/reviews/:id" component={ArticlePage} />
      </Switch>
    </Router>
  );
}

export default App;

// <Route exact path="/" component={} />
// <Route exact path="/new" component={} />
// <Route exact path="/reviews" component={} />
