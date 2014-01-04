package com.rick.quiz.data.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * QuestionSet and percentage
 * @author rickli
 *
 */
@Document(collection = "questionset-assc")
public class QuestionSetAssociation{
	
	@Id
	String id;
	
	float percentage;
	
	@DBRef
	QuestionSet qs;

	public float getPercentage() {
		return percentage;
	}

	public void setPercentage(float percentage) {
		this.percentage = percentage;
	}

	public QuestionSet getQs() {
		return qs;
	}

	public void setQs(QuestionSet qs) {
		this.qs = qs;
	}
	
}