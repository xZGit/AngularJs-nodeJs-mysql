/**
 * Created with IntelliJ IDEA.
 * User: xx
 * Date: 14-7-8
 * Time: 下午2:17
 * To change this template use File | Settings | File Templates.
 */

var config = exports;


config.db = {
    host: 'localhost',
    user: 'root',
    password: 'ak47forever',
    port: 3306, //port mysql
    database: 'msgServ'
};

config.testDb = {
    host: 'localhost',
    user: 'root',
    password: 'ak47forever',
    port: 3306, //port mysql
    database: 'test'
};

config.isNotCoverTest = true;