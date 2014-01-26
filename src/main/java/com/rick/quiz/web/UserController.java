package com.rick.quiz.web;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.common.collect.Lists;
import com.google.common.io.Files;
import com.rick.quiz.data.model.Capcha;
import com.rick.quiz.service.CapchaService;

@Controller
@RequestMapping("/user")
public class UserController {
	private static final Logger log = LoggerFactory
			.getLogger(UserController.class);
	private static final HttpHeaders HTTP_HEADERS;

	static {
		HTTP_HEADERS = new HttpHeaders();
		HTTP_HEADERS.set("Pragma", "No-cache");
		HTTP_HEADERS.set("Cache-Control", "No-cache");
		HTTP_HEADERS.setExpires(0);
		HTTP_HEADERS.setContentType(MediaType.IMAGE_PNG);

	}

	@Autowired
	CapchaService capchaService;

	// @ResponseBody
	// @RequestMapping(value="/register", method=RequestMethod.GET)
	// public Result register(){

	// Result r = new Result(Status.SUCCESS);
	// r.setResult();
	// return r;
	// }

	
	@RequestMapping(value = "/capcha.png", method = RequestMethod.GET)
	public byte[] capcha( HttpSession session, HttpServletResponse response) {

		Capcha capcha = capchaService.getCapcha();
		File imageFile = new File(capcha.getFilePath());
		byte[] imageBytes = new byte[0];

		try {
			imageBytes = Files.toByteArray(imageFile);
			response.getOutputStream().write(imageBytes);
			response.setContentType(MediaType.IMAGE_PNG_VALUE);
			response.flushBuffer();
		} catch (Exception e) {
			log.error("failed to read capcha image "+imageFile.getAbsolutePath(), e);
		}
		
		return null;
	}
}
