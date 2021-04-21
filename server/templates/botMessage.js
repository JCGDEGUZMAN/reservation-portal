const SERVER_URL = process.env.SERVER_URL;
const CLIENT_URL = process.env.CLIENT_URL;
const BOT_NAME = process.env.BOT_NAME;
const PAGE_NAME = process.env.PAGE_NAME;

import { userProfile } from '../services/api.js';

const botMessage = async ({sender_psid}) => {
  const profile = await userProfile(sender_psid);

  return(
    {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type" : "generic",
          "elements" : [
            {
              "title" : `Hello, I am ${BOT_NAME}.`,
              "image_url" :  `${SERVER_URL}/images/booky.jpg`,
              "subtitle" : `A ${PAGE_NAME} Bot. How can I help you ${profile.first_name}?`,
              "buttons" : [
                  {
                      "type": "web_url",
                      "title": "BOOK NOW!",
                      "url": `${CLIENT_URL}/reservation/${sender_psid}`,
                      "messenger_extensions": true,
                      "webview_height_ratio": "TALL",
                      "webview_share_button": "hide",
                  },
                  {
                      "type": "postback",
                      "title": "TALK TO AGENT",
                      "payload": 1,
                  },
              ]
            }
          ]
        }
      }
    }
  );
}

export default botMessage;