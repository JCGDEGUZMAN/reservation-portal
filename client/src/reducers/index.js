import { combineReducers } from 'redux';

import { submitReservation, updateReservation } from './reducer.js';

const rootReducer = combineReducers({
    submitReservation,
    updateReservation,
})

export default rootReducer;
