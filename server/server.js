const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const db = require('./config/db');
const config = require('./config/config');
var User   = require('./app/models/users'); 


// Get our API routes
const api = require('./routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '/../dist/client')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/client/index.html'));
});
//code for authentication to be changed after merging authentication module......
app.post('/authenticate', function(req, res) {
  console.log(req.body.username +  req.body.password);
  // find the user
 
  User.findOne({
    name: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      console.log(req.body.username + "in f1");
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    else if (user) {
      console.log(user);  
      // check if password matches
      if (user.password != req.body.password) {
        console.log(req.body.password + "in f2" + user.password );
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        // var token = jwt.sign(user, app.get('superSecret'),{expiresIn:'1m'});

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
        });
      }   

    }

  });
});
////  -----------------------------/////
/**
 * Get port from environment and store in Express.
 */
const port = config.port;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));