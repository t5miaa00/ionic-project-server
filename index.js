var express = require('express');
var cors = require('cors');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var app = express();


// You can store key-value pairs in express, here we store the port setting
app.set('port', (process.env.PORT || 80));

// bodyParser needs to be configured for parsing JSON from HTTP body
app.use(bodyParser.json());
app.use(cors());

// Setting the mongodb url
//var mongoUrl = 'mongodb:';

// Simple hello world route
app.get('/', function(req, res) {
   res.send("Hello world");
});

//* dummy users, these will be put into a database later on.
var users = [{
      id: "1",
      username: "user1",
      password: "pass1"
   },
   {
      id: "2",
      username: "user2",
      password: "pass2"
}];
//*/

var posts = [
   {
      id: 0,
      user: {
         id: 1,
         username: "dtrump",
         profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg"
      },
      image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
      imageThumbnail: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
      likes: 892,
      caption: "Always winning #elections",
      tags: ['elections'],
      comments: [
         {
            id: 0,
            user: {
               id: 2,
               username: "POTUS"
            },
            comment: "You're never going to make it don #losing",
            userRefs: [],
            tags: ["losing"]
         },
         {
            id: 1,
            user: {
               id: 3,
               username: "HillaryC"
            },
            comment: "Damn right @POTUS",
            userRefs: ["POTUS"],
            tags: []
         },
      ]
   }
]

app.get('/posts/relevant', function(req, res) {
   res.json(posts);
});

app.post('/login', function(req,res) {
   console.log("User loggin in with following username:");
   console.log("Username: " + req.body.username);
   var u = users.find(function(element){
      return (element.username === req.body.username) && (element.password === req.body.password);        
   });

   if(u !== undefined) {
      return res.json({id: u.id, username: u.username});
   }
   else {
        return res.sendStatus(401);
    }
})

app.get('/posts/:id', function(req, res) {
   res.json(posts[req.params.id]);
});

// start listening for incoming HTTP connections
app.listen(app.get('port'), function() {
   console.log('Node app is running on port', app.get('port'));
});
