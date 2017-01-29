var clickhouse = require('clickhouse');
var Promise = require('promise');

var connect = null;

if(!connect) {
    connect = new Promise(function (resolve, reject) {

        resolve(new  clickhouse({
            url   : 'http://localhost',
            port  : 8123,
            debug : false
        }));
    })
}
module.exports = connect;