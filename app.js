const express = require("express");

const app = express();

app.listen(8080, () => {
  console.log(`🚀 Listening on port http://localhost:${8080}`);
});

// 1- Node.js muhitini yaratish uchun | npm init -y

// 2- Express bilan ishlash uchun | npm i express

// 3- Nodemon ni yuklaymiz auto save uchun | npm install -D nodemon |
//  "scripts": {
//     "start": "node app.js",
//     "dev": "nodemon app.js"
//   }, va (npm run dev)
