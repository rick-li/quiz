app.controller('QuizCtrl', function($scope, $resource, $log, $timeout, $location, Status, MaskService) {
    $log.log('init QuizCtrl');

    $('textarea#quizEditor').ckeditor();

    $scope.newItemCreated = false;
    var Quiz = $resource('/mvc/quiz/:id', {
        id: '@id'
    }, {
        query: {
            isArray: false,
            method: 'GET'
        }
    });



    $scope.query = function() {
        Quiz.query(function(data) {
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

    $scope.delete = function(item) {
        Quiz.delete(item, function() {
            $scope.query();
        });
    };
    $scope.submit = function(item) {
        $log.log('submit quiz.', item);
        Quiz.save(item, function() {
            $scope.query();
        });
    };

});