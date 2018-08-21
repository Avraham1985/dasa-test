

var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http, $compile) {
    var vm = $scope;
    
  // vm.items = [];
    vm.sItems = [];
    vm.loadData = false;
    vm.loadSdata = false;
    vm.displayAll = false;
    
    //Get data from github api
    vm.getInfo = function () {
      
        vm.loading = true;
        var url = "https://api.github.com/search/repositories?q="; 
        $http.get(url + vm.qSearch).then(function (res) {  
            vm.loading = false;
            vm.items = res.data.items;
            vm.loadData = true;
               
        },function (res) {
                vm.errorMsg = 'Error: ' + response.data;
        });
    }
    //Get session item if exsist
    vm.getSessionItems = function () {
        var urlSe = "http://localhost:57980/api/session/getSessionItems";
        $http.get(urlSe).then(
            function (res) {
            vm.loadData = false;
            vm.loading = false;
            vm.displayAll = false;
                vm.sItems = res.data;
            vm.loadSdata = true;

        },
            function (res) {
                vm.errorMsg = 'Error: ' + res.data;
            });
    }
    //Add item to session
    vm.addToSession = function (item) {
        var item = {id: item.id, name: item.name, avatar_url: item.owner.avatar_url};
        $http.post('http://localhost:57980/api/session/addItem', item).then(function (data, status, headers, config) {
            vm.displayAll = true;
        }, function (data, status, headers, config) {
            //alert(data.data.Message);
            vm.displayAll = true;
        });
    }
});