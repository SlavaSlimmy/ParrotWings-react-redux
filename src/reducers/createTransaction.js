import {CREATE_TRANSACTION_SET_USERNAME, CREATE_TRANSACTION_SET_AMOUNT, CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_FAILURE, CREATE_TRANSACTION_SUCCESS, RESET_TRANSACTION} from '../constants'

const initialCreateTransaction = {
    username: '',
    amount: null,    
	transaction: {},
    isLoading: false,
    isError: false,
    statusText: ''
}

export default function createTransaction(state  = initialCreateTransaction, action) {
  switch (action.type) {
    case CREATE_TRANSACTION_SET_USERNAME:
        return Object.assign({}, state, {
            'username': action.username,
            'isError': false,
            'statusText': ''             
        }); 
    case CREATE_TRANSACTION_SET_AMOUNT:
        return Object.assign({}, state, {
            'amount': action.amount,
            'isError': false,
            'statusText': ''            
        });           
    case CREATE_TRANSACTION_REQUEST:
        return Object.assign({}, state, {
            'isLoading': true,
            'isError': false,
            'statusText': ''            
		});
    case CREATE_TRANSACTION_FAILURE:
        return Object.assign({}, state, {
            'isLoading': false,
            'isError': true,
            'statusText': action.payload.statusText
		});
    case CREATE_TRANSACTION_SUCCESS:
        return Object.assign({}, state, {
        	'transaction': action.payload.transaction,
            'isLoading': false,
            'isError': false,
            'statusText': 'You successfully remit the transaction.'
		});
    case RESET_TRANSACTION:
        return Object.assign({}, state, {
            'username': '',
            'amount': null,
            'transaction': {}
        });        
    default:
      return state
  }
}
