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
            calculateRemainQuestionSets();
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

        $scope.remainFormFields = _.reduce($scope.quiz.formFields, function function_name(result, formField) {

            var foundFormField = _.findWhere(result, {
                id: formField.id
            });
            if (foundFormField) {
                var idx = result.indexOf(foundFormField);
                result.splice(idx, 1);
            }
            return result;
        }, $scope.fieldTypes.slice());
    };

    var calculateRemainQuestionSets = function() {
        if (!$scope.quiz || !$scope.questionSets) {
            return;
        }

        $scope.remainQuestionSets = _.reduce($scope.quiz.questionSets, function function_name(result, qsAssc) {

            var foundQs = _.findWhere(result, {
                id: qsAssc.qs.id
            });
            if (foundQs) {
                var idx = result.indexOf(foundQs);
                result.splice(idx, 1);
            }
            return result;
        }, $scope.questionSets.slice());

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
        if (!item.percentage) {
            alert("请输入百分比");
            return;
        }
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

    var validatePercetage = function(item) {
        if (!item.questionSets) {
            return false;
        }

        var sum = _.reduce(item.questionSets, function(result, qsAssc) {
            if (qsAssc.qs) {
                result += qsAssc.percentage;
            }
            return result;

        }, 0);
        $log.log('sum is ', sum)
        if (sum != 100) {
            alert("百分比相加应该是100.");
            return false;
        }
        return true
    };


    $scope.submit = function(item) {
        $log.log('submit quiz.', item);
        if (!validatePercetage(item)) {
            return;
        }
        QuizService.save(item, function() {
            query();
        });
    };

    $scope.cancel = function() {
        $location.path('/quizs');
    }
});