'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const config = {
  channelAccessToken: "xxx",
  channelSecret: "xxx",
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

    axios.get('https://sgp1.blynk.cloud/external/api/update?token=xxx&v1=1');
    return client.replyMessage(event.replyToken, payload);
  } else if (event.message.type === 'text' && event.message.text === 'Lock') {
    const payload = {
      type: 'text',
      text: 'กำลังทำการปิดประตู'
    };

    axios.get('https://sgp1.blynk.cloud/external/api/update?token=xxx&v1=0');
    return client.replyMessage(event.replyToken, payload);
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
