import { sendAPI, sendMessengerProfile } from './api.js';
import botMessage from '../templates/botMessage.js';
import persistentMenu from '../templates/persistentMenu.js';

// Handles messages events
export const handleMessage = async (sender_psid, received_message) => {
    let response;
    
    // Check if the message contains text
    if (received_message.text) {    
      // Create the payload for a basic text message
      
    // Sends the response message
    await sendAPI(sender_psid, response);   
  } 
}


// Handles messaging_postbacks events
export const handlePostback = async(sender_psid, received_postback) => {
    let response;
    let pMenu;
  
    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload

    switch(payload){
      case 'GET_STARTED':
        response = await botMessage({ sender_psid }); 
        pMenu = persistentMenu({ sender_psid });
        break;
      case 'ASK_BOSS':
        response = {"text": "Boss is currently offline, please wait for a while. Thank you!"}
        break;
    }

    // Send the message to acknowledge the postback
    await sendAPI(sender_psid, response);

    if(persistentMenu)
    {
      await sendMessengerProfile(pMenu);
    }
}
