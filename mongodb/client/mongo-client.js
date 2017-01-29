var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');
var url = 'mongodb://localhost:27017/test';

var connect = null;

if(!connect) {
   connect = new Promise(function (resolve, reject) {
       MongoClient.connect(url, {native_parser:true}, function(err, db) {
           if(!err) {
               resolve(db);
           } else {
               reject(null);
           }
       });
   })
}

module.exports = connect;