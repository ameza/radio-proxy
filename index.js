/**
 * INSTALL:
 * ----
 * > yarn add express request
 * 
 * RUN:
 * ----
 * > node ./audio-proxy-server
 */
const os = require('os');
const dns = require('dns');
const express = require('express');
const request = require('request');

const app = express();
const hostname = os.hostname();

// defined in .env file
const serverport = (process.env.PORT || process.env.PROXY_PORT || 3000);

// Any streaming radio URI
const radiouri = 'http://node-01.strongradiohost.com/6nw4mvepgq5tv?rj-ttl=5&rj-token=AAABaNA2zJLyXB0RNbwfaEgqy-YzDshsSOwBjTkI8d5L48fiafnWag';

app.get('/', (req, res) => {
  process.stdout.write('Connected to server\n');
  request.get(radiouri)
    .on('error', () => {})
    .on('response', () => {})
    .pipe(res);

});

app.listen(serverport, () => {
  dns.lookup(hostname, (err, ip) => {
    // retrieve network local ip
    process.stdout.write('Audio Proxy Server runs under\n');
    process.stdout.write(`  Local:        http://localhost:${serverport}\n`);
    process.stdout.write(`  Home Network: http://${ip}:${serverport}\n`);
  });
});