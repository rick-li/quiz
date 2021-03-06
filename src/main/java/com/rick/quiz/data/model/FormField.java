package com.rick.quiz.data.model;

import org.springframework.data.mongodb.core.mapping.DBRef;

public class FormField {
	
	String value;
	
	@DBRef
	FormFieldType type;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public FormFieldType getType() {
		return type;
	}

	public void setType(FormFieldType type) {
		this.type = type;
	}
	
	
}
