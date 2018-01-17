var mongoose = require('mongoose');

//dizendo ao mongoose que estarei usando promises
mongoose.Promise = global.Promise;
//conectando ao mongodb
mongoose.connect('mongodb://localhost:27017/TodoApp');

//criando um modelo, que especifica os atributos de cada propridade do elemento
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true, //like not null, in sql
    minlength: 1,
    trim: true //remove os espaços em branco do inicio e do final da String
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

//criei um elemento especifico
// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// //inseri esse elemento no banco
// newTodo.save().then((doc) => {
//   console.log("Saved todo", doc);
// }, (err) => {
//   console.log('Unable to save todo');
// });

// var newTodo = new Todo({
//   text: 'Go to restaurant',
//   completed: true,
//   completedAt: 22
// });
// var newTodo = new Todo({
//   text: 'Become rich' //posso por true q o mongoose tranforma em string (cast)
// });
//
// //o then é pra eu fazer algo, depois que a tentativa de salvar acontece
// newTodo.save().then((doc) => {
//   console.log("Saved todo", JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log('Unable to save', err);
// });

// User model
// email - require, trim, set type(string) set min length of 1
// create new user

var Users = mongoose.model('Users', {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    }
});

var newUser = new Users({email: ' test@gmail.com '});

newUser.save().then((doc) => {
  console.log('User saved', JSON.stringify(doc, undefined, 2));
}, (err) => {
  console.log('Unable to save the user.');
});
