const CLIENT_URL = process.env.CLIENT_URL;

const persistentMenu = ({sender_psid}) => {

  return(
    {
        "psid": sender_psid,
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "ASK MY BOSS",
                        "payload": "ASK_BOSS"
                    },
                    {
                        "type": "web_url",
                        "title": "BOOK NOW!",
                        "url": `${CLIENT_URL}/reservation/${sender_psid}`,
                        "messenger_extensions": true,
                        "webview_height_ratio": "TALL",
                        "webview_share_button": "hide",
                    }
                ]
            }
        ]
    }
  );
}

export default persistentMenu;