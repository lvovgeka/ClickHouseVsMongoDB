var clickhouse = require('./client/click-client');

clickhouse.then(function (connection) {
    var before = new Date();
    connection.query('SELECT * FROM test.test limit 20', function (err, rows) {
        var after = new Date();
        var execution_mills = after - before;
        console.log('single query result', err, rows);
        console.log('start query :', before);
        console.log('end query :', after);
        console.log('time execution in ms:', execution_mills + 'ms');
    });
})

