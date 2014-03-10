define(function(require, exports) {

    exports.render = function(tpl, quiz) {
        var h = tpl(quiz);
        $('.header-title').text(quiz.name);
        $('#content').html(h);
    };
});