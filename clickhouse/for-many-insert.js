/**
 * Created by user on 29.01.17.
 */
var clickhouse = require('./client/click-client');
var faker = require('faker');
var Promise = require('promise');


//
// connection.query('SELECT * FROM test.test', function (err, rows) {
//     console.log('single query result', err, rows);
//
//
// });
// console.log('connection', connection.query())

function getData() {
    var testData = [];
    for(var i = 0; i < 500000; i++) {
        testData.push(
            [
                '2017-01-29',
                '2017-01-29 16:00:40',
                i,
                faker.lorem.text(),
                faker.date.month()
            ]
        )
    }
    return testData;
}

var count = 0;

function insertData() {
    clickhouse.then(function (connection) {
        var data = getData();
        var before = new Date();
        console.log('start insert :', before);

        connection.insertMany('test.test', data,function (err, res) {
            if(err){
                console.log('err!!!', err, res);
            } else {

                var after = new Date();
                console.log('end insert :', after);
                var execution_mills = after - before;
                console.log('count records', data.length);
                console.log('time execution in ms:', execution_mills + 'ms');

                console.log('insered', err, res);
                if(count < 100) {
                    insertData();
                }
            }


        })
    })

}
insertData();