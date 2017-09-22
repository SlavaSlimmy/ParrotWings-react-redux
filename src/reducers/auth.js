import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, SIGNUP_USER_REQUEST, SIGNUP_USER_FAILURE, SIGNUP_USER_SUCCESS} from '../constants'
import jwtDecode from 'jwt-decode'

const initialAuth = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    isError: false,
    statusText: null
}

export default function auth(state  = initialAuth, action) {
  switch (action.type) {
    case SIGNUP_USER_REQUEST:
    case LOGIN_USER_REQUEST:
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'isError': false,
            'statusText': null
		});
    case SIGNUP_USER_FAILURE:
    case LOGIN_USER_FAILURE:
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'isError': true,
			'statusText': `${action.payload.statusText}`
		});		
    case LOGIN_USER_SUCCESS:
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': action.payload.token,
            'userName': jwtDecode(action.payload.token).username,
            'isError': false,
			'statusText': 'You have been successfully logged in.'
		});
    case SIGNUP_USER_SUCCESS:
        return Object.assign({}, state, {
            'isError': false,
            'statusText': 'You have been successfully sign up.'
        });        
    case LOGOUT_USER:
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'isError': false,
			'statusText': 'You have been successfully logged out.'
		});
    default:
      return state
  }
}
