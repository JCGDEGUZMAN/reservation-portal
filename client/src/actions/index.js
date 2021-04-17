import axios from 'axios'

export const POST_RESERVATION = 'POST_RESERVATION'
export const POST_RESERVATION_FULFILLED = 'POST_RESERVATION_FULFILLED'
export const POST_RESERVATION_REJECTED = 'POST_RESERVATION_REJECTED'

const API_URL = process.env.REACT_APP_API_URL

export const submitReservation = (data) => {
    return async dispatch => {
      dispatch({
        type: POST_RESERVATION,
        payload: {}
      })
  
      try{
          const response = await axios.post(`${API_URL}/reservation/`, data)
          dispatch({
              type: POST_RESERVATION_FULFILLED,
              payload: response.data
          })
      } catch (error) {
          dispatch({
              type: POST_RESERVATION_REJECTED,
              payload: error
          })
      }
    }
  }
  