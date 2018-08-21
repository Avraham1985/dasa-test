

var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http, $compile) {

    //lists
    $scope.items = [];
    $scope.sessionItems = [];

    //searching for items by keywords
    $scope.search = function () {
        $http.get('https://api.github.com/search/repositories?q=' + $('#txtSearch').val())
            .then(function (response) {                
                $('#book-section').addClass('hidden');
                $("#main-section").removeClass('hidden');
                $scope.items = response.data.items;
            });
    }
    //get lists from session if exsist and after hide the view
    $scope.getBookItems = function () {
        $http.get('http://localhost:57980/api/session/getSessionItems')
            .then(function (response) {
                $scope.sessionItems = response.data;
                $("#main-section").addClass('hidden');
                $('#book-section').removeClass('hidden');                
            });
    }
    //add item to session only if he isn't exsist
    $scope.bookMe = function (item) {
        var item = {
            id: item.id, name: item.name, avatar_url: item.owner.avatar_url
        };

        $http.post("http://localhost:57980/api/session/addItem", item).then(function (data, status, headers, config) {
            alert(data.data);
        }, function (data, status, headers, config) {
            alert(data.data.Message);
        });
    }
});