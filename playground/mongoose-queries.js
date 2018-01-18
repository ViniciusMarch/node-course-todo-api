const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');

// var id = '5a6115fa3b05d7d43c2c130144';
//
// if(!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id //converte a string para o ObjectID
// }).then((todos) => {
//   console.log('Todos', todos);
// }); //se nao achar nada, retorna uma lista vazia
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });//retorna null, se nao encontrar nada

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));

//User.findById, funciona,
//nao funciona: usuario nao existe e outros erros

var id = '5a5fc70978223bbc32c73d75';

Users.findById(id).then((user) => {
  if(!user){ // o usuario nao existe mas nao ocorreu erro, ele entrou na primeira parte da promise
    return console.log('User not found');
  }
  console.log('User by ID', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
