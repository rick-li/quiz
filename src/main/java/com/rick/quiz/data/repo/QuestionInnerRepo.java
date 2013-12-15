package com.rick.quiz.data.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.rick.quiz.data.model.Question;

public interface QuestionInnerRepo extends CrudRepository<Question, String> {
	public List<Question> findByQuestionSetId(String questionSetId);
}
