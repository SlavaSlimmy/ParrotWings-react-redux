import React, { Component } from 'react'
import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import Hidden from 'material-ui/Hidden'
import withWidth from 'material-ui/utils/withWidth'
import { withStyles } from 'material-ui/styles'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'

import ExitToApp from 'material-ui-icons/ExitToApp'

const styles = theme => ({
  root: {
    color: 'white',
  },	
  appBar: {
    justifyContent: 'center',
    align: 'center',
    flexDirection:'row',
  },	
  container: {
  	flex: 1,
    maxWidth: '1170px',
  },	
  title: {
    flex: 1,
    fontFamily: "Gochi Hand, cursive",
    fontSize: '36px',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: '26px',
    }    
  },
  user: {
    color: 'white',
    fontSize: '14px',
  },  
  logoutButton: {
    marginRight: -12,
    marginLeft: 20,  	
    color: 'white',
  },
 
})

class Header extends Component {

	render() {
		const { classes, onLogout, username, balance } = this.props
		return (
			<div className={classes.root}>
		      <AppBar position="static" className={classes.appBar}>
		      	<div className={classes.container}>
		        <Toolbar>
		          <Typography type="title" color="inherit" className={classes.title}>
		            Parrot Wings
		          </Typography>
		          <div className={classes.user}>
			          <Hidden only={['xs', 'sm']}>
			          	<span>{username}</span>
			          </Hidden>
			          	<span className="badge">{balance} PW</span>
		          </div>
		          <IconButton className={classes.logoutButton} color="inherit" aria-label="Logout" onClick={onLogout}>
		            <ExitToApp />
		          </IconButton>
		        </Toolbar>
		        </div>
		      </AppBar>
		    </div>
		)
	}
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
}

export default compose(withStyles(styles), withWidth())(Header)
