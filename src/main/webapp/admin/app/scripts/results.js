app.controller('QuizResultsCtrl', function($scope, $log, $location) {
    $log.log('in results ctrl');

    $.get('/quiz/mvc/quizresults/test1').done(function(data) {
        $scope.$apply(function() {
            // $log.log(data);
            $scope.mydata = data.result;
        });

    });

});