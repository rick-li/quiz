package com.rick.quiz.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.rick.quiz.data.model.FormFieldType;
import com.rick.quiz.data.repo.FormFieldTypeRepo;
import com.rick.quiz.web.Result.Status;

@Controller
@RequestMapping("/formfieldtype")
public class FormFieldTypeController {
	private Logger log = LoggerFactory.getLogger(FormFieldTypeController.class);
		
	@Autowired
	private FormFieldTypeRepo repo;
	
	@ResponseBody
	@RequestMapping(value="/", method=RequestMethod.GET)
	public Result getFormFieldTypes(){
		List<FormFieldType> types = Lists.newArrayList(repo.findAll());
		Result r = new Result(Status.SUCCESS);
		r.setResult(types);
		return r;
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public Result getFormFieldType(@PathVariable("id") String id){
		FormFieldType type = repo.findOne(id);
		Result r = new Result(Status.SUCCESS);
		r.setResult(type);
		return r;
//		return gson.toJson(r);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public Result deleteQuestionSet(@PathVariable("id") String id){
		FormFieldType type = repo.findOne(id);
		if(type != null){
			repo.delete(type);
		}
		Result r = new Result(Status.SUCCESS);
		return r;
//		return gson.toJson(r);
	}
	
	
	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.POST)
	public Result createOrUpdateFormFieldType(HttpServletRequest request){
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		FormFieldType type = null;
		if(id != null){
			type = repo.findOne(id);
		}
		
		if(type == null){
			type = new FormFieldType();
		}
		type.setName(name);
		repo.save(type);
		Result r = new Result(Status.SUCCESS);
		r.setResult(type.getId());
		return r;
//		return gson.toJson(r);
	}

}
