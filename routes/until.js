/**
 * Created with IntelliJ IDEA.
 * User: xx
 * Date: 14-7-12
 * Time: 上午11:11
 * To change this template use File | Settings | File Templates.
 */

var until = exports;


//just for regexp
until.checkReg = function (arg_data, arg_reg) {

    var reg = new RegExp(arg_reg);
    if (!reg.test(arg_data)) {
        return false;
    } else {
        return true;
    }
};

