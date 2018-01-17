const {MongoClient, ObjectID} = require('mongodb');

// var user = {name: 'Vinicius', age: 23};
// var {name} = user;
// console.log(name);
//
// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log('Unable to connect to MongoDB server');
  }
  const db = client.db('TodoApp');
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  //Insert new doc into Users (name, age, location)
  // db.collection('Users').insertOne({
  //   name: 'Alphonse Elric',
  //   age: '17',
  //   location: 'Germany'
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert todo');
  //   }
  //
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });


  client.close();
});
