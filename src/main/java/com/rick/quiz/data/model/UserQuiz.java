package com.rick.quiz.data.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.google.common.collect.Lists;


@Document(collection = "user-quiz")
public class UserQuiz {
	
	@Id
	String id;
	
	String quizId;
	
	String quizName;
	
	float score;
	
	int secondsUsed;
	
	List<UserQuestion> questions = Lists.newArrayList();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getQuizId() {
		return quizId;
	}

	public void setQuizId(String quizId) {
		this.quizId = quizId;
	}

	public String getQuizName() {
		return quizName;
	}

	public void setQuizName(String quizName) {
		this.quizName = quizName;
	}
	
	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}

	public int getSecondsUsed() {
		return secondsUsed;
	}

	public void setSecondsUsed(int secondsUsed) {
		this.secondsUsed = secondsUsed;
	}

	public List<UserQuestion> getQuestions() {
		return questions;
	}

	public void setQuestions(List<UserQuestion> questions) {
		this.questions = questions;
	}

}
