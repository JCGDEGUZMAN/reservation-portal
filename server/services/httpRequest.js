import request from 'request';

// Sends response messages via the Send API
export const sendAPI = async (sender_psid, response) => {
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response,
    }
  
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
      }, (err, res, body) => {
        if (!err) {
          console.log('message sent!')
        } else {
          console.error("Unable to send message:" + err);
        }
    }); 
  }