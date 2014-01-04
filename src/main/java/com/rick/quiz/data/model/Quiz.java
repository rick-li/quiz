package com.rick.quiz.data.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.google.common.collect.Lists;

/**
 * Quiz that created by inputing a list of questionset with the percentages.
 * @author rickli
 *
 */
@Document(collection = "quiz")
public class Quiz {
	@Id
	String id;
	
	String name;
	
	String introduction;
	
	int questionNum;
	
	int timespan;
	
	List<QuestionSetAssociation> questionSets = Lists.newArrayList();
	
	List<FormFieldType> formFields = Lists.newArrayList();

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

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public int getTimespan() {
		return timespan;
	}

	public void setTimespan(int timespan) {
		this.timespan = timespan;
	}
	
	public int getQuestionNum() {
		return questionNum;
	}

	public void setQuestionNum(int questionNum) {
		this.questionNum = questionNum;
	}

	public List<QuestionSetAssociation> getQuestionSets() {
		return questionSets;
	}

	public void setQuestionSets(List<QuestionSetAssociation> questionSets) {
		this.questionSets = questionSets;
	}

	public List<FormFieldType> getFormFields() {
		return formFields;
	}

	public void setFormFields(List<FormFieldType> formFields) {
		this.formFields = formFields;
	}
	
	
}
