package com.rick.quiz.data.model;

import java.util.List;

import com.google.common.collect.Lists;

public class UserQuestion {
	
	//question name
	String name;
	
	List<String> options = Lists.newArrayList();
	List<String> userAnswers = Lists.newArrayList();
	List<String> rightAnswer = Lists.newArrayList();
	
	public List<String> getOptions() {
		return options;
	}

	public void setOptions(List<String> options) {
		this.options = options;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<String> getUserAnswers() {
		return userAnswers;
	}

	public void setUserAnswers(List<String> userAnswers) {
		this.userAnswers = userAnswers;
	}

	public List<String> getRightAnswer() {
		return rightAnswer;
	}

	public void setRightAnswer(List<String> rightAnswer) {
		this.rightAnswer = rightAnswer;
	}

	@Override
	public String toString() {
		return "UserQuestion [name=" + name + ", options=" + options
				+ ", userAnswers=" + userAnswers + ", rightAnswer="
				+ rightAnswer + "]";
	}
	
	
	
}
