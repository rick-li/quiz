package com.rick.quiz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@Secured("ROLE_ADMIN")
	@ResponseBody
	@RequestMapping(value={"", "/{id}"}, method=RequestMethod.POST)
	public Result createOrUpdateQuestion(@RequestBody Question pq){
		Question q = qr.save(pq);
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
