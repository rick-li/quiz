app.controller('QuizEditor', function($scope, $routeParams, $resource, $log, $timeout, $location, QuestionSetService, QuizService, FormTypeService, Status, MaskService) {
    $log.log('quiz editor');
    $scope.selectedFormField = {};
    $scope.chosenFieldType = {};
    $scope.selectedQuestionSet = {};
    $scope.remainQuestionSets = [];
    $scope.remainFormFields = [];
    var query = function() {
        QuizService.get({
            id: quizId
        }, function(data) {
            $scope.quiz = data.result;
            calculateRemainFormFields();
        });
    };

    var quizId = $routeParams.quizId;
    if (quizId && quizId != 'new') {
        query();
    } else {
        //new quiz;
        $scope.quiz = {};
    }



    var calculateRemainFormFields = function() {
        if (!$scope.quiz || !$scope.fieldTypes) {
            return;
        }
        $scope.remainFormFields = $scope.fieldTypes.slice();
        angular.forEach($scope.quiz.formFields, function(formField) {
            var idx = $scope.remainFormFields.indexOf(formField);
            if (idx != -1) {
                $scope.remainFormFields.splice(idx, 1);
            }
        });
    };

    var calculateRemainQuestionSets = function() {
        if (!$scope.quiz || !$scope.questionSets) {
            return;
        }

        $scope.remainQuestionSets = $scope.questionSets.slice();
        angular.forEach($scope.quiz.questionSets, function(questionSetAssc) {
            var idx = $scope.remainQuestionSets.indexOf(questionSetAssc.qs);
            if (idx != -1) {
                $scope.remainQuestionSets.splice(idx, 1);
            }
        });
    }

    QuestionSetService.query(function(data) {
        $scope.questionSets = data.result;
        calculateRemainQuestionSets();
    });

    FormTypeService.query(function(data) {
        $scope.fieldTypes = data.result;

        calculateRemainFormFields();
    });

    $scope.addFormField = function(item) {

        $scope.quiz.formFields || ($scope.quiz.formFields = []);
        if ($scope.quiz.formFields.indexOf(item) == -1) {
            $scope.quiz.formFields.push(item);
        }
        calculateRemainFormFields();
    };


    $scope.setSelectedFormField = function(item) {
        $scope.selectedFormField = item;
    };

    $scope.deleteFormField = function(item) {
        var fields = $scope.quiz.formFields;
        if (!fields) {
            return;
        }
        var idx = fields.indexOf(item);
        if (idx != -1) {
            fields.splice(idx, 1);
        }
        calculateRemainFormFields();
    };
    var searchQs = function(item) {
        var idx = -1;
        angular.forEach($scope.quiz.questionSets, function(qset) {
            if (qset && qset.qs) {
                if (qset.qs.id === item.id) {
                    return idx;
                }
                idx++;
            }
        });
        return -1;
    }

    $scope.setSelectedQuestionSet = function(item) {
        $scope.selectedQuestionSet = item;
    };

    $scope.addQuestionSet = function(item) {
        $scope.quiz.questionSets || ($scope.quiz.questionSets = []);
        if (searchQs(item.qs) == -1) {
            $scope.quiz.questionSets.push(item);
        }
        $scope.selectedQuestionSet = {};
        calculateRemainQuestionSets();
    };

    $scope.deleteQuestionSet = function(item) {
        var qsets = $scope.quiz.questionSets;
        if (!qsets) {
            return;
        }

        var idx = qsets.indexOf(item);
        if (idx != -1) {
            qsets.splice(idx, 1);
        }
        calculateRemainQuestionSets();
    };

    $scope.submit = function(item) {
        $log.log('submit quiz.', item);
        QuizService.save(item, function() {
            query();
        });
    };
});