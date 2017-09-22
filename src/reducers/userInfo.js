import {GET_USER_INFO_REQUEST, GET_USER_INFO_FAILURE, GET_USER_INFO_SUCCESS} from '../constants'

const initialUserInfo = {
    userName: '',
    balance: 0,
    isLoading: false
}

export default function userInfo(state  = initialUserInfo, action) {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
        return Object.assign({}, state, {
            'isLoading': true
		});
    case GET_USER_INFO_FAILURE:
        return Object.assign({}, state, {
            'isLoading': false
		});
    case GET_USER_INFO_SUCCESS:
        return Object.assign({}, state, {
        	'userName': action.payload.username,
        	'balance': action.payload.balance,
            'isLoading': false
		});
    default:
      return state
  }	

}