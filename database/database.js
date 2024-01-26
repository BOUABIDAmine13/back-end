var mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user: '',
    password: '',
    database: ''
});

connection.connect((err)=>{
    if(err) throw err;
    console.log('Database is connected successfully !');
});

connection.destroy

module.exports = connection;