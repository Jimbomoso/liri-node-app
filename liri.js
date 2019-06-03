// read and set environment variables with dotenv package
require("dotenv").config();

// import file structure
var fs = require("fs");
// import keys file
var keys = require("./keys.js");
// import request 
var axios = require("axios");

// Spotify 
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

