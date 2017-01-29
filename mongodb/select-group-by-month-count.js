var mongoclient = require('./client/mongo-client');
mongoclient.then(function(db) {
    var data = db.collection('testCollections');
    var before = new Date();
    data.aggregate([
        {
            "$group" : {
                _id : "$month", count:{
                    $sum:1
                }
            }
        }
    ], function (err, docs) {
        var after = new Date();
        var execution_mills = after - before;
        console.log('single query result');
        console.log(err);
        console.log(docs);
        console.log('start query :', before);
        console.log('end query :', after);
        console.log('time execution in ms:', execution_mills + 'ms');
        db.close();
    })

});