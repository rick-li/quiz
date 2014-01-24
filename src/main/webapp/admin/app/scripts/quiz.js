app.service('QuizService', function($rootScope, $log, $resource) {
    var Quiz = $resource('/quiz/mvc/quiz/:id', {
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
        $location.path('/quiz/new');
    };

    $scope.edit = function(item) {
        $location.path('/quiz/' + item.id);
    }

});