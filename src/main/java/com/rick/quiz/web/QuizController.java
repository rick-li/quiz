package com.rick.quiz.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.rick.quiz.data.model.Quiz;
import com.rick.quiz.data.repo.QuizRepo;
import com.rick.quiz.web.Result.Status;


@Controller
@RequestMapping("/quiz")
public class QuizController {
	@Autowired
	QuizRepo quizRepo;
	
	Gson gson = new Gson();
	
	@Secured("ROLE_ADMIN")
	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public String getQuestionSet(@PathVariable("id") String id){
		Quiz quiz = quizRepo.findOne(id);
		Result r = new Result(Status.SUCCESS);
		r.setResult(quiz);
		return gson.toJson(r);
	}
	
	@Secured("ROLE_ADMIN")
	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public String deleteQuestionSet(@PathVariable("id") String id){
		Quiz quiz = quizRepo.findOne(id);
		if(quiz != null){
			quizRepo.delete(quiz);
		}
		Result r = new Result(Status.SUCCESS);
		return gson.toJson(r);
	}
	
	@Secured("ROLE_ADMIN")
	@ResponseBody
	@RequestMapping(value="/", method=RequestMethod.POST)
	public String createOrUpdateQuiz(HttpServletRequest request){
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String intro = request.getParameter("introduction");
		int questionNum = Integer.parseInt(request.getParameter("questionNum"));
		//TODO check how angular post a list with $resource
		Quiz quiz = null;
		
		if(id != null){
			quiz = quizRepo.findOne(id);
		}else{
			quiz = new Quiz();
		}
		quiz.setName(name);
		quiz.setIntroduction(intro);
		quiz.setQuestionNum(questionNum);
		Result r = new Result(Status.SUCCESS);
		r.setResult(quiz.getId());
		return gson.toJson(r);
	}
}
