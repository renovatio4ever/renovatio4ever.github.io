require("dotenv").config();
var keys = require("./keys.js");
var moment = require('moment');
var figlet = require('figlet');
var fs = require("fs");
var cmd = require('node-cmd');
var chalk = require('chalk');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require('request')
var command = process.argv[2];
var argument = process.argv[3];
var bandsintown = require('bandsintown')("codingbootcamp");

for (i = 4; i < process.argv.length; i++) {
    argument += `+${process.argv[i]}`
}

if (command === "movie-this") {
    console.clear();
    if (process.argv[3] === undefined) {
        argument = `Mr.Nobody`
    }
    request(`http://www.omdbapi.com/?t=${argument}&y=&plot=short&apikey=trilogy`, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            console.clear();
            console.log(`${chalk.inverse.yellow(JSON.parse(body).Title)}
${chalk.green('Release Year')}: ${chalk.blue(JSON.parse(body).Year)}
${chalk.green('IMDB Rating')}: ${chalk.blue(JSON.parse(body).imdbRating)}
${chalk.green('Rotten Tomatoes Rating')}: ${chalk.blue(JSON.parse(body).Ratings[1].Value)}
${chalk.green('Origin Country')}: ${chalk.blue(JSON.parse(body).Country)}
${chalk.green('Available Languages')}: ${chalk.blue(JSON.parse(body).Language)}
${chalk.green('Plot')}: ${chalk.blue(JSON.parse(body).Plot)}
${chalk.green('Actors')}: ${chalk.blue(JSON.parse(body).Actors)}`)
        }
        fs.appendFile('log.txt', `
${JSON.parse(body).Title}
Release Year: ${JSON.parse(body).Year}
IMDB Rating: ${JSON.parse(body).imdbRating}
Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
Origin Country: ${JSON.parse(body).Country}
Available Languages: ${JSON.parse(body).Language}
Plot: ${JSON.parse(body).Plot}
Actors: ${JSON.parse(body).Actors}
        `, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });

} else if (command === "concert-this") {
    console.clear();
    bandsintown.getArtistEventList(argument).then(function (events) {
        console.log(`${chalk.inverse.red(argument)}
${chalk.green('Venue Name')}: ${events[0].venue.name}
${chalk.green('Location')}: ${events[1].formatted_location}
${chalk.green('Date')}: ${moment(events[0].datetime).format('L')}`)
        fs.appendFile('log.txt', `
${argument}
Venue Name: ${events[0].venue.name}
Location: ${events[1].formatted_location}
Date: ${moment(events[0].datetime).format('L')}
`, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
} else if (command === "spotify-this-song") {
    console.clear();
    if (process.argv[3] === undefined) {
        argument = `"The Sign" Ace of Base`
    }
    spotify.search({
        type: 'track',
        query: argument,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        trackdata = data.tracks.items[0];
        console.log(`
${chalk.inverse.cyan(trackdata.name)}
${chalk.green('Album')}: ${chalk.blue(trackdata.album.name)} 
${chalk.green('Artist')}: ${chalk.blue(trackdata.album.artists[0].name)} 
${chalk.green('Song Sample')}: ${chalk.blue(trackdata.preview_url)}`)
        fs.appendFile('log.txt', `
${trackdata.name}
        
Album: ${trackdata.album.name} 
Artist: ${trackdata.album.artists[0].name} 
Song Sample: ${trackdata.preview_url}
`, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
} else if (command === "do-what-it-says") {
    console.clear();
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(`"`, "");
        data = data.replace(`,`, "");
        cmd.get(
            `node liri.js ${data}`,
            function (err, data, stderr) {
                console.log(`${chalk.cyan(data)}`)
            }
        );
    });

} else if (command === "help" || command === '') {
    LiriBotSplash();
} else if (command === "log") {
 
    console.clear();
    fs.readFile('log.txt', 'utf8', function(err, data) {  
        if (err) throw err;
        console.log(data);
    });
    
}

function LiriBotSplash() {
    console.clear();
    figlet.text('Node JS Liri Bot', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(`${chalk.yellow("WELCOME TO THE: \n")}`);
        console.log(`${chalk.cyan(data)}`);
        console.log(`
        ${chalk.inverse.cyan('How to use The Liri Bot')}
        ${chalk.green('Concerts')}: ${chalk.blue('node liri concert-this <concert/band name>')} 
        ${chalk.green('Spotify')}: ${chalk.blue('node liri spotify-this-song <desired song>')} 
        ${chalk.green('Movies')}: ${chalk.blue('node liri movie-this <movie title>')}
        ${chalk.green('Pre defined entry')}: ${chalk.blue('node liri do-what-it-says <no input>')}
                `)
    });
}