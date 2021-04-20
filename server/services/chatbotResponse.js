import { sendAPI } from './httpRequest.js';
import botMessage from '../templates/botMessage.js';
import roomDetails from '../templates/roomDetails.js';

// Handles messages events
export const handleMessage = async (sender_psid, received_message) => {
    let response;

    // Check if the message contains text
    if (received_message.text) {    
      // Create the payload for a basic text message
      response = botMessage; //roomDetails({ fullName: "Agent X44", bedNumber: 2, noOfDays: 4 });
    
    // Sends the response message
    await sendAPI(sender_psid, response);   
  }
}


// Handles messaging_postbacks events
export const handlePostback = async(sender_psid, received_postback) => {
    let response;
  
    // Get the payload for the postback
    let payload = received_postback.payload;
    console.log("payload: ", payload)
    // Set the response based on the postback payload

    // Send the message to acknowledge the postback
    sendAPI(sender_psid, response);
}
