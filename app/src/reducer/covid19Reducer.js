import { SET_CONFIRMED, SET_DEATHS, SET_RECOVERED } from '../actions/covid19Actions';

export const covid19Reducer = (state = {
    countries: null,
    confirmedFinished: false,
    deathsFinished: false,
    recoveredFinished: false,
}, action) => {
    switch(action.type){
        case SET_CONFIRMED:
            return {
                ...state,
                countries: action.payload,
                confirmedFinished: true,
                deathsFinished: false,
                recoveredFinished: false,
            }
        case SET_DEATHS:
            return {
                ...state,
                countries: action.payload,
                confirmedFinished: true,
                deathsFinished: true,
                recoveredFinished: false,
            }
        case SET_RECOVERED:
            return {
                ...state,
                countries: action.payload,
                confirmedFinished: true,
                deathsFinished: true,
                recoveredFinished: true,
            }
        default:
            return state;
    }
}