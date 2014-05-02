app.controller('QuizResultsCtrl', function($scope, $log, $location) {
  // $log.log('in results ctrl');

  $.when($.get('/quiz/mvc/quizresults/quizpairs'), $.get('/quiz/mvc/formfieldtype')).done(function(pairs, fields) {
    $scope.$apply(function() {
      $scope.quizpairs = pairs[0].result;

      $scope.fieldsMap = fields[0].result.reduce(function(map, field) {
        map[field.type] = field;
        return map;
      }, {});

      $log.log('quiz pairs is ', $scope.quizpairs, ' fields are ', $scope.fieldsMap);
      if ($scope.quizpairs[0]) {
        $scope.selectedQuiz = $scope.quizpairs[0].code;
      }
    });
  });



  $scope.$watch('selectedQuiz', function(quizcode) {
    console.log('selected quizcode is ', quizcode);
    if (!quizcode) {
      return;
    }
    $.get('/quiz/mvc/quizresults/' + quizcode).done(function(data) {
      $scope.$apply(function() {
        $scope.quizRecords = data.result;
        console.log('quizRecords is ', $scope.quizRecords);
        if ($scope.quizRecords.length != 0) {
          //moment(rec.secondsUsed).format('mm:ss')
          $scope.aaData = $scope.quizRecords.reduce(function(recordVos, rec) {
            var aa1 = [rec.score * 100, moment(rec.secondsUsed * 1000).format('mm:ss')];
            var aa2 = Object.keys(rec.user.userInfo).filter(function(el) {
              return (el !== 'capcha-input' && el !== 'quizCode');
            }).map(function(el) {
              return rec.user.userInfo[el];
            });
            recordVos.push(aa1.concat(aa2));
            return recordVos;
          }, []);

          $scope.columnData = Object.keys($scope.quizRecords[0].user.userInfo).filter(function(el) {
            return (el !== 'capcha-input' && el !== 'quizCode');
          }).reduce(function(aaCol, el) {
            if ($scope.fieldsMap[el]) {
              aaCol.push({
                sTitle: $scope.fieldsMap[el].name
              });
            }
            return aaCol;
          }, []);
          $scope.columnData = [{
            sTitle: '分数'
          }, {
            sTitle: '用时'
          }].concat($scope.columnData);
          console.log('quizRecords: ', $scope.quizRecords);
          console.log('columnData: ', $scope.columnData);
        } else {
          $scope.columnData = [];
          $scope.aaData = [];
        }


      });

    });

  });

});