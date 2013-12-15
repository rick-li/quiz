package com.rick.quiz.data.model;

import java.util.List;

import com.google.common.collect.Lists;

public class UserQuestion {
	List<String> options = Lists.newArrayList();
	
	int rightOpt;
	
	int userOpt;

	public List<String> getOptions() {
		return options;
	}

	public void setOptions(List<String> options) {
		this.options = options;
	}

	public int getRightOpt() {
		return rightOpt;
	}

	public void setRightOpt(int rightOpt) {
		this.rightOpt = rightOpt;
	}

	public int getUserOpt() {
		return userOpt;
	}

	public void setUserOpt(int userOpt) {
		this.userOpt = userOpt;
	}
	
	
}
