import {
    POST_RESERVATION,
    POST_RESERVATION_FULFILLED,
    POST_RESERVATION_REJECTED,
} from '../actions';

export function submitReservation(state = {
    reservationLoading: false,
    reservationSuccess: false,
    reservationFailed: false,
    reservationList: []
}, action) {
    switch(action.type){
        case POST_RESERVATION:
            return {
                ...state,
                reservationLoading: true,
                reservationSuccess: false,
                reservationFailed: false
            }
        case POST_RESERVATION_FULFILLED:
            return {
                ...state,
                reservationLoading: false,
                reservationSuccess: true,
                reservationList: action.payload
            }
        case POST_RESERVATION_REJECTED:
            return {
                ...state,
                reservationLoading: false,
                reservationFailed: true
            }
        default:
            return {
                ...state
            }
    }
}