const mongoose = require('mongoose');

const dbName = "myDb";

var config = {};

config.database = "mongodb://localhost/" + dbName;

config.connect = function()
{
    mongoose.connect(config.database)
}

config.connection = function() 
{
    if(mongose.connection)
        return mongoose.connection;
    return this.connect();
}

module.exports = config;