var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname));
app.use('/images', express.static(__dirname +'/images'));

app.listen(3000, () => {
    console.log('listening on *:3000');
  });
  