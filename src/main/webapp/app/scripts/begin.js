define(function(require, exports) {
	
	exports.render = function(tpl, quiz) {
		var h = tpl(quiz)	
        $('#content').html(h);
    };
});