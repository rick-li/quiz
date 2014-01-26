package com.rick.quiz.data.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.google.common.collect.Lists;

@Document(collection = "user")
public class User {
	@Id
	String id;
	
	List<QuizFormField> formFields = Lists.newArrayList();
	
	@DBRef
	List<UserQuiz> userQuizs = Lists.newArrayList();

	public List<QuizFormField> getFormFields() {
		return formFields;
	}

	public void setFormFields(List<QuizFormField> formFields) {
		this.formFields = formFields;
	}

	
	public List<UserQuiz> getUserQuizs() {
		return userQuizs;
	}

	public void setUserQuizs(List<UserQuiz> userQuizs) {
		this.userQuizs = userQuizs;
	}

}
