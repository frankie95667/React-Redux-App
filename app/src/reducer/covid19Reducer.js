import { SET_SUMMARY } from '../actions/covid19Actions';

export const covid19Reducer = (state = {}, action) => {
    switch(action.type){
        case SET_SUMMARY:
            return {
                ...state,
                countries: action.payload
            }
        default:
            return state;
    }
}