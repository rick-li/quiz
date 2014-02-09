define(['begin', 'jquery-migrate', 'jquery-ui-widget', 'bbq'], function(require, exports, module) {
    var currentQuiz;
	
	var hashPromise = new Promise(function(resolve, reject){
		$(window).on('hashchange', function(e) {
			var frags = $.deparam.fragment();
			if(frags.quizCode){
				resolve(frags);
			}else{
				reject(Error("请指定试卷 - quizCode"));
			}
		});
	});

	var quizPromise = function (frags) {
		return new Promise(function (resolve, reject) {
			if (!currentQuiz) {
	            $.get('/quiz/mvc/quiz/quizCode/'+frags.quizCode).done(function(quizResp) {
	            	if(quizResp.status!="SUCCESS"){
	            		reject(Error(quizResp.message));
	            	}else{
	            		currentQuiz = quizResp.result;
	                	resolve(currentQuiz, frags);	
	            	}
	            	
	            }).fail(function (error) {
	            	reject(error);
	            });
	        } else {
	            resolve(currentQuiz, frags);
	        }	
		});
	}
    
    //Trigger hashchange at least once.
    $(window).trigger('hashchange');

	var handleStage = function(quiz, stage) {
		stage = stage ? stage : 'begin';
    	console.log('quiz: ', quiz, ' stage: ', stage);
    	routerCfg[stage](quiz);	
    }

    var routerCfg = {
    	'begin': function (quiz) {
    		var beginView = require('begin');
	        console.log(beginView);
	        beginView.render('hello');
    	},
    	'register': function (quiz) {
    		var registerView = require('register');
        	console.log(beginView);
        	beginView.render('hello');
    	},
    	'question': function (quiz) {	
    		var questionView = require('question');
        	console.log(questionView);
        	questionView.render(quiz);
    	}
    };


	hashPromise.then(quizPromise).then(handleStage).catch(function (error) {
		console.log('error, ', error);
	});
});