const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const port = 443;

const cert = fs.readFileSync(__dirname + '/certs/cert.pem');
const key = fs.readFileSync(__dirname + '/certs/key.pem');

const options = {
  key: key,
  cert: cert
};

app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function sanitizeURL(url) {
  const formatedUrl = url.replace(/\.\./g, '/').replace(/\-\-/g, '#');

  return `http://${formatedUrl}`;
}

app.get('/:whereTo/', function(req, res) {
  const url = sanitizeURL(req.params.whereTo);
  const query = Object.values(req.query).join('/');

  res.redirect(`${url}/${query}`)
});

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`You should be sad to see me plumbing on port ${port}`);
  console.log("I'll fix the pipes for now, but you need to find a better solution.");
});
