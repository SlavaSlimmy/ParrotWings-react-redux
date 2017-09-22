import React, { Component } from 'react'
import { Provider } from 'react-redux'
import rootReducer from '../reducers'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Route, Switch, Redirect } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, ConnectedRouter } from 'react-router-redux'

import {loginUserSuccess} from '../actions'

import { createLogger } from 'redux-logger'

import { userIsAuthenticated, userIsNotAuthenticated } from '../utils'

import Login from './Login'
import Signup from './Signup'
import Home from './Home'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { lightBlue, red } from 'material-ui/colors'

//import jwtDecode from 'jwt-decode';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    error: red,
  },
})


const history = createHistory() 
const routingMiddleware = routerMiddleware(history)

const loggerMiddleware = createLogger()

const middleware = applyMiddleware(routingMiddleware, thunk, loggerMiddleware);

const store = createStore(
    rootReducer,
    middleware
  )

let token = localStorage.getItem('id_token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
}

export default class Root extends Component {
  render() {
    return (
    	<Provider store={store}>
    		<MuiThemeProvider theme={theme}>
			    <ConnectedRouter history={history}>
			      <Switch>
				    <Route exact path='/' component={userIsAuthenticated(Home)}/>
				    <Route path='/login' component={userIsNotAuthenticated(Login)}/>
				    <Route path='/signup' component={userIsNotAuthenticated(Signup)}/>
				    <Redirect path="*" to="/" />
			      </Switch>
			    </ConnectedRouter>    	
		    </MuiThemeProvider>
    	</Provider>
    );
  }
}
