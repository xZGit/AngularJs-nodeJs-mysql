/**
 * Created by xx on 14-7-6.
 */


var common = require('./common');
var logger = require('./logger');
var until = require('./until');


var numReg = "^[0-9]*[1-9][0-9]*$";


exports.login = function (req, res) {

    var pwd = req.param("cert");
    logger.I("req body " + JSON.stringify(req.body));
    var name = req.param("u_name");

    if (!pwd || !name || pwd == "" || name == "") {
        res.json({status: common.errorStatus, msg: "please fill the blank "});
        return;
    }


    req.getConnection(function (err, connection) {

        if (err) {
            console.log("Error Selecting : %s ", err);
            res.json({status: common.errorStatus, msg: "sql err"});
            return;
        }

        var sqlStr = "SELECT count(*) AS CNT FROM T_USER WHERE U_NAME= ? AND CERT=? ";
        var query = connection.query(sqlStr, [name, pwd], function (err, rows) {

            if (err) {
                console.log("Error Selecting : %s,%s ", err, sqlStr);
                res.json({status: common.errorStatus, msg: "sql err"});
            }
            console.log("row : %v ", rows);
            if (rows[0].CNT <= 0) {
                console.log("user dont exit");
                res.json({status: common.errorStatus, msg: "user dose does exit"});
            }

            //set the session
            req.session.userName = name;

            res.json({status: 0, msg: "login success"});


        });

    });
};

exports.getUser = function (req, res) {
    logger.I("req body " + JSON.stringify(req.body));
    logger.I("req session " + req.session);

    //check session
    if (req.session.userName == "" || typeof req.session.userName == "undefined") {

        res.json({status: common.errorStatus, msg: "please login"});
        return;
    }


    var userId = req.params.userId;
    logger.I("userId: " + userId);

    var where = null;
    if (userId == "getFullList") {
        where = "  1=1 ";
    } else if (until.checkReg(userId, numReg)) {
        where = "  u_id = " + userId + "";
    } else {
        res.json({status: 1, msg: "err type"});
    }


    req.getConnection(function (err, connection) {


        var sqlStr = "SELECT  u_id, u_name,cert,role_id,grp_id,status FROM T_USER where " + where;
        console.log(sqlStr);
        var query = connection.query(sqlStr, [], function (err, rows) {

            if (err) {
                console.log("Error Selecting : %s,%s ", err, sqlStr);
                res.json({status: common.errorStatus, msg: "sql err"});
                return;

            }

            res.json({status: 0, msg: "success", data: rows});


        });


    });
};

exports.deleteUser = function (req, res) {

    var id = req.params.userId;

    logger.I("req.params.userId " + req.params.userId);

    //check session
    if (req.session.userName == "" || typeof req.session.userName == "undefined") {

        res.json({status: common.errorStatus, msg: "please login"});
        return;
    }

    //check session
    if (id == "" || typeof id == "undefined" || !until.checkReg(id, numReg)) {

        res.json({status: common.errorStatus, msg: "invalid user"});
    }


    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM t_user  WHERE u_id = ? ", [id], function (err, rows) {

            if (err) {
                console.log("Error deleting : %s ", err);
                res.json({status: common.errorStatus, msg: "sql err"});
                return;
            }

            res.json({status: 0, msg: "success"});
        });

    });
};

exports.userServ = function (req, res) {

    //check session
    if (req.session.userName == "" || typeof req.session.userName == "undefined") {

        res.json({status: common.errorStatus, msg: "please login"});
        return;
    }


    console.log(JSON.stringify(req.body));
    var input = JSON.parse(JSON.stringify(req.body));
    var id = input.u_id;

    var sqlStr = "";
    //the excute sql is insert
    if (id == "" || typeof id == "undefined") {
        sqlStr = "INSERT INTO t_user set ?";
    } else {                         //it is update

        sqlStr = "UPDATE t_user set ? WHERE u_id ='" + id + "'";
    }
    req.getConnection(function (err, connection) {

        var data = {

            u_name: input.u_name,
            cert: input.cert,
            status: input.status,
            role_id: input.role_id,
            grp_id: input.grp_id

        };

        connection.query(sqlStr, [data], function (err, result) {

            if (err) {
                console.log("Error deleting : %s ", err);
                res.json({status: common.errorStatus, msg: "sql err"});
                return;
            }

            input.u_id = result.insertId;

            res.json({status: 0, msg: "success", data: input});
        });


    });
};