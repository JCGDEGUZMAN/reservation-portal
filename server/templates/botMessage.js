const API_URL = process.env.API_URL;
const BOT_NAME = process.env.BOT_NAME;
const PAGE_NAME = process.env.PAGE_NAME;

const message = {
  "attachment": {
    "type": "template",
    "payload": {
      "template_type" : "generic",
      "elements" : [
        {
          "title" : `Hello, I am ${BOT_NAME}.`,
          "image_url" :  `${API_URL}/images/booky.jpg`,
          "subtitle" : `A ${PAGE_NAME} Bot. How can I help you?`,
          "buttons" : [
              {
                  "type": "postback",
                  "title": "BOOK NOW!",
                  "payload": 1,
              },
              {
                  "type": "postback",
                  "title": "GO TO WEBSITE",
                  "payload": 2,
              },
              {
                  "type": "postback",
                  "title": "TALK TO AGENT",
                  "payload": 3,
              },
          ]
        }
      ]
    }
  }
}

export default message;