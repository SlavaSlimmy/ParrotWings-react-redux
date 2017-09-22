import {GET_SUGGESTIONS_REQUEST, GET_SUGGESTIONS_FAILURE, GET_SUGGESTIONS_SUCCESS, CLEAR_SUGGESTIONS, SET_AUTOCOMPLETE_VALUE} from '../constants'

const initialAutocomplete = {
    value: '',
    suggestions: [],
    isLoading: false,
}

export default function autocomplete(state  = initialAutocomplete, action) {
  switch (action.type) {
    case GET_SUGGESTIONS_REQUEST:
        return Object.assign({}, state, {
            'isLoading': true
		    });
    case GET_SUGGESTIONS_FAILURE:
        return Object.assign({}, state, {
            'isLoading': false
        });
    case GET_SUGGESTIONS_SUCCESS:
        return Object.assign({}, state, {
            'suggestions': action.payload.suggestions,
            'isLoading': false
        }); 
    case CLEAR_SUGGESTIONS:
        return Object.assign({}, state, {
            'suggestions': []
        });
    case SET_AUTOCOMPLETE_VALUE:
        return Object.assign({}, state, {
            'value': action.payload.value
        });        
    default:
      return state
  }
}