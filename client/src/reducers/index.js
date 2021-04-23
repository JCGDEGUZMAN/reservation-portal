import { combineReducers } from 'redux';

import { submitReservation, updateReservation, loadReservation } from './reducer.js';

const rootReducer = combineReducers({
    submitReservation,
    updateReservation,
    loadReservation,
})

export default rootReducer;
