const mysql = require('mysql');
// require("dotenv").config();

var con = mysql.createConnection({
    host: "b9bwzucmlaojuvk1yooa-mysql.services.clever-cloud.com",
    user: "u6qqbiybgbcwjnld",
    password: "sV12SgLoQyXtgGzHTdYp",
    database: "b9bwzucmlaojuvk1yooa",
    multipleStatements: true,
});
con.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = con;
