/**
 * Created with IntelliJ IDEA.
 * User: xx
 * Date: 14-7-10
 * Time: 上午11:29
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var logger = require('./logger');

exports.saveFile = function (req, res) {

    console.log(req.body);
    console.log(req.files);

    var uploadedFile = req.files.imgPre;
    var tmpPath = uploadedFile.path;
    var targetPath = './uploads/' + uploadedFile.name;
    logger.I("targetPath "+targetPath);
    fs.rename(tmpPath, targetPath, function (err) {
        if (err) throw err;
        fs.unlink(tmpPath, function () {
            if (err) throw err;
            res.json({status: 0, msg: 'File Uploaded to ' + targetPath + ' - ' + uploadedFile.size + ' bytes'});
        });
    });
};
