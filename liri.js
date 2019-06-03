// read and set environment variables with dotenv package
require("dotenv").config();
var fs = require("fs");
var moment = require("moment");
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var request = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

switch (request) {
    case "concert-this":
        bitThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        ombdThis();
        break;

    case "do-what-it-says":
        doIt();
        break;
}

