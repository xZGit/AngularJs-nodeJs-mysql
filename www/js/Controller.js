// http://docs.angularjs.org/guide/forms

function LoginController($scope, $resource){
  $scope.user = null;
  $scope.actionStatus = "success"
  $scope.actionStatusMsg= "Welcome";
  $scope.userMgrTitle = null;
  var waiting = "操作进行中 ...";
  var loginService = $resource('login');
    $scope.upload=function(){


        var urlTmp = "/saveFile";

        var postData = {
          mag:"hello"

        };
        $("#picForm").ajaxSubmit({
            data: postData,
            type: "POST",
            url: urlTmp,

            dataType: 'json', //数据格式为json
            resetForm: true,//布尔标志，表示如果表单提交成功是否进行重置。
            clearForm: true,//布尔标志，表示如果表单提交成功是否清除表单数据。

            success: function (arg_data) {


            },
            error: function (arg_data) { //

            }
        });





    }
  $scope.login=function(){
    var data = loginService.save({},$scope.user,function(){
      showActionStatus(data,$scope);

      if(data.status != 0){return;}

      setTimeout(function(){
        window.location ="userMgr.html";
      },0);


    }, function(data, status){
      if(!data.hasOwnProperty('status') || data.status == 0){
        data.status = 503;
      }
      showActionStatus(data,$scope);
    })
  };
}

function TrialController($scope, $resource, $location){
  $scope.user = null;
  $scope.actionStatus = "success"
  $scope.actionStatusMsg= "Welcome";
  $scope.userMgrTitle = null;
  var waiting = "操作进行中 ...";
  var userService = $resource('user/:userId');

  $scope.updateUser = function(){
    var u = $scope.user;

    if(!u){return;}

    if(!u.u_name || !u.cert || !u.role_id || !u.grp_id || !u.status){
      //$scope.$parent.actionStatusMsg;
      $scope.actionStatusMsg = "用户名、口令、角色、组与状态必须填写！";
      return;
    }

    if(!u.u_id){
      u.u_id = 0;
    }

    $scope.actionStatusMsg = waiting;
    $scope.actionStatus = "important";

    var data = userService.save({},u, function(){
      showActionStatus(data,$scope);

      if(data.status == 0 && u.u_id == 0 && data.data){
          console.log("psus");
          $scope.users.push(data.data);
      }
    }, function(data, status){
      if(!data.hasOwnProperty('status') || data.status == 0){
        data.status = 503;
      }

      showActionStatus(data,$scope);
    });

  };

  $scope.deleteUser = function(arg_user){
    if(!arg_user || !arg_user.u_id){return;}

    $scope.actionStatusMsg = waiting;
    $scope.actionStatus = "important";
    var data = userService.delete({userId:arg_user.u_id}, function(data){
      showActionStatus(data,$scope);

      if(data.status != 0){return;}
      $scope.users.splice( $.inArray(arg_user, $scope.users), 1);

    }, function(data,status){
      if(!data.hasOwnProperty('status') || data.status == 0){
        data.status = 503;
      }

      showActionStatus(data,$scope);
    });
  };

  $scope.editUser = function(arg_user){
    if(arg_user){
      $scope.userMgrTitle = "编辑用户信息";
    }
    else{
      $scope.userMgrTitle ="新建用户信息";
    }

    $scope.user = arg_user;
  };

  $scope.actionStatusMsg = waiting;
  $scope.actionStatus = "important";
  var data = userService.get({userId:"getFullList"}, function(){
    showActionStatus(data,$scope);

    if(data.status != 0){return;}
    $scope.users = data.data;

  }, function(data, status){
    if(!data.hasOwnProperty('status') || data.status == 0){
      data.status = 503;
    }

    showActionStatus(data,$scope);
  });

}

function showActionStatus(data, scope){
  if(data.status == 0){
    scope.actionStatusMsg = "操作成功!";
    scope.actionStatus = "success";
  }
  else {
    var msg =
        (data.hasOwnProperty('data') ?
            "服务器操作失败，请检查网络连接或联系服务提组织" :
            "操作失败");

    var reason = (data.hasOwnProperty('data') && data.data && (data.data.length > 0)) ||
        (data.hasOwnProperty('msg') && (data.msg.length > 0));

    reason = (reason ? "，原因：" : "");

    msg += "，错误代码：" + data.status + reason +
        ((data.hasOwnProperty('msg') && data.msg) ? data.msg : "") +
        ((data.hasOwnProperty('data') && data.data)? data.data : "");

    scope.actionStatusMsg = msg;
    scope.actionStatus = "warning"
  }
}

angular.module('trial',['ngResource']);

