var clickhouse = require('./client/click-client');


clickhouse.then(function (connection) {
    var before = new Date();
    connection.query('SELECT month, count() AS count FROM test.test GROUP BY month', function (err, rows) {
        console.log('single query result');
        console.log(rows);
        var after = new Date();
        var execution_mills = after - before;
        console.log('start query :', before);
        console.log('end query :', after);
        console.log('time execution in ms:', execution_mills + 'ms');
    });
})

