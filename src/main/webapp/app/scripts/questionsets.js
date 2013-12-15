app.controller('QuestionSetCtrl', function($scope, $resource, $log, Status, MaskService) {
    $log.log('init QuestionSetCtrl');


    var QuestionSet = $resource('/mvc/questionsets/:userId', {
        userId: '@id'
    }, {
        query: {
            isArray: false,
            method: 'GET'
        }
    });


    QuestionSet.query(function(data) {
        $log.log('result is ', data)
        $scope.questionsets = data.result;
    });


    $scope.select = function(item) {
        $scope.selectedItem = item;
    };
    $scope.submit = function(item) {
        $log.log('submit question set.', item);
        QuestionSet.save(item);
    };
});