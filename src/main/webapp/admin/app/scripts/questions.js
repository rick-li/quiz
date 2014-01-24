app.controller('QuestionCtrl', function($scope, $log, $timeout, $resource, $routeParams) {
    $log.log('QuestionCtrl ', $routeParams['qsId']);
    $scope.qsId = $routeParams['qsId'];

    $scope.newItemCreated = false;
    $scope.newOptionCreated = false;

    var Question = $resource('/quiz/mvc/questions/:id?questionSetId=:qsId', {
        id: '@id',
        qsId: '@qsId'
    }, {
        query: {
            isArray: false,
            method: 'GET'
        }
    });

    $scope.query = function() {
        Question.query({
            qsId: $routeParams['qsId']
        }, function(data) {
            $log.log('result is ', data)
            $scope.questions = data.result;
            $scope.selectedItem = {
                options: [],
                rightAnswer: []
            };
            $scope.selectedOption = null;
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

    $scope.newOption = function() {
        $scope.newOptionCreated = true;
        $timeout(function() {
            $scope.newOptionCreated = false;
        }, 3000)
        $scope.selectedOption = null;
    };

    $scope.selectAnswer = function(e, opt) {
        if (e.target.checked) {
            $scope.selectedItem.rightAnswer = [opt];
        } else {
            $scope.selectedItem.rightAnswer = [];
        }

    };
    $scope.isAnswer = function(opt) {
        if (!$scope.selectedItem.rightAnswer) {
            return false;
        }
        return $scope.selectedItem.rightAnswer.indexOf(opt) != -1;
    };

    $scope.deleteOpt = function(opt) {
        var opts = $scope.selectedItem.options;
        opts.splice(opts.indexOf(opt), 1);
    };

    $scope.addOpt = function(opt) {
        if (!$scope.selectedItem.options) {
            $scope.selectedItem.options = [];
            $scope.selectedItem.rightAnswer = [];
        }
        if ($scope.selectedItem.options.length >= 4) {
            alert("不能大于4个");
            return;
        }
        if ($scope.selectedItem.options.indexOf(opt) != -1) {
            alert("不能重复");
            return;
        }
        $scope.selectedItem.options.push(opt);
        $scope.selectedOption = null;
    };

    $scope.delete = function(item) {
        Question.delete(item, function() {
            $scope.query();
        });
    };
    $scope.submit = function(item) {
        $log.log('submit question.', item);
        if (!item.rightAnswer || item.rightAnswer.length <= 0) {
            alert("必须选择答案");
            return;
        }
        item.questionSetId = $scope.qsId;
        Question.save(item, function() {
            $scope.query();
        });
    };

});