package com.rick.quiz.data.repo;

import org.springframework.data.repository.CrudRepository;

import com.rick.quiz.data.model.QuestionSet;


public interface QuestionSetInnerRepo extends CrudRepository<QuestionSet, String>{
	public QuestionSet findByName(String questionSetName);
}
