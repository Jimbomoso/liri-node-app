// read and set environment variables with dotenv package
require("dotenv").config();
let fs = require("fs");
let moment = require("moment");
let keys = require("./keys.js");
let axios = require("axios");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

let request = process.argv[2];
let userInput = process.argv.slice(3).join(" ");

switch (request) {
    case "concert":
        bitThis();
        break;

    case "spotify":
        spotifyThis();
        break;

    case "movie":
        omdbThis();
        break;

    case "do-what-it-says":
        doIt();
        break;
}

// function for searching for concert using BIT api
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

// function for searching spotify for song using Spotify API
function spotifyThis() {
    if (userInput === "") {
        userInput = "Ironic"
    }
    spotify.search({ type: "track", query: `${userInput}` }, function (err,data) {
        if (err) {
            console.log(err)
        } else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Title: " + data.tracks.items[0].name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        }
    })
}

// function for searching for movies using omdb api
function omdbThis() {
    if (userInput === "") {
      axios.get(`http://www.omdbapi.com/?t=mr+nobody&apikey=trilogy`).then(
        function (response) {
          console.log(response.data.Title);
          console.log(response.data.Year);
          console.log(response.data.Ratings[0]);
          console.log(response.data.Ratings[1]);
          console.log(response.data.Country);
          console.log(response.data.Language);
          console.log(response.data.Plot);
          console.log(response.data.Actors);
        }
      )
    } else {
      axios.get(`http://www.omdbapi.com/?t=${userInput}&apikey=trilogy`).then(
        function (response) {
          console.log(response.data.Title);
          console.log(response.data.Year);
          console.log(response.data.Ratings[0]);
          console.log(response.data.Ratings[1]);
          console.log(response.data.Country);
          console.log(response.data.Language);
          console.log(response.data.Plot);
          console.log(response.data.Actors);
        }
      )
    }
  }

// function that uses the random.txt as input
function doIt() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        dataArr = data.split(",");
        request = dataArr[0];
        userInput = dataArr[1];
        if (request === "spotify") {
            spotifyThis();
        } else if (request === "movie") {
            omdbThis();
        } else if (request === "concert") {
            console.log(userInput)
            bitThis();
        } else {
            return console.log(err)
        }
    })
}
