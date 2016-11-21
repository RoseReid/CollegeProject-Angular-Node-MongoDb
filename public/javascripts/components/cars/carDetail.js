(function(angular) {
  'use strict';
angular.module('cars') 

  .component('carDetail', {
    templateUrl: '/javascripts/components/cars/carDetail.html',
    controller: CarDetail,
    bindings: {
      $router: '<'
    }
  });

  CarDetail.$inject = ["$http"];

  function CarDetail($http){
  	var $ctrl = this; 
  	var id;
    $ctrl.$routerOnActivate = function(next){   //when this component is loaded and is activated-the code inside here will run
      if(next.params.id){
            id = next.params.id;
            $http.get('/api/cars/'+id).
            then(function(res){  //http get returns a promise
              console.log(res)
              $ctrl.car = res.data;
            });
      }

      $http.get('/api/customers').
      then(function(res){  //http get returns a promise
        console.log(res)
        $ctrl.customers = res.data;
      });

      $http.get('/api/employees').
      then(function(res){  //http get returns a promise
        console.log(res)
        $ctrl.employees = res.data;
      });


    };



     $ctrl.save = function(){

      if(id){
            console.log("save");
            $http.put('/api/cars/'+id, $ctrl.car).
            then(function(res){
              console.log(res)
      
            });
      }else{
            console.log("create");
            $http.post('/api/cars', $ctrl.car).
            then(function(res){
              console.log(res)
              $ctrl.$router.navigate(['CarDetail', {id: res.data._id}])
            });
          }

    }; 
    $ctrl.delete = function(){
    $http.delete('/api/cars/'+id).
    then(function(res){
      $ctrl.$router.navigate(['CarList'])
    })
    }
  }

})(window.angular);

