import React from 'react'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

import TextField from 'material-ui/TextField'

const locationHelper = locationHelperBuilder({})

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  allowRedirectBack: false,
  authenticatedSelector: state => state.auth.isAuthenticated,
  wrapperDisplayName: 'UserIsAuthenticated'
})

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  authenticatedSelector: state => !state.auth.isAuthenticated,
  wrapperDisplayName: 'UserIsNotAuthenticated'
})



export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField label={label}
  	error={touched && !!error} 
  	helperText={touched && error}
    {...input}
    {...custom}
  />
)