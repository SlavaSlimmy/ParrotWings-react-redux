import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Typography from 'material-ui/Typography'
import AddTransactionForm from '../components/AddTransactionForm'

import { getSuggestions, clearSuggestions, setAutocompleteValue, setUsernameCreateTransaction, setAmountCreateTransaction, createTransactionFailure, createTransaction } from '../actions'

class AddTransaction extends Component {
	constructor(props) {
		super(props)
		this.handleSuggestionsFetchRequest = this.handleSuggestionsFetchRequest.bind(this)
		this.handleSuggestionsClearRequest = this.handleSuggestionsClearRequest.bind(this)
		this.handleChangeAutocompleteValueRequest = this.handleChangeAutocompleteValueRequest.bind(this)
		this.handleChangeAmountValueRequest = this.handleChangeAmountValueRequest.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSuggestionsFetchRequest(value) {
		const inputValue = value.value; 
		this.props.dispatch(getSuggestions(inputValue, this.props.token))		
	}

	handleSuggestionsClearRequest() {
		this.props.dispatch(clearSuggestions())				
	}

	handleChangeAutocompleteValueRequest(e, value) {
		this.props.dispatch(setAutocompleteValue(value.newValue))		
		this.props.dispatch(setUsernameCreateTransaction(value.newValue))
	}	

	handleChangeAmountValueRequest(e) {
		const inputValue = e.target.value.trim()
		this.props.dispatch(setAmountCreateTransaction(inputValue))
	}		

	handleSubmit() {
		const formData = this.props.createTransaction

		let errorText = ''
		if (!formData.username) {
			errorText = errorText + 'You must enter username. '
		}
		if (!formData.amount) {
			errorText = errorText + 'You must enter PW amount. '
		} else {
			if (!(!isNaN(parseFloat(formData.amount)) && isFinite(formData.amount))) {
				errorText = errorText + 'Amount must be numeric. '
			}
	        if (formData.amount <= 0) {
	            errorText = errorText + 'Amount must be more than 0. '
	        }
	        if (formData.amount > this.props.balance) {
	            errorText = errorText + 'Not enough PW to remit the transaction. '
	        }			
		}

		if (errorText) {
			this.props.dispatch(createTransactionFailure({statusText: errorText }))	
		} else {
			this.props.dispatch(createTransaction(formData.username, formData.amount, this.props.token))	
		}
	}	

	render() {
		const { autocomplete, createTransaction } = this.props
		return (
			<div className="add-transaction">
		      <Typography type="title" gutterBottom>
		        Add transaction
		      </Typography>
		      <AddTransactionForm
		      formData={createTransaction}
		      autocomplete={autocomplete}
		      onSuggestionsFetchRequested={this.handleSuggestionsFetchRequest} 
		      onSuggestionsClearRequested={this.handleSuggestionsClearRequest} 
		      onChangeAutocompleteValueRequested={this.handleChangeAutocompleteValueRequest}
		      onChangeAmountValueRequested={this.handleChangeAmountValueRequest}
		      onSubmit={this.handleSubmit} 
		      />
		    </div>
		)
	}
}

AddTransaction.propTypes = {
  autocomplete: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  createTransaction: PropTypes.object.isRequired,
  balance: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
	return {
		autocomplete: state.autocomplete,
		token: state.auth.token,
		createTransaction: state.createTransaction,
		balance: state.userInfo.balance
	}
}

export default connect(mapStateToProps)(AddTransaction)