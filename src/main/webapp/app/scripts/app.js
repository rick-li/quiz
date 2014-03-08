define(['begin', 'register', 'question', 'result', 'bbq'], function(require, exports, module) {
    var currentQuizCode, currentQuiz, currentStage;
    var qs = $.deparam.querystring();
    var qf = $.deparam.fragment();
    if (!qs.quiz) {
        alert("请指定试卷 - quiz");
        return;
    }
    currentQuizCode = qs.quiz;
    currentStage = qf.stage || 'begin';

    $(window).on('hashchange', function(e) {

        whenStageChange().then(getQuiz).then(handleStage)['catch'](function(error) {
            console.log('error, ', error);
        });
    });
    getQuiz().then(handleStage)['catch'](function(error) {
        console.log('error, ', error);
    });

    var routerCfg = {
        'begin': function(quiz) {
            var beginView = require('begin');
            renderUIWithTpl(beginView, quiz, 'templates/begin.html');
        },
        'register': function(quiz) {
            var registerView = require('register');
            renderUIWithTpl(registerView, quiz, 'templates/register.html');
        },
        'question': function(quiz) {
            var questionView = require('question');
            renderUIWithTpl(questionView, quiz, 'templates/question.html');
        },
        'result': function(quiz) {
            var resultView = require('result');
            renderUIWithTpl(resultView, quiz, 'templates/result.html');
        }
    };

    function whenStageChange() {
        return new Promise(function(resolve, reject) {
            var qs = $.deparam.fragment();
            if (qs.stage != currentStage) {
                currentStage = qs.stage;
                resolve();
            }
        });
    }

    function getQuiz() {
        return new Promise(function(resolve, reject) {
            var stage = currentStage;
            if (!currentQuiz) {
                $.get('/quiz/mvc/quiz/quizCode/' + currentQuizCode).done(function(quizResp) {
                    if (quizResp.status != "SUCCESS") {
                        reject(Error(quizResp.message));
                    } else {
                        currentQuiz = quizResp.result;
                        resolve([currentQuiz, stage]);
                    }
                }).fail(function(error) {
                    reject(error);
                });
            } else {
                resolve([currentQuiz, stage]);
            }
        });
    }

    function handleStage() {
        var args = arguments[0];
        var quiz = args[0];
        var stage = args[1];
        console.log('handle stage.');

        console.log('quiz: ', quiz, ' stage: ', stage);
        routerCfg[stage](quiz);
    }

    function renderUIWithTpl(view, quiz, tplUrl) {

        $.get(tplUrl).done(function(strTpl) {
            view.render(_.template(strTpl), quiz);
        }).fail(function(error) {
            console.log('fail to render with Tpl.');
        });
    }

});