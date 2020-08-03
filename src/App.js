import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from '../src/Components/LoginPage/Login';
import Logout from '../src/Components/LoginPage/Logout';
import RegisterPage from '../src/Components/RegisterPage/Register';
import HomePage from '../src/Components/HomePage/Home';
import { history } from '../src/Components/Helper/history';
import {store} from './Components/store/index';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={<div className="loader" />}>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    )
  }

}

export default App;
