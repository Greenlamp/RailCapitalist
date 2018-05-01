import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import railApp from "./reducers";

import RailCapitalist from "./components/RailCapitalist";
import NotFound from "./components/NotFound";

let store = createStore(railApp, applyMiddleware(thunk));

class App extends Component {
  render() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={RailCapitalist} />
        <Route component={NotFound} />
      </Switch>
      </BrowserRouter>
    </Provider>
  );
  }
}

export default App;
