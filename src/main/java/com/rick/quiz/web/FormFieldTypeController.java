package com.rick.quiz.web;

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
import com.rick.quiz.data.model.FormFieldType;
import com.rick.quiz.data.repo.FormFieldTypeRepo;
import com.rick.quiz.web.Result.Status;

@Controller
@RequestMapping("/formfieldtype")
public class FormFieldTypeController {
		
	@Autowired
	private FormFieldTypeRepo repo;
	
	@ResponseBody
	@RequestMapping(value="", method=RequestMethod.GET)
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
	}

	@Secured("ROLE_ADMIN")
	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public Result deleteFormFieldType(@PathVariable("id") String id){
		FormFieldType type = repo.findOne(id);
		if(type != null){
			repo.delete(type);
		}
		Result r = new Result(Status.SUCCESS);
		return r;
	}
	
	@Secured("ROLE_ADMIN")
	@ResponseBody
	@RequestMapping(value={"", "/{id}"}, method=RequestMethod.POST)
	public Result createOrUpdateFormFieldType(@RequestBody FormFieldType fieldType){
		repo.save(fieldType);
		Result r = new Result(Status.SUCCESS);
		r.setResult(fieldType.getId());
		return r;
	}

}
