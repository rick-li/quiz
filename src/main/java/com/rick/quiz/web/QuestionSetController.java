package com.rick.quiz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.rick.quiz.data.model.QuestionSet;
import com.rick.quiz.data.repo.QuestionSetInnerRepo;
import com.rick.quiz.web.Result.Status;


@Controller
@RequestMapping("/questionsets")
public class QuestionSetController {
	
	@Autowired
	QuestionSetInnerRepo qsr;
	
	Gson gson = new Gson();
	
	@ResponseBody
	@RequestMapping(value="", method=RequestMethod.GET)
	public Result queryQuestionSet(){
		List<QuestionSet> questionSets = Lists.newArrayList(qsr.findAll());
		Result r = new Result(Status.SUCCESS);
		r.setResult(questionSets);
		return r;
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public Result getQuestionSet(@PathVariable("id") String id){
		QuestionSet qs = qsr.findOne(id);
		Result r = null;
		if(qs != null){
			r = new Result(Status.SUCCESS);
			r.setResult(qs);
		}else{
			r = new Result(Status.FAIL);
			r.setMessage("NOT FOUND");
		}
		return r;
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public Result deleteQuestionSet(@PathVariable("id") String id){
		QuestionSet qs = qsr.findOne(id);
		if(qs != null){
			qsr.delete(qs);
		}
		Result r = new Result(Status.SUCCESS);
		return r;
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.POST)
	public Result createOrUpdateQuestionSet(@RequestBody QuestionSet qs){
		
		qs = qsr.save(qs);
		Result r = new Result(Status.SUCCESS);
		r.setResult(qs.getId());
		return r;
	}
}
