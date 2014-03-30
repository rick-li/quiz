package com.rick.quiz.data.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.google.common.collect.Lists;

@Document(collection = "user-quiz")
public class UserQuiz {

	@Id
	String id;

	String quizCode;

	String quizName;

	float score;

	int secondsUsed;

	User user;

	List<UserQuestion> userQuestions = Lists.newArrayList();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getQuizCode() {
		return quizCode;
	}

	public void setQuizCode(String quizCode) {
		this.quizCode = quizCode;
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

	public List<UserQuestion> getUserQuestions() {
		return userQuestions;
	}

	public void setUserQuestions(List<UserQuestion> userQuestions) {
		this.userQuestions = userQuestions;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "UserQuiz [id=" + id + ", quizCode=" + quizCode + ", quizName="
				+ quizName + ", score=" + score + ", secondsUsed="
				+ secondsUsed + ", userQuestions=" + userQuestions + "]";
	}

}
