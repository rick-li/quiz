package com.rick.quiz.data.model.jackson;

import java.io.IOException;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.ObjectCodec;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;

import com.rick.quiz.data.model.FormFieldType;
import com.rick.quiz.data.model.QuizFormField;

public class QuizFormFieldDeserializer extends JsonDeserializer<QuizFormField>{

	@Override
	public QuizFormField deserialize(JsonParser jp, DeserializationContext ctxt)
			throws IOException, JsonProcessingException {
		QuizFormField formField = new QuizFormField();
		ObjectCodec oc = jp.getCodec();
        JsonNode node = oc.readTree(jp);
        formField.setIsRequired(node.get("required").asBoolean());
        FormFieldType fft = new FormFieldType();
        fft.setId(node.get("typeId").toString().replaceAll("\"", ""));
        formField.setType(fft);
		return formField;
	}

}
