import {
    POST_RESERVATION,
    POST_RESERVATION_FULFILLED,
    POST_RESERVATION_REJECTED,
    PUT_PAYMENT,
    PUT_PAYMENT_FULFILLED,
    PUT_PAYMENT_REJECTED,
    GET_RESERVATION,
    GET_RESERVATION_FULFILLED,
    GET_RESERVATION_REJECTED
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

export function updateReservation(state = {
    paymentLoading: false,
    paymentSuccess: false,
    paymentFailed: false,
    paymentList: []
}, action) {
    switch(action.type){
        case PUT_PAYMENT:
            return {
                ...state,
                paymentLoading: true,
                paymentSuccess: false,
                paymentFailed: false
            }
        case PUT_PAYMENT_FULFILLED:
            return {
                ...state,
                paymentLoading: false,
                paymentSuccess: true,
                paymentList: action.payload
            }
        case PUT_PAYMENT_REJECTED:
            return {
                ...state,
                paymentLoading: false,
                paymentFailed: true
            }
        default:
            return {
                ...state
            }
    }
}

export function loadReservation(state = {
    reservationLoading: false,
    reservationSuccess: false,
    reservationFailed: false,
    reservationList: {}
}, action) {
    switch(action.type){
        case GET_RESERVATION:
            return {
                ...state,
                reservationLoading: true,
                reservationSuccess: false,
                reservationFailed: false
            }
        case GET_RESERVATION_FULFILLED:
            return {
                ...state,
                reservationLoading: false,
                reservationSuccess: true,
                reservationList: action.payload
            }
        case GET_RESERVATION_REJECTED:
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