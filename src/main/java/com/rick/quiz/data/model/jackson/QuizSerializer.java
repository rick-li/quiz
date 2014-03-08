package com.rick.quiz.data.model.jackson;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.SerializerProvider;
import org.codehaus.jackson.map.ser.std.SerializerBase;

import com.rick.quiz.data.model.QuizFormField;

public class QuizSerializer extends SerializerBase<QuizFormField> {

	public QuizSerializer() {
		super(QuizFormField.class);
	}

	@Override
	public void serialize(QuizFormField quizFormField, JsonGenerator je,
			SerializerProvider provider) throws IOException,
			JsonGenerationException {
		je.writeStartObject();
		if (quizFormField.getType() != null) {
			je.writeStringField("typeId", quizFormField.getType().getId());
			je.writeStringField("name", quizFormField.getType().getName());
			je.writeStringField("type", quizFormField.getType().getType());
			je.writeStringField("regex", quizFormField.getType().getRegex());
		}
		je.writeBooleanField("required", quizFormField.getIsRequired());
		je.writeEndObject();
	}

}
