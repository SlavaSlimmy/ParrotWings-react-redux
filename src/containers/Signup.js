import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { push } from 'react-router-redux'

import { withStyles } from 'material-ui/styles'

import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import SignupForm from '../components/SignupForm'

import { signupUser } from '../actions'

const styles = theme => ({
  appBar: {
  	borderRadius: '3px 3px 0px 0px'
  },
  title: {
  	color: 'white'
  },
})

class Signup extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClickLogin = this.handleClickLogin.bind(this)
	}	

	handleSubmit(values) {
		this.props.dispatch(signupUser(values.username, values.password, values.email))
	}

	handleClickLogin(e) {
		e.preventDefault()
		this.props.dispatch(push('/login'))
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
					            Signup
					          </Typography>
					        </Toolbar>
					      </AppBar>

						  <SignupForm onSubmit={this.handleSubmit} onClickLogin={this.handleClickLogin} />
						</Paper>
					</div>			    
			    </div>
		    </section>
		)
	}
}


Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps)(withStyles(styles)(Signup))