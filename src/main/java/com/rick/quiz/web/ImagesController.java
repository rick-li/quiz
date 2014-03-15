package com.rick.quiz.web;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.common.io.Files;
import com.rick.quiz.service.DirUtils;

@RequestMapping("/images")
@Controller
public class ImagesController {
	Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	DirUtils dirUtils;

	@RequestMapping(value = "/{filename}", method = RequestMethod.GET)
	public void image(@PathVariable("filename") String filename,
			HttpServletResponse response) {
		String imageDir = dirUtils.getImageDir();
		try {
			response.setContentType("image/png");
			response.getOutputStream().write(
					Files.toByteArray(new File(imageDir + "/" + filename)));
		} catch (IOException e) {
			log.error("Fail to return image. ", e);
		} finally {
			try {
				response.flushBuffer();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
