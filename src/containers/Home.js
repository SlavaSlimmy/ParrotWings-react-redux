import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

import Header from '../components/Header'
import AddTransaction from './AddTransaction'
import History from '../components/History'

import { logoutAndRedirect, getUserInfo, getTransactions, sortTransactions, setUsernameCreateTransaction, setAmountCreateTransaction, setAutocompleteValue} from '../actions'

const styles = theme => ({
  content: {
    maxWidth: '1140px',
    margin: '20px auto 0'
  },	
  Paper: {
    padding: '19px',
    marginBottom: '30px'
  },  
})

class Home extends Component {
	constructor(props) {
		super(props)
		this.handleLogout = this.handleLogout.bind(this)
		this.handleRequestSort = this.handleRequestSort.bind(this)
		this.handleCopyTrans = this.handleCopyTrans.bind(this)
	    this.props.dispatch(getUserInfo(this.props.token))
	    this.props.dispatch(getTransactions(this.props.token))
	}		

	handleLogout(e) {
		e.preventDefault()
		this.props.dispatch(logoutAndRedirect())
	}

	handleRequestSort(e, property) {
		let order = 'desc';

        if (this.props.transactions.orderBy === property && this.props.transactions.order === 'desc') {
          order = 'asc';
        } 

		this.props.dispatch(sortTransactions(property, order))
	}	

	handleCopyTrans(e, data) {
		this.props.dispatch(setAutocompleteValue(data.username))
		this.props.dispatch(setUsernameCreateTransaction(data.username))
		this.props.dispatch(setAmountCreateTransaction(Math.abs(data.amount)))
	}	

	render() {
		const { classes, username, balance, transactions } = this.props
		return (
			<div className="home">

				<Header onLogout={this.handleLogout} username={username} balance={balance} />
			    <section className={classes.content}>
			    	<div className="container">
			    		<Paper elevation={4} className={classes.Paper}>
			    			<AddTransaction />
			    			<History transactions={transactions} onRequestSort={this.handleRequestSort} onRequestCopyTrans={this.handleCopyTrans} />
			    		</Paper>
			    	</div>
			    </section>
				
		    </div>
		)
	}
}


Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
		token: state.auth.token,
		username: state.userInfo.userName,
		balance: state.userInfo.balance,
		transactions: state.transactions
	}
}

export default connect(mapStateToProps)(withStyles(styles)(Home))