define(['result'], function(require, exports) {
    exports.render = function(tpl, quiz) {
        var questionList, elapsed, currentIdx, answers;
        elapsed = 0;
        answers = []; //anwser = {question:question, answer: answer}

        whenQuestionChange(function(idx) {
            currentIdx = idx;
            getQuestionList(quiz).then(renderQuestion.curry(idx))['catch'](handleError);
        });


        $(window).trigger('hashchange');

        startTimer(quiz.durationInMin);

        // ========== functions

        function whenQuestionChange(onQuestionChange) {
            $(window).on('hashchange', function(e) {
                var idx = $.deparam.fragment().idx || 0;
                idx = parseInt(idx);
                onQuestionChange(idx);
            });
        }

        function renderQuestion(idx, questionList) {
            var question = questionList[idx];
            console.log('question', question);
            var h = tpl({
                currIdx: idx,
                count: questionList.length,
                question: question,
                questions: questionList,
                quiz: quiz,
                getImageStyle: function(question) {
                    return question.imageFileName ? 'question-image' : 'hidden';
                }
            });
            $('#content').html(h);

            $('.question-ctrls .preq').on('click', function(e) {
                changeQuestion(currentIdx - 1);
            });

            $('.question-ctrls .nextq').on('click', function(e) {
                if (currentIdx + 1 == questionList.length) {
                    submit();
                } else {
                    changeQuestion(currentIdx + 1);
                }
            });

            $('.question-options input').on('change', function(e) {
                var selectedOpt = $(this);
                console.log('change option ', selectedOpt.val());
                var currentQuestion = questionList[idx];
                currentQuestion.userAnswers = [selectedOpt.val()];
            });

            $('#question-select').on('change', function(e) {
                var newQuestionIdx = "";
                $('#question-select option:selected').each(function() {
                    newQuestionIdx = $(this).val();
                    changeQuestion(newQuestionIdx);
                });
                console.log('selected question ' + newQuestionIdx);
            });
        }

        function submit() {

            if (!checkAllAnswers()) {
                alert("提交前请选择所有答案");
                return false;
            }

            var postJson = {
                quizCode: quiz.code,
                quizName: quiz.name,
                secondsUsed: parseInt(elapsed / 1000),
                userQuestions: questionList
            };
            var postStr = JSON.stringify(postJson);
            console.log('submitting, ', postJson);
            $.ajax({
                type: 'POST',
                url: '/quiz/mvc/user/submit',
                data: postStr,
                contentType: 'application/json',
                dataType: 'json'

            }).done(function(result) {
                if (result.status === 'SUCCESS') {
                    //success
                    console.log('success: ', result);
                    console.log('result is ', require('result'));
                    require('result').setQuizResult(result.result);
                    window.location.hash = $.param({
                        stage: 'result'
                    });

                } else {
                    console.log('error');
                }
            }).fail(function(error) {
                console.log('error: ', error);
            });
        }

        function changeQuestion(newIdx) {
            if (newIdx < 0 || newIdx > questionList.length) {
                console.log('index ' + newIdx + ' is out of scope, return.');
                return;
            }
            if (checkAnswer(currentIdx)) {
                var fragArgs = {
                    stage: 'question',
                    idx: newIdx
                };
                window.location.hash = $.param(fragArgs);
            }
        }

        function getQuestionList(quiz) {
            return new Promise(function(resolve, reject) {
                if (questionList) {
                    resolve(questionList);
                } else {
                    $.get('/quiz/mvc/user/quizCode/' + quiz.code + '/questions', function(result) {
                        if (result.status === 'SUCCESS') {
                            questionList = result.result;
                            resolve(result.result);
                        } else {
                            reject(Error(result.message));
                        }
                    }).fail(function(error) {
                        reject(error);
                    });
                }
            });
        }

        //return true for right, false for wrong.

        function checkAllAnswers() {

            var isFound = _.find(questionList, function(question) {

                return (!question.userAnswers || question.userAnswers.length === 0);
            });
            console.log('is found ', isFound);
            return _.isUndefined(isFound);
        }

        function checkAnswer(currentIdx) {
            var selectedValue = $('.question-options input:checked').val();
            if (!selectedValue) {
                alert('请选择答案');
                return false;
            }
            questionList[currentIdx].userAnswers = [selectedValue];
            return true;
        }

        function startTimer(durationInMin) {
            var durationInMillSec = durationInMin * 60 * 1000;

            (function executor() {
                setTimeout(function() {
                    elapsed += 1000;
                    // console.log('elapsed: ', elapsed);
                    var remains = durationInMillSec - elapsed;
                    var mins = parseInt(remains / (1000 * 60));
                    var secs = parseInt((remains - (mins * 1000 * 60)) / 1000);
                    mins = mins < 10 ? '0' + mins : mins;
                    secs = secs < 10 ? '0' + secs : secs;
                    if (durationInMillSec > elapsed) {
                        $('#question-timer').text(mins + ':' + secs);
                        executor();
                    } else {

                    }
                }, 1000);
            })();

        }

        function handleError(error) {
            console.log(error);
        }
    };

});