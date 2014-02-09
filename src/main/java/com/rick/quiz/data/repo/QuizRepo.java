package com.rick.quiz.data.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.rick.quiz.data.model.Quiz;

@Repository
public interface QuizRepo  extends CrudRepository<Quiz, String>{
	public Quiz findByCode(String quizCode);
}
