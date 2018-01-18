const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//todos criados para testar o metodo de listagem
//como os outros testes sao para o caso de não terem todos,
//foi preciso alimentar o banco com esses dois, para o teste de listagem
const todos = [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}];


//induz um estado inicial. No caso, os testes irão valer para quando
//não todos no banco, porém, a partir do segundo teste, o banco ja terá
//elementos. Para evitar a reescrita do codigo, o comando a seguir pode simular
//a nao existencia de objeto nenhum, no banco, antes das rotinas de teste.
// beforeEach((done) => {
//   Todo.remove({}).then(() => done());
// }); //removendo tudo o que há no banco

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err){ //se tiver algum erro em algum dos dois testes(expects) de cima, entra nesse if
          return done(err);
        }
        //saber se o text foi mesmo carregado para o BD (acaba sendo um teste separado do de cima)
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e)); //caso haja um erro
      });
  });

  it('should not create todo with invalid body data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err){
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));

      });
    });


});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done); //termino desse jeito, diferente dos exemplos de cima, pois não estou fazendo nada assincrono
  });
});

//mexer na parte de test do package.json
