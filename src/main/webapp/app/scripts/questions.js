app.controller('QuestionCtrl', function($scope, $log, $resource, $routeParams) {
    $log.log('QuestionCtrl ', $routeParams['qsId']);

    $scope.newItemCreated = false;
    var Question = $resource('/mvc/questions/:id?questionSetId=:qsId', {
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
        Question.delete(item, function() {
            $scope.query();
        });
    };
    $scope.submit = function(item) {
        $log.log('submit question set.', item);
        Question.save(item, function() {
            $scope.query();
        });
    };

});