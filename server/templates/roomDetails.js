const SERVER_URL = process.env.SERVER_URL;
const CLIENT_URL = process.env.CLIENT_URL;

const roomDetails = ({ fullName, bedNumber, noOfDays }) => {
    return(
        {
            "attachment": {
              "type": "template",
              "payload": {
                "template_type" : "generic",
                "elements" : [
                  {
                    "title" : `ROOM 01 - 3RD FLR`,
                    "image_url" :  `${SERVER_URL}/images/room.jpg`,
                    "subtitle" : `Name: ${fullName}\n\nNo. Of Beds: ${bedNumber}\n\No. Of Days: ${noOfDays}`,
                    "buttons" : [
                        {
                            "type": "web_url",
                            "title": "CHECK STATUS",
                            "url": `${CLIENT_URL}`,
                            "messenger_extensions": true,
                            "webview_height_ratio": "TALL",
                            "webview_share_button": "hide",
                        },
                    ]
                  }
                ]
              }
            }
        }
    );
}

export default roomDetails;