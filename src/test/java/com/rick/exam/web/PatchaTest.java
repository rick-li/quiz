package com.rick.exam.web;

import java.awt.Color;
import java.io.FileOutputStream;

import org.junit.Test;
import org.patchca.color.SingleColorFactory;
import org.patchca.filter.predefined.CurvesRippleFilterFactory;
import org.patchca.service.ConfigurableCaptchaService;
import org.patchca.utils.encoder.EncoderHelper;

public class PatchaTest {
	@Test
	public void patcha() throws Exception{
		ConfigurableCaptchaService cs = new ConfigurableCaptchaService();
		cs.setColorFactory(new SingleColorFactory(new Color(25, 60, 170)));
		cs.setFilterFactory(new CurvesRippleFilterFactory(cs.getColorFactory()));
		String path = System.getProperty("user.home")+"/patcha_demo.png";
		System.out.println(path);
//		System.out.println(cs.getCaptcha().getChallenge());
//		System.out.println(cs.getCaptcha().getChallenge());
		FileOutputStream fos = new FileOutputStream(path);
		
		String capcha = EncoderHelper.getChallangeAndWriteImage(cs, "png", fos);
		System.out.println(capcha);
		
	}
}
