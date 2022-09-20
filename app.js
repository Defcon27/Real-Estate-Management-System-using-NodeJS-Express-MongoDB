//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config()
app.use(express.static("public"));

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_PATH,{ useUnifiedTopology: true,useNewUrlParser: true });
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){console.log("MongoDatabase Connected Successfully");});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/' }));
app.set('view engine', 'hbs');

//Home route
app.get("/", function(req, res){
  // res.sendFile(__dirname +'/index0.html');
  res.render("owner/home");
});

//Route files
let owner = require('./routes/owner');
let customer = require('./routes/customer');
app.use('/owner', owner);
app.use('/customer', customer);


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
