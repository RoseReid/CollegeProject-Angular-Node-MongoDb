(function(angular) {
  'use strict';
angular.module('customers') 

  .component('customerDetail', {
    templateUrl: '/javascripts/components/customers/customerDetail.html',
    controller: CustomerDetail,
    bindings: {
      $router: '<'
    }
  });

  CustomerDetail.$inject = ["$http"];

  function CustomerDetail($http){
    var $ctrl = this; 
    var id;
    $ctrl.$routerOnActivate = function(next){   //when this component is loaded and is activated-the code inside here will run
      if(next.params.id){
            id = next.params.id;
            $http.get('/api/customers/'+id).
            then(function(res){  //http get returns a promise
              console.log(res)
              $ctrl.customer = res.data;
            });
      }
    };

     $ctrl.save = function(){

      if(id){
            console.log("save");
            $http.put('/api/customers/'+id, $ctrl.customer).
            then(function(res){
              console.log(res)
      
            });
      }else{
            console.log("create");
            $http.post('/api/customers', $ctrl.customer).
            then(function(res){
              console.log(res)
              $ctrl.$router.navigate(['CustomerDetail', {id: res.data._id}])
            });
          }

    }; 
  }

})(window.angular);

