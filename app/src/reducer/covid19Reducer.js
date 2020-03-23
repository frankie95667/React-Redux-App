import { SET_CONFIRMED, SET_DEATHS } from '../actions/covid19Actions';

export const covid19Reducer = (state = {}, action) => {
    switch(action.type){
        case SET_CONFIRMED:
            return {
                ...state,
                countries: action.payload,
                isFinished: false
            }
        case SET_DEATHS:
            return {
                ...state,
                countries: action.payload,
                isFinished: true
            }
        default:
            return state;
    }
}