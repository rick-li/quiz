package com.rick.quiz.data.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "question")
public class Question {
	@Id
	String id;

	String name;

	List<String> rightAnswer;

	List<String> options;

	String questionSetId;

	// full image path is ${user.home}/image.dir/imageFile
	String imageFileName;

	Date lastUpdate;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<String> getOptions() {
		return options;
	}

	public void setOptions(List<String> options) {
		this.options = options;
	}

	public String getQuestionSetId() {
		return questionSetId;
	}

	public void setQuestionSetId(String questionSetId) {
		this.questionSetId = questionSetId;
	}

	public String getImageFileName() {
		return imageFileName;
	}

	public void setImageFileName(String imageFileName) {
		this.imageFileName = imageFileName;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public List<String> getRightAnswer() {
		return rightAnswer;
	}

	public void setRightAnswer(List<String> rightAnswer) {
		this.rightAnswer = rightAnswer;
	}

}
