const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/frontend/browser'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/frontend/browser/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
