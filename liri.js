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
    case "concert":
        bitThis();
        break;

    case "spotify":
        spotifyThis();
        break;

    case "movie":
        ombdThis();
        break;

    case "do-what-it-says":
        doIt();
        break;
}

function bitThis() {
    axios.get(`https://rest.bandsintown.com/artists/${userInput.trim()}/events?app_id=codingbootcamp`).then(
      function (response) {
        for (var i = 0; i < response.data.length; i++) {
          console.log("****************************")
          console.log(response.data[i].venue.name);
          console.log(response.data[i].venue.city);
          console.log(moment(response.data[i]).format("MM-DD-YYYY"));
          console.log("****************************")
        }
      }
    )
  }

