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
  const requiredFields = [ 'username', 'email', 'password', 'repassword' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required field'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.username && values.username.length < 5) {
    errors.username = 'The name must be more than 5 letters'
  }  
  if (values.password && values.password.length < 5) {
    errors.password = 'Must be 5 characters or more'
  }
  if (values.password && values.repassword && values.password !== values.repassword) {
    errors.repassword = 'Passwords do not match'
  }         
  return errors
}

class SignupForm extends Component {
	render() {
		const { handleSubmit, submitting, classes, onClickLogin, auth } = this.props
		return (

			<form className={classes.form} onSubmit={handleSubmit}>
        <div className="alert alert--danger" hidden={!auth.isError}>
          <span>Error!</span> {auth.statusText}
        </div>      
				<Field name="username" type="text" component={renderTextField} label="Name" fullWidth required margin="normal" className={classes.textField} />
        <Field name="email" type="text" component={renderTextField} label="Email" fullWidth required margin="normal" className={classes.textField} />
				<Field name="password" type="password" component={renderTextField} label="Password" fullWidth required margin="normal" className={classes.textField}/>
        <Field name="repassword" type="password" component={renderTextField} label="Re-type password" fullWidth required margin="normal" className={classes.textField}/>

        <div className="login__btns">
        	<Button type="submit" className={classes.button} raised color="primary" disabled={submitting}>Sign me up</Button>
        </div>
        <div className="login__signup">
        	<Typography type="body1">Have account? <a href="#" onClick={onClickLogin}>Login here</a></Typography>
        </div>						        						
			</form>

		)
	}
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClickLogin: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(reduxForm({form: 'SignupForm',validate})(withStyles(styles)(SignupForm)))