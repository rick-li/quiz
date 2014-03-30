package com.rick.quiz.data.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.rick.quiz.data.model.UserQuiz;

@Repository
public interface UserQuizRepo extends CrudRepository<UserQuiz, String> {
	List<UserQuiz> findByQuizCode(String quizCode);
}
