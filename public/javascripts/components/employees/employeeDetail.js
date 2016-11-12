(function(angular) {
  'use strict';
angular.module('employees') 

  .component('employeeDetail', {
    templateUrl: '/javascripts/components/employees/employeeDetail.html',
    controller: EmployeeDetail,
    bindings: {
      $router: '<'
    }
  });

  EmployeeDetail.$inject = ["$http"];

  function EmployeeDetail($http){
    var $ctrl = this; 
    var id;
    $ctrl.$routerOnActivate = function(next){   //when this component is loaded and is activated-the code inside here will run
      if(next.params.id){
            id = next.params.id;
            $http.get('/api/employees/'+id).
            then(function(res){  //http get returns a promise
              console.log(res)
              $ctrl.employee = res.data;
            });
      }
    };

     $ctrl.save = function(){

      if(id){
            console.log("save");
            $http.put('/api/employees/'+id, $ctrl.employee).
            then(function(res){
              console.log(res)
      
            });
      }else{
            console.log("create");
            $http.post('/api/employees', $ctrl.employee).
            then(function(res){
              console.log(res)
              $ctrl.$router.navigate(['EmployeeDetail', {id: res.data._id}])
            });
          }

    }; 
    $ctrl.delete = function(){
    $http.delete('/api/employees/'+id).
    then(function(res){
      $ctrl.$router.navigate(['EmployeeList'])
    })
    }
  }



})(window.angular);

