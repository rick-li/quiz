app.controller('QuestionSetCtrl', function($scope, $resource, $log, $timeout, $location, Status, MaskService) {
    $log.log('init QuestionSetCtrl');

    $scope.newItemCreated = false;
    var QuestionSet = $resource('/mvc/questionsets/:id', {
        id: '@id'
    }, {
        query: {
            isArray: false,
            method: 'GET'
        }
    });



    $scope.query = function() {
        QuestionSet.query(function(data) {
            $log.log('result is ', data)
            $scope.questionsets = data.result;
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
        QuestionSet.delete(item, function() {
            $scope.query();
        });
    };
    $scope.submit = function(item) {
        $log.log('submit question set.', item);
        QuestionSet.save(item, function() {
            $scope.query();
        });
    };


    $scope.toQuestionList = function(item) {

        $location.path('/questions/qsId/' + item.id);
    };
});