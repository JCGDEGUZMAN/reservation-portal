import axios from 'axios';

const FBGRAPH_API = process.env.FBGRAPH_API;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

export const sendAPI = async (sender_psid, response) => {
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response,
    }

    await axios.post(`${FBGRAPH_API}/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, request_body)
    .then(response => {
        console.log('message sent!')
    })
    .catch(error => {
        console.log("error: ", error)
    })
}

export const userProfile = async (sender_psid) => {
  return await axios.get(`${FBGRAPH_API}/${sender_psid}?fields=name,first_name,last_name&access_token=${PAGE_ACCESS_TOKEN}`)
      .then(response => {
          return response.data;
      })
      .catch(error => {
          console.log("error: ", error)
      })
}

export const initGetStarted = async () => {
    let request_body = { 
        "get_started":{
          "payload":"GET_STARTED"
        }
    }

    await axios.post(`${FBGRAPH_API}/v10.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`, request_body)
    .then(response => {
        console.log('get started button intialized!')
    })
    .catch(error => {
        console.log("error: ", error)
    })
}