var mysql = require('mysql');

var dbConnect = {

    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "REPLACE",
            password: "REPLACE",
            database: "REPLACE"

        }

        );

        return conn;

    }
}
module.exports = dbConnect;