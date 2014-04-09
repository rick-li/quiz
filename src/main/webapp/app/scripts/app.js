define(function(require, exports, module) {
  var beginView = require('begin');
  var registerView = require('register');
  var questionView = require('question');
  var resultView = require('result');

  var currentQuizCode, currentQuiz, currentStage;
  var qs = $.deparam.querystring();
  var qf = $.deparam.fragment();
  if (!qs.quiz) {
    alert("请指定试卷 - quiz");
    return;
  }
  currentQuizCode = qs.quiz;
  currentStage = qf.stage || 'begin';

  $(window).off('hashchange').on('hashchange', function(e) {
    whenStageChange().then(getQuiz).then(handleStageChange).fail(handleError);
  });

  //initialize the app
  getQuiz().then(handleStageChange).fail(handleError);

  function whenStageChange() {
    var defer = $.Deferred();
    var qs = $.deparam.fragment();
    if (qs.stage != currentStage) {
      currentStage = qs.stage;
      defer.resolve();
    }
    return defer;
  }

  function getQuiz(defer) {
    if (!defer) {
      defer = $.Deferred();
    }
    if (!currentQuiz) {
      $.get('/quiz/mvc/quiz/quizCode/' + currentQuizCode).done(function(quizResp) {
        if (quizResp.status != "SUCCESS") {
          defer.reject(Error(quizResp.message));
        } else {
          currentQuiz = quizResp.result;
          defer.resolve(currentQuiz);
        }
      }).fail(function(error) {
        defer.reject(error);
      });
    } else {
      defer.resolve(currentQuiz);
    }
    return defer;
  }

  function handleStageChange(quiz) {
    var stage = currentStage;
    switch (stage) {
      case 'begin':
        renderUIWithTpl(beginView, quiz, 'templates/begin.html');
        break;
      case 'register':
        renderUIWithTpl(registerView, quiz, 'templates/register.html?a=1');
        break;
      case 'question':
        renderUIWithTpl(questionView, quiz, 'templates/question.html?a=13134');
        break;
      case 'result':
        renderUIWithTpl(resultView, quiz, 'templates/result.html');
        break;
    }
  }

  function renderUIWithTpl(view, quiz, tplUrl) {
    $.get(tplUrl).done(function(strTpl) {
      view.render(_.template(strTpl), quiz);
    }).fail(function(error) {
      console.log('fail to render with Tpl.');
    });
  }


  function handleError(error) {
    console.log('Error is ', error);
  }
});