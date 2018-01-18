const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//induz um estado inicial. No caso, os testes irão valer para quando
//não todos no banco, porém, a partir do segundo teste, o banco ja terá
//elementos. Para evitar a reescrita do codigo, o comando a seguir pode simular
//a nao existencia de objeto nenhum, no banco, antes das rotinas de teste.
beforeEach((done) => {
  Todo.remove({}).then(() => done());
}); //removendo tudo o que há no banco

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
        Todo.find().then((todos) => {
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
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));

      });
    });

  //mexer na parte de test do package.json
});
