const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log('Unable to connect to MongoDB server');
  }
  const db = client.db('TodoApp');
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Pick Up'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Something to do'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete, retorna quem deletei
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  ////Challenge
  // db.collection('Users').deleteMany({name: 'Alphonse Elric'}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({age: '19'}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  // client.close();
});
