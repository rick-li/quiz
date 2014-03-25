package com.rick.quiz.data.model;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

@Document(collection = "user")
public class User {
	@Id
	String id;

	String phonenum;

	Map<String, String> userInfo = Maps.newHashMap();

	@DBRef
	List<UserQuiz> userQuizs = Lists.newArrayList();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPhonenum() {
		return phonenum;
	}

	public void setPhonenum(String phonenum) {
		this.phonenum = phonenum;
	}

	public Map<String, String> getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(Map<String, String> userInfo) {
		this.userInfo = userInfo;
	}

	public List<UserQuiz> getUserQuizs() {
		return userQuizs;
	}

	public void setUserQuizs(List<UserQuiz> userQuizs) {
		this.userQuizs = userQuizs;
	}

}
