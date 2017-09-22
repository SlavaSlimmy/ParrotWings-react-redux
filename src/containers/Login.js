import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { push } from 'react-router-redux'

import { withStyles } from 'material-ui/styles'

import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import LoginForm from '../components/LoginForm'

import { loginUser } from '../actions'

const styles = theme => ({
  appBar: {
  	borderRadius: '3px 3px 0px 0px'
  },
  title: {
  	color: 'white'
  },
})

class Login extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClickSignup = this.handleClickSignup.bind(this)
	}	

	handleSubmit(values) {
		this.props.dispatch(loginUser(values.email, values.password))
	}

	handleClickSignup(e) {
		e.preventDefault()
		this.props.dispatch(push('/signup'))
	}	
	 
	render() {
		const { classes } = this.props
		return (
			<section className="content">
				<div className="container">
					<div className="logo">Parrot Wings</div>
					<div className="login">
						<Paper>
					      <AppBar position="static" className={classes.appBar}>
					        <Toolbar>
					          <Typography type="title" className={classes.title}>
					            Login
					          </Typography>
					        </Toolbar>
					      </AppBar>

						  <LoginForm onSubmit={this.handleSubmit} onClickSignup={this.handleClickSignup} />
						</Paper>
					</div>			    
			    </div>
		    </section>
		)
	}
}


Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps)(withStyles(styles)(Login))