

//link to the env file.
require("dotenv").config();
var keys = require('./keys.js');
var twitter = require("twitter");
var request = require("request");
var fs = require('fs');
var Spotify = require('node-spotify-api');



//function that will be call when a command line is made.
function tweetsCall(){

    var client = new twitter(keys.twitterKey);

    var params = {screen_name: "GringoRoby"};
    client.get("statuses/user_timeline", params, function(error, tweets, response){
        if(!error && response.statusCode == 200){
            console.log(tweets);
            //
            console.log("\n---------------------------------------------------\n")
            for(var i = 0; i<tweets.length; i++){
                //displaying the 20 newest tweets on terminal.
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                console.log(" ");  
            }
            console.log("\n---------------------------------------------------\n")
        }//if statement
    });//client 
}//tweetsCall

//function that will be call when a command line is made.

function spotifyCall(song){

    var spotify = new Spotify(keys.spotifyKey);
   
    if(process.argv[3] == null){
       song = "The Sign ace of base";
   }
    
   spotify.search({ type: 'track', query: song }, 
	function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
	if (data.tracks.items.length === 0){
		spotify.search({ type: 'track', query: "song" }, 
			function(err, songData) {
		    if ( err ) {
		        console.log('Error: ' + err);
		        return;

		    }
		});
	}
 	else{ 
         //for loop to display 20 items
        for(var i=0; i<20; i++){
            console.log("\n---------------------------------------------------\n")
            console.log("artists: " + data.tracks.items[i].artists[0].name);
            console.log(" ")
            console.log("song name: " + data.tracks.items[i].name);
            console.log(" ")
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log(" ")
            console.log(data.tracks.items[i].preview_url);
		 	
         }
         console.log("\n---------------------------------------------------\n")
 }
  
    });//function err/data
}//spotify


//function that will be call when a command line is made.
function movieCall (movieName){

    if(process.argv[3] == null){
        movieName = "Mr. Nobody";
    }
        
    // runs the request from the API 
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    request(queryUrl, function(error, response, body  ) {
    
      // If the request is successful
      if (!error && response.statusCode === 200) {
        console.log("\n---------------------------------------------------\n")
        //here we console log all the information.
        console.log("Title of the movie: " + JSON.parse(body).Title);
        console.log(" ");
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log(" ");
        console.log("The movie's rating from IMDB is: " + JSON.parse(body).imdbRating);
        console.log(" ");
        console.log("Country where the movie was produced: " + JSON.parse(body).Country);
        console.log(" ");
        console.log("Language of the movie: " + JSON.parse(body).Language);
        console.log(" ");
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log(" ");
        console.log("Actors: " + JSON.parse(body).Actors);
        ////// come back to this ///
        //console.log(" ");
        //console.log("The movie's rating from Rotten Tomatoes is: " + JSON.parse(body).Ratings[1].Value);
        //console.log("The movie's rating from Rotten Tomatoes is: " + JSON.parse(body).tomatoRating);
        //////
        console.log("\n---------------------------------------------------\n")
       
      }//if statement
    });//request

}//movieCall


//function that will be call when a command line is made.
function readThis(){

    fs.readFile("random.txt", "utf8", function(err, data){

        if(err){
            return console.log(err);
        }
        console.log("\n---------------------------------------------------\n");  
        console.log(data);
        console.log("\n---------------------------------------------------\n");  
        var dataArr = data.split(",");   
    });
}

//function that will get commands 
function commands(caseData, functionData){
    switch(caseData){
        case "my-tweets" :
            tweetsCall();
            break;
       case "spotify-this-song" :
           spotifyCall(functionData);
            break;
        case "movie-this" :
            movieCall(functionData);
            case "do-what-it-says" :
            readThis(functionData);
            break;
        default:
            console.log("\n---------------------------------------------------\n");
            console.log("Liri does not know that");
            console.log("\n---------------------------------------------------\n");        
    }
}

//
function runArg(argOne, argTwo){
    commands(argOne, argTwo);
};

runArg(process.argv[2], process.argv[3]);



