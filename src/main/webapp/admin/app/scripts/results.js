app.controller('QuizResultsCtrl', function($scope, $log, $location) {
    // $log.log('in results ctrl');

    $.get('/quiz/mvc/quizresults/quizpairs').done(function(data) {
        $scope.$apply(function() {

            $scope.quizpairs = data.result;
            $log.log('quiz pairs is ', $scope.quizpairs);
            if ($scope.quizpairs[0]) {
                $scope.selectedQuiz = $scope.quizpairs[0].code;
            }
        });
    });

    $scope.$watch('selectedQuiz', function(quizcode) {
        if (!quizcode) {
            return;
        }
        $.get('/quiz/mvc/quizresults/' + quizcode).done(function(data) {
            $scope.$apply(function() {

                $scope.mydata = data.result;
            });

        });

    });

});