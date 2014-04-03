var app = angular.module('quizAdmin', ['ngRoute', 'ngResource', 'angularFileUpload', 'ngGrid']);

app.constant('TPL_PATH', 'templates');
app.constant('UserEvent', 'UserEvent');
app.constant('MaskEvent', 'MaskEvent');
app.constant('ArticleEvent', 'ArticleEvent');

app.constant('Status', {
    'deleted': 'deleted',
    'new': 'new',
    'wait': 'wait'
});

app.config(function($routeProvider) {
    $routeProvider

    .when('/questions/qsId/:qsId', {
        templateUrl: 'templates/questions.html',
        controller: 'QuestionCtrl'
    })
        .when('/questionsets', {
            templateUrl: 'templates/questionsets.html',
            controller: 'QuestionSetCtrl'
        })
        .when('/quizs', {
            templateUrl: 'templates/quiz.html',
            controller: 'QuizCtrl'
        })
        .when('/quiz/:quizId', {
            templateUrl: 'templates/quiz-editor.html',
            controller: 'QuizEditor'
        })
        .when('/quizresults', {
            templateUrl: 'templates/quiz-results.html',
            controller: 'QuizResultsCtrl'
        })
        .when('/fieldtypes', {
            templateUrl: 'templates/form-field-types.html',
            controller: 'FormTypeCtrl'
        })
        .otherwise({
            redirectTo: '/quizs'
        });
});
app.controller('TestCtrl', function($scope, $log) {
    $log.log('Test Ctrl');
});
app.controller('BodyCtrl', function($scope, $rootScope, MaskEvent, $log) {
    $log.log('BodyCtrl');
    $scope.loadingMask = false;
    $rootScope.$on(MaskEvent, function(e, type) {
        $log.log('mask event', type);
        if (type === 'start') {
            $scope.loadingMask = true;
        } else {
            $scope.loadingMask = false;
        }
    });
});


app.controller('MenuCtrl', function($scope, $location) {
    $scope.isMenuSelected = function(menu) {
        var currentPath = $location.path();
        return currentPath.indexOf(menu) != -1;
    };
});

app.service('MaskService', ['$rootScope', 'MaskEvent', '$log',
    function($rootScope, MaskEvent, $log) {
        return {
            'start': function() {
                $log.log('mask service start');
                $rootScope.$emit(MaskEvent, 'start');
            },
            'stop': function() {
                $rootScope.$emit(MaskEvent, 'stop');
            }
        };
    }
]);

app.directive('ngConfirmClick', [
    function() {
        return {
            priority: -1,
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function(e) {
                    var message = attrs.ngConfirmClick;
                    if (message && !confirm(message)) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });
            }
        };
    }
]);

app.controller('NavCtrl', function($scope, $rootScope, $log, $location, UserEvent) {
    $log.log('nav ctrl');
    // $scope.currentUser = Parse.User.current();
    // $log.log($scope.currentUser);
    // $rootScope.$on(UserEvent, function(e, user) {
    //     $scope.currentUser = user;
    // })

    // $scope.logout = function() {
    //     Parse.User.logOut();
    //     $scope.currentUser = null;
    //     $location.path('/login')
    // };
});