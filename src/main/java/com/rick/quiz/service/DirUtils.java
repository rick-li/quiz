package com.rick.quiz.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DirUtils {
	@Value("#{systemProperties['user.home']}")
	String userDir;

	@Value("${image.dir}")
	String imagePartDir;

	public String getImageDir() {
		return userDir + "/" + imagePartDir;
	}

}
