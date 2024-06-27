var express = require('express');
var bodyParser = require('body-parser');
var user = require('../model/users.js')
var app = express();


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);

app.get('/users/', function (req, res) {    // 1) GET all user info
    user.getUsers(function (err, result) {
        if(!err){
            console.log(result)
            res.status(200).json(result);
        } else{
            res.status(500).send('Internal Server Error')
        }
    });
});

app.post('/users/', function (req, res) {   // 2) POST add user to the database
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var type = req.body.type;
    var profile_pic_url = req.body.profile_pic_url;
    user.postUsers(username,email,password,type,profile_pic_url, function (err, result) {
        if(!err){
            res.status(201).json(result);
        } else if (err == 1) {
            res.status(422).send('Unprocessable Entity')
        } else {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
    });
});

app.get('/users/:id', function (req, res) {    // 3) GET retrieve a single user by their id
    var userid = req.params.id;
    user.getUsersid(userid, function (err, result) {
        if(!err){
            console.log(result)
            if (result.length == 0) {
                console.log('result length zero, sending error code')
                res.status(500).send('Internal Server Error')
            } else {
                res.status(200).json(result);
            }
        } else {
            res.status(500).send('Internal Server Error')
        }
    });
});

app.post('/category', function (req, res) {   // 4) POST Inserts a new category into category table
    var catname = req.body.catname;
    var description = req.body.description;
    user.postCategory(catname,description, function (err, result) {
        if(!err){
            res.status(201).send('Created');
        } else if (err == 1) {
            res.status(422).send('Unprocessable Entity')
        } else {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
    });
});

app.post('/platform', function (req, res) {   // 5) POST Inserts a new category into platform table
    var platform_name = req.body.platform_name;
    var description = req.body.description;
    user.postPlatform(platform_name,description, function (err, result) {
        if(!err){
            res.status(201).send('Created');
        } else if (err == 1) {
            res.status(422).send('Unprocessable Entity')
        } else {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
    });
});

app.post('/game', function (req, res) {   // 6) POST Inserts a new category into game table
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var platformid = req.body.platformid;
    var categoryid = req.body.categoryid;
    var year = req.body.year;
    user.postGame(title,description,price,platformid,categoryid,year, function (err, result) {
        if(!err){
            res.status(201).json('game_id: ' + result);
        } 
        //else if (err == 1) {
        //  res.status(422).send('Unprocessable Entity')
        //} 
        else{
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
    });
});

app.get('/game/:platform', function (req, res) {    // 7) GET retrieve all game listings for specified platform
    var platform_name = req.params.platform;
    user.getGamePlatform(platform_name, function (err, result) {
        if(!err){
            console.log('Query for: ' + platform_name)
            console.log(result)
            if (result.length == 0) {
                console.log('result length zero, sending error code')
                res.status(500).send('Internal Server Error')
            } else {
                res.status(200).json(result);
            }
        } else{
            console.log('Query for: ' + platform_name)
            res.status(500).send('Internal Server Error')
        }
    });
});

app.delete('/game/:id', function (req, res) {    // 8) DELETE removes specific game listing by game_id from game - reviews for game should be CASCADE deleted as well.
    var game_id = req.params.id;
    user.deleteGame(game_id, function (err, result) {
        if(!err){
            console.log('Game deletion for: ' + game_id)
            console.log(result)
            res.status(204).send();
        } else{
            console.log('Game deletion for: ' + game_id)
            res.status(500).send('Internal Server Error')
        }
    });
});

app.put('/game/:id', function (req, res) {    // 9) PUT updates a game listing
    var game_id = req.params.id;
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var platformid = req.body.platformid;
    var categoryid = req.body.categoryid;
    var year = req.body.year;
    user.putGame(game_id,title,description,price,platformid,categoryid,year, function (err, result) {
        if(!err){
            res.status(204).send();
        } else{
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
    });
});

app.post('/user/:uid/game/:gid/review/', function (req, res) {   // 10) POST used to add a new review to the review for given user and game
    var userid = req.params.uid;
    var game_id = req.params.gid;
    var content = req.body.content;
    var rating = req.body.rating;
    user.postReview(userid,game_id,content,rating, function (err, result) {
        if(!err){
            res.status(201).json('reviewid: ' + result);
        } else {
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
    });
});

app.get('/game/:id/review', function (req, res) {    // 11) GET retrieve reviews for a certain game
    var game_id = req.params.id;
    user.getGameReview(game_id, function (err, result) {
        if(!err){
            console.log('Query for reviews for game_id: ' + game_id)
            console.log(result)
            if (result.length == 0) {
                console.log('result length zero, sending error code')
                res.status(500).send('Internal Server Error')
            } else {
                res.status(200).json(result);
            }
        } else{
            console.log('Query for reviews for game_id: ' + game_id)
            res.status(500).send('Internal Server Error')
        }
    });
});

app.get('/game', function (req, res) {    // 12) GET all games info
    user.getGames(function (err, result) {
        if(!err){
            console.log(result)
            res.status(200).json(result);
        } else{
            res.status(500).send('Internal Server Error')
        }
    });
});

app.get('/platform', function (req, res) {    // 13) GET all game platforms info
    user.getPlatforms(function (err, result) {
        if(!err){
            console.log(result)
            res.status(200).json(result);
        } else{
            res.status(500).send('Internal Server Error')
        }
    });
});

app.get('/category', function (req, res) {    // 14) GET all game categories info
    user.getCategories(function (err, result) {
        if(!err){
            console.log(result)
            res.status(200).json(result);
        } else{
            res.status(500).send('Internal Server Error')
        }
    });
});

app.delete('/user/:id', function (req, res) {    // 15) DELETE removes specific user from database
    var userid = req.params.id;
    user.deleteUser(userid, function (err, result) {
        if(!err){
            console.log('Game deletion for: ' + userid)
            console.log(result)
            res.status(204).json(result);
        } else{
            console.log('Game deletion for: ' + userid)
            res.status(500).send('Internal Server Error')
        }
    });
});

app.put('/user/:id', function (req, res) {    // 16) PUT updates user info
    var userid = req.params.id
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var type = req.body.type;
    var profile_pic_url = req.body.profile_pic_url;
    user.putUser(userid,username,email,password,type,profile_pic_url, function (err, result) {
        if(!err){
            res.status(204).json(result);
        } else{
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
    });
});

module.exports = app;