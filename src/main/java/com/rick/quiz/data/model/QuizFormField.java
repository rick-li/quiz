package com.rick.quiz.data.model;

import org.springframework.data.mongodb.core.mapping.DBRef;


public class QuizFormField {
	
	Boolean isRequired;
	
	@DBRef
	FormFieldType type;


	public FormFieldType getType() {
		return type;
	}

	public void setType(FormFieldType type) {
		this.type = type;
	}

	public Boolean getIsRequired() {
		return isRequired;
	}

	public void setIsRequired(Boolean isRequired) {
		this.isRequired = isRequired;
	}
	
	

}
