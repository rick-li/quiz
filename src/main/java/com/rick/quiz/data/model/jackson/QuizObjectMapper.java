package com.rick.quiz.data.model.jackson;

import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.module.SimpleModule;
import org.codehaus.jackson.map.ser.CustomSerializerFactory;

import com.rick.quiz.data.model.QuizFormField;

public class QuizObjectMapper extends ObjectMapper {

	public QuizObjectMapper() {
		CustomSerializerFactory sf = new CustomSerializerFactory();
		sf.addSpecificMapping(QuizFormField.class, new QuizSerializer());
		this.setSerializerFactory(sf);
		
		this.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);

		SimpleModule fieldModule = new SimpleModule("QuizFieldModule",
				new Version(1, 0, 0, null)).addDeserializer(
				QuizFormField.class, new QuizFormFieldDeserializer());
		
		this.registerModule(fieldModule);
	}
}
