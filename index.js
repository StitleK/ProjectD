'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const config = {
  channelAccessToken: "yXiTReGlHMoW9vP2aU6FuyiFXPy3MZDCKY8GyxJSuGNsR2n6EZJGaKLXMB7ZZjFz+CVuozNsWkslxigxmghUqRqNz3P6wt+t4LJwomjrn2ULwLYkvMJOKA9Ik7ttedlwtbxVSuhnbvoIhL1HKTJKqQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "1b23f5bf81dc6b2a431676798c021569",
};

const client = new line.Client(config);

const app = express();

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
    
    return Promise.resolve(null);
  } else if (event.message.type === 'text' && event.message.text === 'Enter') {
    const payload = {
      type: 'text',
      text: 'คุณต้องการเปิดประตูหรือไม่ ถ้าต้องการให้พิมพ์ว่า unlock'
    };
    return client.replyMessage(event.replyToken, payload);
  } else if (event.message.type === 'text' && event.message.text === 'Unlock') {
    const payload = {
      type: 'text',
      text: 'กำลังทำการเปิดประตู'
    };

    axios.get('https://sgp1.blynk.cloud/external/api/update?token=x1LJYreujw5VgH-svbonKsmYrLn44rTw&v1=1');
    return client.replyMessage(event.replyToken, payload);
  } else if (event.message.type === 'text' && event.message.text === 'Lock') {
    const payload = {
      type: 'text',
      text: 'กำลังทำการปิดประตู'
    };

    axios.get('https://sgp1.blynk.cloud/external/api/update?token=x1LJYreujw5VgH-svbonKsmYrLn44rTw&v1=0');
    return client.replyMessage(event.replyToken, payload);
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
