const assert = require('assert');
const request = require('supertest');
const app = require('../server.ts');

describe('Api testing', () => {
    it('Should return all users', ( done )  => {
      request(app).get('/api/users')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200)
          .then((response:any) =>{
              if(!Array.isArray(response.body)) throw new Error('Should be of type array');
              done();
          })
    });
    it('Should fail when sending no data', ( done ) => {
        request(app).post('/api/users')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(422)
            .then((response:any) => {
               if(!response.body.message) throw new Error('Message is not defined.');
               assert.deepEqual(response.body.message, 'Email and password field are required.', 'Message is not correct.');
               done();
            });
    });
    it('Should add new user when right data is sent', ( done ) => {
        request(app).post('/api/users')
            .set('Content-Type', 'application/json')
            .send({
                email: 'sevo2101s@gmail.com',
                password: 'Some password'
            })
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then((response:any) => {
                assert.deepEqual(response.body.message, 'User created');
                done();
            })
    });
    it('Should return 404', ( done ) => {
        request(app)
            .get('/api/should/give/404')
            .expect(404, done)
    });
});