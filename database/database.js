let Datastore = require('nedb');
let DataBase = new Datastore({ filename: "./database/sd.db", autoload: true  });
DataBase.loadDatabase();


const test = () =>{

    DataBase.insert({field1: 'field1Value'
        , field2: 5
      })
}

module.exports = {
    test,
}



