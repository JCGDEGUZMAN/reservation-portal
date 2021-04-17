import { combineReducers } from 'redux';

import { submitReservation } from './reducer.js';

const rootReducer = combineReducers({
    submitReservation,
})

export default rootReducer;
