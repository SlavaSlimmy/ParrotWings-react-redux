import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import { Field, reduxForm } from 'redux-form'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { renderTextField } from '../utils'

const styles = theme => ({
  form: {
  	padding: '0px 15px 15px 15px'
  },
  textField: {
  	fontSize: '16px',
  },
  button: {
  	color: 'white'
  }
})

const validate = values => {
  const errors = {}
  const requiredFields = [ 'email', 'password' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required field'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.password && values.password.length < 5) {
    errors.password = 'Must be 5 characters or more'
  }    
  return errors
}

class LoginForm extends Component {
	render() {
		const { handleSubmit, classes, onClickSignup, auth } = this.props
		return (

			<form className={classes.form} onSubmit={handleSubmit}>
        <div className="alert alert--danger" hidden={!auth.isError}>
          <span>Error!</span> {auth.statusText}
        </div>      
				<Field name="email" type="text" 
          component={renderTextField} 
          label="Email" 
          fullWidth 
          required 
          margin="normal" 
          className={classes.textField} 
          disabled={auth.isAuthenticating} 
        />
				<Field name="password" type="password" 
          component={renderTextField} 
          label="Password" 
          fullWidth 
          required 
          margin="normal" 
          className={classes.textField}
          disabled={auth.isAuthenticating} 
        />

        <div className="login__btns">
        	<Button type="submit" className={classes.button} raised color="primary" disabled={auth.isAuthenticating}>Let me in</Button>
        </div>
        <div className="login__signup">
        	<Typography type="body1">No account yet? <a href="#" onClick={onClickSignup}>Create one</a></Typography>
        </div>						        						
			</form>

		)
	}
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClickSignup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(reduxForm({form: 'LoginForm',validate})(withStyles(styles)(LoginForm)))