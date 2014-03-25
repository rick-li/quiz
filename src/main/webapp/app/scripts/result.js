define(function(require, exports) {
    var quizResult;

    exports.render = function(tpl, quiz) {

        console.log('quizResult is: ', quizResult);
        if (!quizResult) {
            window.location.hash = $.param({
                stage: 'begin'
            });
            return;
        }

        var h = tpl({
            score: parseInt(quizResult.score),
            elapsed: getElapsedText(quizResult.elapsed)
        });

        $('#content').html(h);

    };

    function getElapsedText(elapseInSec) {
        var result = '';
        var elapseInMins = parseInt(elapseInSec / 60);
        if (!elapseInMins) {
            result = elapseInSec + '秒';
        } else {
            result = elapseInMins + '分';
        }
        return result;
    }

    exports.setQuizResult = function(aQuizResult) {
        quizResult = aQuizResult;
    };

});