define(['question-item', 'result'], function(require, exports) {
    exports.render = function(tpl, quiz) {
        var questionList, elapsed, currentIdx, answers, timerId;
        elapsed = 0;
        answers = []; //anwser = {question:question, answer: answer}

        whenQuestionChange(function(idx) {
            currentIdx = idx;
            renderQuestionItem(idx);
        });

        getQuestionList(quiz).then(function(questionList) {
            renderQuestion(questionList);
            return Promise.resolve();
        }).then(function() {
            $(window).trigger('hashchange');
            startTimer(quiz.durationInMin);
        })['catch'](handleError);

        // ========== functions

        function whenQuestionChange(onQuestionChange) {
            $(window).on('hashchange', function(e) {
                var idx = $.deparam.fragment().idx || 0;
                idx = parseInt(idx);
                onQuestionChange(idx);
            });
        }

        function updateQuestionCtrl(updateIdx) {
            var count = questionList.length;
            var preIdx = updateIdx - 1;
            var nextIdx = updateIdx + 1;
            preIdx = preIdx < 0 ? 0 : preIdx;
            nextIdx = nextIdx + 1;
            console.log('preIdx: ', preIdx, ' nextIdx: ', nextIdx, 'count: ', count);
            var nextqText = nextIdx > count ? '提交' : '下一题';
            $('.nextq').text(nextqText);
            $('#question-select option').each(function(idx, opt) {
                if (updateIdx === idx) {
                    $(opt).attr('selected', true);
                }
            });
        }

        function renderQuestionItem(idx) {
            currentIdx = idx;
            var question = questionList[idx];
            console.log('question', question);
            $.get('templates/question-item.html').done(function(strTpl) {
                var questionItemHtml = _.template(strTpl)({
                    idx: idx,
                    question: question,
                    getImageStyle: function(question) {
                        return question.imageFileName ? 'question-image' : 'hidden';
                    }
                });
                // console.log(questionItemHtml);
                $('.question-item').html(questionItemHtml);
                updateQuestionCtrl(idx);
            });

        }

        function renderQuestion(questionList) {

            var h = tpl({
                currIdx: currentIdx,
                count: questionList.length,

                questions: questionList,
                quiz: quiz

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
            if (!checkAnswer(currentIdx)) {
                return;
            }
            console.log(questionList);
            var isFound = _.find(questionList, function(question) {

                if (!question.userAnswers || question.userAnswers.length === 0) {
                    console.log('question with no answer: ', question);
                    return true;
                }
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
            if (timerId) {
                clearTimeout(timerId);
            }
            (function executor() {
                timerId = setTimeout(function() {
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