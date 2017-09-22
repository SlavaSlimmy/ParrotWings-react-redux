import * as types from '../constants'
import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'

import { normalize, schema } from 'normalizr'

export function loginUserRequest() {
  return {
    type: types.LOGIN_USER_REQUEST
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('id_token');
  return {
    type: types.LOGIN_USER_FAILURE,
    payload: {
      statusText: error.statusText
    }
  }
}

export function loginUserSuccess(token) {
  localStorage.setItem('id_token', token);
  return {
    type: types.LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function logout() {
    localStorage.removeItem('id_token');
    return {
        type: types.LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(push('/login'));
    }
}

export function loginUser(email, password, redirect="/") {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch('http://193.124.114.46:3001/sessions/create', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({email: email, password: password})
            })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                return response.text(); 
            })
            .then((data) => {
                if (typeof data === 'string') {
                    dispatch(loginUserFailure({statusText: data}))
                } else {
                    dispatch(loginUserSuccess(data.id_token))
                    dispatch(push(redirect));
                }

            })
    }
}


export function signupUserRequest() {
  return {
    type: types.SIGNUP_USER_REQUEST
  }
}

export function signupUserFailure(error) {
  return {
    type: types.SIGNUP_USER_FAILURE,
    payload: {
      statusText: error.statusText
    }
  }
}

export function signupUserSuccess() {
  return {
    type: types.SIGNUP_USER_SUCCESS,
  }
}

export function signupUser(username, password, email, redirect="/") {
    return function(dispatch) {
        dispatch(signupUserRequest());
        return fetch('http://193.124.114.46:3001/users', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: username, password: password, email: email})
            })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                return response.text(); 
            })
            .then((data) => {
                if (typeof data === 'string') {
                    dispatch(signupUserFailure({statusText: data}))
                } else {
                    dispatch(signupUserSuccess(data.id_token))
                    dispatch(loginUserSuccess(data.id_token))
                    dispatch(push(redirect));
                }

            })
    }
}

export function getUserInfoRequest() {
  return {
    type: types.GET_USER_INFO_REQUEST
  }
}

export function getUserInfoFailure(error) {
  return {
    type: types.GET_USER_INFO_FAILURE,
    payload: {
      statusText: error.statusText
    }
  }
}

export function getUserInfoSuccess(data) {
  return {
    type: types.GET_USER_INFO_SUCCESS,
    payload: {
      username: data.name,
      balance: data.balance,
    }    
  }
}

export function getUserInfo(token) {
    return function(dispatch) {
        dispatch(getUserInfoRequest());
        return fetch('http://193.124.114.46:3001/api/protected/user-info', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
            })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                return response.text();
            })
            .then((data) => {
                if (typeof data === 'string') {
                    dispatch(getUserInfoFailure({statusText: data}))
                    dispatch(logoutAndRedirect())
                } else {
                    dispatch(getUserInfoSuccess({
                        name: data.user_info_token.name,
                        balance: data.user_info_token.balance,
                    }))
                }
            })
    }
}


export function getTransactionsRequest() {
  return {
    type: types.GET_TRANSACTIONS_REQUEST
  }
}

export function getTransactionsFailure(error) {
  return {
    type: types.GET_TRANSACTIONS_FAILURE,
    payload: {
      statusText: error.statusText
    }
  }
}

export function getTransactionsSuccess(data) {
  return {
    type: types.GET_TRANSACTIONS_SUCCESS,
    payload: {
      allIds: data.result,
      byId: data.entities.byId,
    }    
  }
}

const byIdSchema = new schema.Entity('byId');
const transSchema = new schema.Array(byIdSchema);
export function getTransactions(token) {
    return function(dispatch) {
        dispatch(getTransactionsRequest());
        return fetch('http://193.124.114.46:3001/api/protected/transactions', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
            })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                return response.text();
            })
            .then((data) => {
                if (typeof data === 'string') {
                    dispatch(getTransactionsFailure({statusText: data}))
                } else {
                    const normalizedData = normalize(data.trans_token, transSchema);
                    dispatch(getTransactionsSuccess(normalizedData))
                    dispatch(sortTransactions('date', 'desc'))
                }
            })
    }
}

export function sortTransactions(property, order) {
  return {
    type: types.SORT_TRANSACTIONS,
    payload: {
      orderBy: property,
      order: order
    }      
  }
}

export function getSuggestionsRequest() {
  return {
    type: types.GET_SUGGESTIONS_REQUEST
  }
}

export function getSuggestionsFailure(error) {
  return {
    type: types.GET_SUGGESTIONS_FAILURE,
    payload: {
      statusText: error.statusText
    }
  }
}

export function getSuggestionsSuccess(data) {
  return {
    type: types.GET_SUGGESTIONS_SUCCESS,
    payload: {
      suggestions: data
    }    
  }
}

export function getSuggestions(filter, token) {
    return function(dispatch) {
        dispatch(getSuggestionsRequest());
        return fetch('http://193.124.114.46:3001/api/protected/users/list', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
                body: JSON.stringify({filter: filter})
            })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                return response.text(); 
            })
            .then((data) => {
                if (typeof data === 'string') {
                    dispatch(getSuggestionsFailure({statusText: data}))
                } else {
                    dispatch(getSuggestionsSuccess(data))
                }

            })
    }
}

export function clearSuggestions() {
  return {
    type: types.CLEAR_SUGGESTIONS
  }
}

export function setAutocompleteValue(value) {
  return {
    type: types.SET_AUTOCOMPLETE_VALUE,
    payload: {
      value: value
    }    
  }
}



export function setUsernameCreateTransaction(value) {
  return {
    type: types.CREATE_TRANSACTION_SET_USERNAME,
    username: value
  }
}

export function setAmountCreateTransaction(value) {
  return {
    type: types.CREATE_TRANSACTION_SET_AMOUNT,
    amount: value
  }
}

export function createTransactionRequest() {
  return {
    type: types.CREATE_TRANSACTION_REQUEST
  }
}

export function createTransactionFailure(error) {
  return {
    type: types.CREATE_TRANSACTION_FAILURE,
    payload: {
      statusText: error.statusText
    }
  }
}

export function createTransactionSuccess(data) {
  return {
    type: types.CREATE_TRANSACTION_SUCCESS,
    payload: {
      transaction: data.trans_token
    }    
  }
}

export function resetTransaction() {
  return {
    type: types.RESET_TRANSACTION
  }
}

export function createTransaction(name, amount, token) {
    return function(dispatch) {
        dispatch(createTransactionRequest());
        return fetch('http://193.124.114.46:3001/api/protected/transactions', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
                body: JSON.stringify({name: name, amount: amount})
            })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                return response.text(); 
            })
            .then((data) => {
                if (typeof data === 'string') {
                    dispatch(createTransactionFailure({statusText: data}))
                } else {
                    dispatch(createTransactionSuccess(data))
                    dispatch(setAutocompleteValue(''))
                    dispatch(resetTransaction())
                    dispatch(getUserInfo(token))
                    dispatch(getTransactions(token))
                }

            })
    }
}
