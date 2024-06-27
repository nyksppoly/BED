var db=require('./databaseConfig.js');
var userDB = {
    getUsers: function (callback) {      // 1) GET all user info
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to users!");
                var sql = 'SELECT * FROM users';
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    }
                });
            }
        });
    },
    postUsers: function (username,email,password,type,profile_pic_url,callback) {   // 2) POST add user to the database
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to users!");
                var sql = 'INSERT INTO users(username,email,password,type,profile_pic_url) VALUES(?,?,?,?,?)';
                conn.query(sql,[username,email,password,type,profile_pic_url], function (err, result) {
                    if (err) {
                        if (err.code == 'ER_DUP_ENTRY') {
                            console.log(err + '\nDuplicate Entry - users.js'); // FOR ERROR LOGGING
                            return callback(1,null);
                        } else {
                        console.log(err + '\nUnknown error occured.'); 
                        return callback(err,null);
                        }
                    } else {
                        console.log(result) 
                        return callback(null, result.insertId);
                    }
                });
            }
        });
    },
    getUsersid: function (userid, callback) {       // 3) GET retrieve a single user by their id
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to users!");
                var sql = 'SELECT * FROM users WHERE userid = ?';
                conn.query(sql,userid, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    }
                });
            }
        });
    },
    postCategory: function (catname,description,callback) {     // 4) POST Inserts a new category into category table
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to category!");
                var sql = 'INSERT INTO category(catname,description) VALUES(?,?)';
                conn.query(sql,[catname,description], function (err, result) {
                    conn.end();
                    if (err) {
                        if (err.code == 'ER_DUP_ENTRY') {
                            console.log(err + '\nDuplicate Entry - users.js'); // FOR ERROR LOGGING
                            return callback(1,null);
                        } else {
                        console.log(err + '\nUnknown error occured.'); 
                        return callback(err,null);
                        }
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    } 
                });
            }
        });
    },
    postPlatform: function (platform_name,description,callback) {   // 5) POST Inserts a new category into platform table
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to platform!");
                var sql = 'INSERT INTO platform(platform_name,description) VALUES(?,?)';
                conn.query(sql,[platform_name,description], function (err, result) {
                    conn.end();
                    if (err) {
                        if (err.code == 'ER_DUP_ENTRY') {
                            console.log(err + '\nDuplicate Entry - users.js'); // FOR ERROR LOGGING
                            return callback(1,null);
                        } else {
                        console.log(err + '\nUnknown error occured.'); 
                        return callback(err,null);
                        }
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    } 
                });
            }
        });
    },
    postGame: function (title,description,price,platformid,categoryid,year,callback) {  // 6) POST Inserts a new category into game table
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to game!");
                var sql = 'INSERT INTO game(title,description,price,platformid,categoryid,year) VALUES(?,?,?,?,?,?)';
                conn.query(sql,[title,description,price,platformid,categoryid,year], function (err, result) {
                    if (err) {
                        if (err.code == 'ER_DUP_ENTRY') {
                            console.log(err + '\nDuplicate Entry - users.js'); // FOR ERROR LOGGING
                            return callback(1,null);
                        } else {
                        console.log(err + '\nUnknown error occured.'); 
                        return callback(err,null);
                        }
                    } else {
                        console.log(result) 
                        return callback(null, result.insertId);
                    }
                });
            }
        });
    },
    getGamePlatform: function (platform_name, callback) {   // 7) GET retrieve all game listings for specified platform
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to database!");
                var sql = 'SELECT game.game_id AS gameid, game.timestamp AS created_at, game.title, game.description, game.price, game.year, game.categoryid AS catid, category.catname, platform.platform_name AS platform FROM game JOIN category JOIN platform WHERE game.categoryid = category.categoryid AND platform.platform_name = ?';
                conn.query(sql,platform_name, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    }
                });
            }
        });
    },
    deleteGame: function (game_id, callback) {  // 8) DELETE removes specific game listing by game_id from game - reviews for game should be CASCADE deleted as well.
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to game!");
                var sql = 'DELETE FROM game WHERE game_id = ?';
                conn.query(sql,game_id, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    }
                });
            }
        });
    },
    putGame: function (game_id,title,description,price,platformid,categoryid,year,callback) {   // 9) PUT updates a game listing
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to game!");
                var sql = 'UPDATE game SET title = ?, description = ?, price = ?, platformid = ?, categoryid = ?, year = ? WHERE (game_id = ?)';
                conn.query(sql,[title,description,price,platformid,categoryid,year,game_id], function (err, result) {
                    conn.end()
                    if (err) {
                        console.log(err + '\nUnknown error occured.'); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    }
                });
            }
        });
    },
    postReview: function (userid,game_id,content,rating,callback) {     // 10) POST used to add a new review to the review for given user and game
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to review!");
                var sql = 'INSERT INTO review(userid,game_id,content,rating) VALUES(?,?,?,?)';
                conn.query(sql,[userid,game_id,content,rating], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err + '\nUnknown error occured.'); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result.insertId);
                    }
                });
            }
        });
    },
    getGameReview: function (game_id, callback) {   // 11) GET retrieve reviews for a certain game
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to database!");
                var sql = 'SELECT review.game_id AS gameid, review.content, review.rating, users.username, review.created_at FROM review JOIN users WHERE review.userid = users.userid AND review.game_id = ?';
                conn.query(sql,game_id, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    }
                });
            }
        });
    },
    getGames: function (callback) {     // 12) GET all games info
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to game!");
                var sql = 'SELECT * FROM game';
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    }
                });
            }
        });
    },
    getPlatforms: function (callback) {     // 13) GET all game platforms info
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to platform!");
                var sql = 'SELECT * FROM platform';
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    }
                });
            }
        });
    },
    getCategories: function (callback) {    // 14) GET all game categories info
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to category!");
                var sql = 'SELECT * FROM category';
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    }
                });
            }
        });
    },
    deleteUser: function (userid, callback) {   // 15) DELETE removes specific user from database
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to users!");
                var sql = 'DELETE FROM users WHERE userid = ?';
                conn.query(sql,userid, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    }
                });
            }
        });
    },
    putUser: function (userid,username,email,password,type,profile_pic_url,callback) {  // 16) PUT updates user info
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err); 
                return callback(err,null);
            }
            else {
                console.log("Connected to users!");
                var sql = 'UPDATE users SET (username,email,password,type,profile_pic_url) VALUES(?,?,?,?,?) WHERE userid = ?';
                conn.query(sql,[username,email,password,type,profile_pic_url,userid], function (err, result) {
                    conn.end()
                    if (err) {
                        console.log(err + '\nUnknown error occured.'); 
                        return callback(err,null);
                    } else {
                        console.log(result) 
                        return callback(null, result);
                    }
                });
            }
        });
    },
}

module.exports = userDB
