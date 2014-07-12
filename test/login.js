/**
 * Created with IntelliJ IDEA.
 * User: xx
 * Date: 14-7-8
 * Time: 上午11:12
 * To change this template use File | Settings | File Templates.
 */
var request = require('supertest');
var agent = request.agent();


//it is a function to get cookie

exports.login = function (request, done) {
    request
        .post('/login')
        .send({cert: 'cst',u_name:"admin"})
        .end(function (err, res) {
            if (err) {
               console.log( err);
            }
            agent.saveCookies(res);
            done(agent);
        });
};