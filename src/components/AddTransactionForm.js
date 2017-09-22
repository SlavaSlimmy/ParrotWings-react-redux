import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import { reduxForm } from 'redux-form'

import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Autocomplete from './Autocomplete' 
import TextField from 'material-ui/TextField'

const styles = theme => ({
  form: {
  	flexGrow: 1,
  	marginBottom: '30px'
  },
  textField: {
  	fontSize: '16px',
  	marginTop: '0px'
  },
  btns: {
  	textAlign: 'center',
  },
  button: {
  	color: 'white',
  	width: '100%',
  	maxWidth: '200px',
  	marginBottom: '10px'
  }
})

class AddTransactionForm extends Component {
	render() {
		const { classes, autocomplete, onSuggestionsFetchRequested, onSuggestionsClearRequested, onChangeAutocompleteValueRequested, handleSubmit, onChangeAmountValueRequested, formData } = this.props
    let amountView = ''
    if (formData.amount && (!isNaN(parseFloat(formData.amount)) && isFinite(formData.amount)) && formData.amount !== 0) {
      amountView = Math.abs(formData.amount)
    }
		return (
			<form className={classes.form} onSubmit={handleSubmit}>
				<Grid container spacing={24} align="flex-end">
					<Grid item xs={12} sm={12}>
                <div className="alert alert--danger" hidden={!formData.isError}>
                  <span>Error!</span> {formData.statusText}
                </div>           
                <div className="alert alert--success" hidden={formData.isError || !formData.statusText}>
                  <span>Well done!</span> {formData.statusText}
                </div>                
					</Grid>
					<Grid item xs={12} sm={12} md={5}>
						<Autocomplete 
              autocomplete={autocomplete} 
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onChangeAutocompleteValueRequested={onChangeAutocompleteValueRequested}
              disabled={formData.isLoading}
              />
					</Grid>
					<Grid item xs={12} sm={12} md={5}>
            <TextField
              name="transAmount"
              type="text"
              label="Amount"
              className={classes.textField}
              value={amountView}
              onChange={onChangeAmountValueRequested}
              margin="normal"
              fullWidth
              disabled={formData.isLoading}
            />          
					</Grid>					
					<Grid item xs={12} sm={12} md={2} className={classes.btns}>
						<Button type="submit" className={classes.button} raised color="primary">Commit</Button>
					</Grid>										
				</Grid>
			</form>

		)
	}	
}

AddTransactionForm.propTypes = {
  classes: PropTypes.object.isRequired,
  autocomplete: PropTypes.object.isRequired,
  onSuggestionsFetchRequested: PropTypes.func.isRequired,
  onSuggestionsClearRequested: PropTypes.func.isRequired,
  onChangeAutocompleteValueRequested: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChangeAmountValueRequested: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
}

export default reduxForm({form: 'AddTransactionForm'})(withStyles(styles)(AddTransactionForm))