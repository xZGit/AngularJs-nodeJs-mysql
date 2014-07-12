/**
 * Created by xx on 14-7-7.
 */

var config = require('../config');

//change to test db
config.db = config.testDb;

//set test runnable
//set it false when you want to get the coverage report
config.isNotCoverTest =true;


/*
 for generate coverage report

 first  add jscoverage path to you environment var
 then  cd the workplace and run  jscoverage --no-highlight {{folderName}} {{folderName-cov}}
 then  set  config.isNotTest to load the  folderName-cov js while start app
 last  run  cmd  mocha -R html-cov > coverage.html

 */


var app = require('../app.js');
var request = require('supertest')(app)
    , express = require('express');
var login = require('./login');
var should = require('should');
var logger = require('../routes/logger');

//
describe('Check index', function () {
    it('get the index success', function (done) {
        request.get('/')
            .expect(200, done);
    })
});

describe('check login ', function () {
    it('the login is exist', function (done) {
        request.post('/login')
            .send({cert: 'cst', u_name: "admin"})
            .end(function (err, res) {
                var result = JSON.parse(res.text);
                result.should.have.property('status', 0);
                done();
            });
    });
    it('the param is not right', function (done) {
        request.post('/login')
            .send({cert: 'cst'})
            .end(function (err, res) {
                var result = JSON.parse(res.text);
                result.should.have.property('status', 1);
                done();
            });
    });
    it('the user does not exist ', function (done) {
        request.post('/login')
            .send({cert: '111', u_name: "admin"})
            .end(function (err, res) {
                var result = JSON.parse(res.text);
                result.should.have.property('status', 1);
                done();
            });
    })


});

describe('GET USER ', function () {


    var agents;
    //get cookie
    before(function (done) {
        login.login(request, function (loginAgent) {
            agents = loginAgent;
            done();
        });
    });


    it('the status is correct', function (done) {
        var req = request.get('/user/getFullList');
        agents.attachCookies(req);
        req.end(function (err, res) {
            var result = JSON.parse(res.text);
            result.should.have.property('status', 0);
            done();
        });
    });

    it('the param is not right', function (done) {
        var req = request.get('/user/xx');
        agents.attachCookies(req);
        req.end(function (err, res) {
            var result = JSON.parse(res.text);
            result.should.have.property('status', 1);
            done();
        });
    });

    it('get single people success', function (done) {
        var req = request.get('/user/1');
        agents.attachCookies(req);
        req.end(function (err, res) {
            var result = JSON.parse(res.text);
            result.should.have.property('status', 0);
            done();
        });
    });


    it('not seseeion', function (done) {
        var req = request.get('/user/1');
        req.end(function (err, res) {
            var result = JSON.parse(res.text);
            result.should.have.property('status', 1);
            done();
        });
    });


});

describe('DELETE USER ', function () {


    var agents;
    //get cookie
    before(function (done) {
        login.login(request, function (loginAgent) {
            agents = loginAgent;
            done();
        });
    });


    it('the status is correct', function (done) {
        var req = request.delete('/user/2');
        agents.attachCookies(req);
        req.end(function (err, res) {
            var result = JSON.parse(res.text);
            result.should.have.property('status', 0);
            done();
        });
    });

    it('the param is not right', function (done) {
        var req = request.get('/user/xx');
        agents.attachCookies(req);
        req.end(function (err, res) {
            var result = JSON.parse(res.text);
            result.should.have.property('status', 1);
            done();
        });
    });

});

describe(' USER SERV', function () {


    var agents;
    //get cookie
    before(function (done) {
        login.login(request, function (loginAgent) {
            agents = loginAgent;
            done();
        });
    });

    var addUser = {
        u_id: 0,
        u_name: "xx",
        cert: "123456",
        status: 0,
        role_id: 1,
        grp_id: 1
    };

    var updUser = {
        u_id: 22,
        u_name: "xx",
        cert: "123456",
        status: 0,
        role_id: 1,
        grp_id: 1
    };


    it('it is update', function (done) {
        var req = request.post('/user');
        agents.attachCookies(req);
        req.send(updUser)
           .end(function (err, res) {
            var result = JSON.parse(res.text);
            result.should.have.property('status', 0);
            done();
        });
    });

    it('it is insert', function (done) {
        var req = request.post('/user');
        agents.attachCookies(req);
        req.send(addUser)
           .end(function (err, res) {
            var result = JSON.parse(res.text);
            result.should.have.property('status', 0);
            done();
        });
    });

    it('it is insert', function (done) {
        var req = request.post('/user');
        req.send(addUser)
            .end(function (err, res) {
            var result = JSON.parse(res.text);
            result.should.have.property('status', 1);
            done();
        });
    });
});


//test upload
describe('upload', function() {
    it('a file', function(done) {
        request.post('/saveFile')
            .field('extra_info', '{"in":"case you want to send json along with your file"}')
            .attach('imgPre', 'file.jpg')
            .end(function(err, res) {
                var result = JSON.parse(res.text);
                result.should.have.property('status', 0);// 'success' status
                done()
            });
    });
});