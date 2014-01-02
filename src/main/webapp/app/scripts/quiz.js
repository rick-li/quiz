app.service('QuizService', function($rootScope, $log, $resource) {
    var Quiz = $resource('/mvc/quiz/:id', {
        id: '@id'
    }, {
        query: {
            isArray: false,
            method: 'GET'
        }
    });

    return Quiz;
})

app.controller('QuizCtrl', function($scope, $resource, $log, $timeout, $location, QuizService, Status, MaskService) {
    $log.log('init QuizCtrl');

    $scope.newItemCreated = false;



    $scope.query = function() {
        QuizService.query(function(data) {
            $log.log('result is ', data)
            $scope.quizs = data.result;
        });
    };
    $scope.query();


    $scope.select = function(item) {
        $scope.selectedItem = item;
    };

    $scope.new = function() {
        $scope.newItemCreated = true;
        $timeout(function() {
            $scope.newItemCreated = false;
        }, 3000)
        $scope.selectedItem = {};
    };

    $scope.edit = function(item) {

    }

});