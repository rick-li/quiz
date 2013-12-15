package com.rick.quiz.data.model;

import org.springframework.data.mongodb.core.mapping.DBRef;

/**
 * QuestionSet and percentage
 * @author rickli
 *
 */
public class QuestionSetAssociation{
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