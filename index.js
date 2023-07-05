'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "yXiTReGlHMoW9vP2aU6FuyiFXPy3MZDCKY8GyxJSuGNsR2n6EZJGaKLXMB7ZZjFz+CVuozNsWkslxigxmghUqRqNz3P6wt+t4LJwomjrn2ULwLYkvMJOKA9Ik7ttedlwtbxVSuhnbvoIhL1HKTJKqQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "1b23f5bf81dc6b2a431676798c021569",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  console.log('Received event:', event);
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  } else if (event.message.type === 'text' && event.message.text === 'Enter') {
    const payload = {
      type: 'text',
      text: 'คุณต้องการเปิดประตูหรือไม่ ถ้าต้องการให้พิมพ์ว่า unlock'
    };
    return client.replyMessage(event.replyToken, payload);
  } else if (event.message.type === 'text' && event.message.text === 'unlock') {
    const payload = {
      type: 'text',
      text: 'กำลังทำการเปิดประตู'
    };

    axios.get('https://sgp1.blynk.cloud/external/api/update?token=ms5nCCGw52uxcWO52mwizEUbPWZFDzNS&v1=1');
    return client.replyMessage(event.replyToken, payload);
  } else if (event.message.type === 'text' && event.message.text === 'lock') {
    const payload = {
      type: 'text',
      text: 'กำลังทำการปิดประตู'
    };

    axios.get('https://sgp1.blynk.cloud/external/api/update?token=ms5nCCGw52uxcWO52mwizEUbPWZFDzNS&v1=0');
    return client.replyMessage(event.replyToken, payload);
  }
}

  // listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
