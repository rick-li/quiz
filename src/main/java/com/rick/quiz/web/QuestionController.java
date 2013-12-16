package com.rick.quiz.web;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rick.quiz.data.model.Question;
import com.rick.quiz.data.repo.QuestionInnerRepo;
import com.rick.quiz.data.repo.QuestionSetInnerRepo;
import com.rick.quiz.web.Result.Status;

@Controller
@RequestMapping("/questions")
public class QuestionController {
	private Logger log = LoggerFactory.getLogger(QuestionController.class);
	

	@Autowired
	private QuestionInnerRepo qr;
	
	@Autowired
	QuestionSetInnerRepo qsr;
	
	
	@ResponseBody
	@RequestMapping( method=RequestMethod.GET)
	public Result getQuestionsByQuestionSetId(@RequestParam("questionSetId") String qsId){
		List<Question> questions = qr.findByQuestionSetId(qsId);
		Result r = new Result(Status.SUCCESS);
		r.setResult(questions);
		return r;
	}
	

	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public Result getQuestion(@PathVariable("id") String id){
		Question q = qr.findOne(id);
		Result r = new Result(Status.SUCCESS);
		r.setResult(q);
		return r;
	}
	
	@ResponseBody
	@RequestMapping(value="/", method=RequestMethod.POST)
	public Result createOrUpdateQuestion(HttpServletRequest request){
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String options = request.getParameter("options");
		String rightAwnsers = request.getParameter("rightAwnsers");
		String questionSetId = request.getParameter("questionSetId");
		Question q = null;
		if(id!=null){
			//try update
			q = qr.findOne(id);
		}else{
			//create new
			q = new Question();

		}
		q.setName(name);
		q.setRightAnwser(Arrays.asList(rightAwnsers.split(",")));
		q.setOptions(Arrays.asList(options.split(",")));
		q.setQuestionSetId(questionSetId);
		q = qr.save(q);
		Result r = new Result(Status.SUCCESS);
		r.setResult(q.getId());
		return r;
	}
	
	@Secured("ROLE_ADMIN")
	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public Result deleteQuestion(@PathVariable("id") String id){
		Question q = qr.findOne(id);
		qr.delete(q);
		Result r = new Result(Status.SUCCESS);
		return r;
		
	}
	

	//TODO add exception handler;
}
