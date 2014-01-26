package com.rick.quiz.web;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;
import com.rick.quiz.data.model.Question;
import com.rick.quiz.data.model.QuestionSetAssociation;
import com.rick.quiz.data.model.Quiz;
import com.rick.quiz.data.repo.QuestionInnerRepo;
import com.rick.quiz.data.repo.QuizRepo;
import com.rick.quiz.web.Result.Status;


@Controller
@RequestMapping("/quiz")
public class QuizController {
	@Autowired
	QuizRepo quizRepo;
	
	@Autowired
	private QuestionInnerRepo questionRepo;
	
	@ResponseBody
	@RequestMapping(value="", method=RequestMethod.GET)
	public Result getQuestionSet(){
		List<Quiz> quizList = Lists.newArrayList(quizRepo.findAll());
		Result r = new Result(Status.SUCCESS);
		r.setResult(quizList);
		return r;
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}/questions", method=RequestMethod.GET)
	public Result getQuestionsByQuizId(@PathVariable("id") String id){
		Quiz quiz = quizRepo.findOne(id);
		int totalNum = quiz.getQuestionNum();
		List<QuestionSetAssociation> sets = quiz.getQuestionSets();
		List<Question> totalQuestionList = Lists.newArrayList();
		for(QuestionSetAssociation set : sets){
			float percent = set.getPercentage();
			int qsNum = (int) (totalNum * percent/100);
			List<Question> qsQuestions =  questionRepo.findByQuestionSetId(set.getQs().getId());
			//random ordered
			Collections.shuffle(qsQuestions);
			qsNum = qsNum <= qsQuestions.size() ? qsNum : qsQuestions.size();
			totalQuestionList.addAll(qsQuestions.subList(0, qsNum));
		}
		Result r = new Result(Status.SUCCESS);
		r.setResult(totalQuestionList);
		return r;
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public Result getQuizById(@PathVariable("id") String id){
		Quiz quiz = quizRepo.findOne(id);
		Result r = new Result(Status.SUCCESS);
		r.setResult(quiz);
		return r;
	}
	
	@Secured("ROLE_ADMIN")
	@ResponseBody
	@RequestMapping(value={"", "/{id}"}, method=RequestMethod.DELETE)
	public Result deleteQuestionSet(@PathVariable("id") String id){
		Quiz quiz = quizRepo.findOne(id);
		if(quiz != null){
			quizRepo.delete(quiz);
		}
		Result r = new Result(Status.SUCCESS);
		return r;
	}
	
	@Secured("ROLE_ADMIN")
	@ResponseBody
	@RequestMapping(value={"","/{id}"}, method=RequestMethod.POST)
	public Result createOrUpdateQuiz(@RequestBody Quiz quiz){
		quizRepo.save(quiz);
		Result r = new Result(Status.SUCCESS);
		r.setResult(quiz.getId());
		return r;
	}
}
