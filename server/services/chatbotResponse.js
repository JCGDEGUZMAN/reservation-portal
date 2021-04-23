import { sendAPI } from './api.js';
import botMessage from '../templates/botMessage.js';

// Handles messages events
export const handleMessage = async (sender_psid, received_message) => {
    let response;
    
    // Check if the message contains text
    if (received_message.text) {    
      // Create the payload for a basic text message
      response = await botMessage({ sender_psid }); 
      
    // Sends the response message
    await sendAPI(sender_psid, response);   
  } 
}


// Handles messaging_postbacks events
export const handlePostback = async(sender_psid, received_postback) => {
    let response;
  
    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if(payload == 1)
    {
      response = { 
        "text": "Boss is currently offline, please wait for a while. Thank you!"
      }
    }

    // Send the message to acknowledge the postback
    await sendAPI(sender_psid, response);
}
