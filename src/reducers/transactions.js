import {GET_TRANSACTIONS_REQUEST, GET_TRANSACTIONS_FAILURE, GET_TRANSACTIONS_SUCCESS, SORT_TRANSACTIONS} from '../constants'

const initialTransactions = {
	order: 'desc',
	orderBy: 'date',	
	allIds: [],
	byId: {},
	isLoading: false
}

export default function transactions(state  = initialTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
        return Object.assign({}, state, {
            'isLoading': true
		});
    case GET_TRANSACTIONS_FAILURE:
        return Object.assign({}, state, {
            'isLoading': false
		});
    case GET_TRANSACTIONS_SUCCESS:
        return Object.assign({}, state, {
        	'allIds': action.payload.allIds,
        	'byId': action.payload.byId,
            'isLoading': false
		});	
    case SORT_TRANSACTIONS:
        const orderBy = action.payload.orderBy;
        const order = action.payload.order;

        let data = []
        if (orderBy === 'date') {
            data = state.allIds.sort(
              (a, b) => {
                    let itemA = new Date(state.byId[a][orderBy]).valueOf()
                    let itemB = new Date(state.byId[b][orderBy]).valueOf()
                    if (order === 'desc') {
                        return (itemA > itemB) ? -1 : ((itemB > itemA) ? 1 : 0)    
                    } else {
                        return (itemB > itemA) ? -1 : ((itemA > itemB) ? 1 : 0)    
                    }
                }
            )
        } else {
            data = state.allIds.sort(
              (a, b) => {
                    if (order === 'desc') {
                        return (state.byId[a][orderBy] > state.byId[b][orderBy]) ? -1 : ((state.byId[b][orderBy] > state.byId[a][orderBy]) ? 1 : 0)    
                    } else {
                        return (state.byId[b][orderBy] > state.byId[a][orderBy]) ? -1 : ((state.byId[a][orderBy] > state.byId[b][orderBy]) ? 1 : 0)    
                    }                
                }
            )
        }

        return Object.assign({}, state, {
            'allIds': data,
            'order': order,
            'orderBy': orderBy
        });         			
    default:
      return state
  }
}