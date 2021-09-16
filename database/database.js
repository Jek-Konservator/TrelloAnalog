let Datastore = require('nedb');
let dataBase = new Datastore({ filename: "/database/asd", autoload: true  });
dataBase.loadDatabase(function (err) {
});

 /*   let doc = { field1: 'field1Value'
        , field2: 5
        , field3: new Date()
        , field4: true
        , field5: null
        , notToBeSaved: undefined
    };*/


