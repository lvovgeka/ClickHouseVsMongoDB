
var faker = require('faker');
var mongoclient = require('./client/mongo-client');


function getData() {
    var testData = [];
    for(var i = 0; i < 500000; i++) {
        testData.push(
            {
                event_date: '2017-01-29',
                event_time:'2017-01-29 16:00:40',
                number: i,
                text: faker.lorem.text(),
                month: faker.date.month()
            }
        )
    }
    return testData;
}

var count = 0;
function insertData() {
    count ++;
    mongoclient.then( function(db) {

        var data = getData();
            var col = db.collection('testCollections');
            var before = new Date();
            console.log('start insert :', before);
            col.insertMany(
                data,
                {w: 1},
                function (err, result) {
                    var after = new Date();
                    console.log('end insert :', after);
                    var execution_mills = after - before;
                    console.log('count records', data.length);
                    console.log('time execution in ms:', execution_mills + 'ms');

                    if(count < 2)
                    {
                        insertData();
                    }
                    else {

                        db.close();
                    }
                });
    });
}

insertData();