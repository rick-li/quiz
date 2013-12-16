var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.constant('TPL_PATH', 'templates')


app.constant('UserEvent', 'UserEvent');
app.constant('MaskEvent', 'MaskEvent');
app.constant('ArticleEvent', 'ArticleEvent');

app.constant('Status', {
    'deleted': 'deleted',
    'new': 'new',
    'wait': 'wait'
});


// app.config(function($httpProvider) {
//     $httpProvider.defaults.headers.post = {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     };
// });
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
        .otherwise({
            redirectTo: '/questionsets'
        });
});

app.controller('BodyCtrl', function($scope, $rootScope, MaskEvent, $log) {
    $log.log('BodyCtrl')
    $scope.loadingMask = false;
    $rootScope.$on(MaskEvent, function(e, type) {
        $log.log('mask event', type)
        if (type === 'start') {
            $scope.loadingMask = true;
        } else {
            $scope.loadingMask = false;
        }
    });
});

app.service('MaskService', ['$rootScope', 'MaskEvent', '$log',
    function($rootScope, MaskEvent, $log) {
        return {
            'start': function() {
                $log.log('mask service start')
                $rootScope.$emit(MaskEvent, 'start');
            },
            'stop': function() {
                $rootScope.$emit(MaskEvent, 'stop');
            }
        }
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
        }
    }
]);

app.controller('NavCtrl', function($scope, $rootScope, $log, $location, UserEvent) {
    $log.log('nav ctrl')
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