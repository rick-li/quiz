package com.rick.quiz.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/public")
public class LoginController {
	
	@RequestMapping(value="/login.do", method = RequestMethod.GET)
	public String login(ModelMap model) {
 
		return "login";
 
	}
	
	@RequestMapping(value="/logout.do", method = RequestMethod.GET)
	public String loginout(ModelMap model) {
 
		return "login";
 
	}	

}
