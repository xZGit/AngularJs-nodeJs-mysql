/**
 * Created by xx on 14-7-7.
 */

/*
 for logger
 */


var fs = require('fs');
var logger = exports;
var timeFormat = "yyyy/MM/dd hh:mm:ss";
var debugLevel = 'debug';



var logFile = "./logfile.log";

var levels = ['ERROR', 'WARN', 'DEBUG', 'INFO'];

var log = function (level, message) {


    if (levels.indexOf(level) >= levels.indexOf(debugLevel)) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }


        var msg = forMatTime(timeFormat) + " " + " [" + level + '] : ' + message;

        console.log(msg);

        fs.appendFile(logFile, msg + "\r\n", function (err) {
            if (err) {
                console.log(err);
            }
        });


    }

};

logger.E = function (message) {
    log("ERROR", message);
};

logger.W = function (message) {
    log("WARN", message);

};

logger.D = function (message) {
    log("DEBUG", message);
};


logger.I = function (message) {
    log("INFO", message);
};


// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
var forMatTime = function (fmt) { //author:
    var date = new Date();
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

