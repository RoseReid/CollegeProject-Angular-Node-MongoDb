(function(angular) {
  'use strict';
angular.module('employees') 

  .component('employeeList', {
    templateUrl: '/javascripts/components/employees/employeeList.html',
    controller: EmployeeList
  });

  EmployeeList.$inject = ["$http"];


  function EmployeeList($http){
    var $ctrl = this; 
    $ctrl.employees = [];
    $ctrl.$routerOnActivate = function(next){   //when this component is loaded and is activated-the code inside here will run
      $http.get('/api/employees').
      then(function(res){  //http get returns a promise
        console.log(res)
        $ctrl.employees = res.data;
      })
    }
  }
  
})(window.angular);

