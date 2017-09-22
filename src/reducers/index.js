import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import userInfo from './userInfo'
import transactions from './transactions'
import autocomplete from './autocomplete'
import createTransaction from './createTransaction'

const rootReducer = combineReducers({
	auth,
	userInfo,
	transactions,
	autocomplete,
	createTransaction,
	router: routerReducer,
	form: formReducer
})

export default rootReducer