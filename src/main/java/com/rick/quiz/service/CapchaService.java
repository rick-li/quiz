package com.rick.quiz.service;

import java.awt.Color;
import java.io.FileOutputStream;
import java.util.Random;

import org.patchca.color.SingleColorFactory;
import org.patchca.service.ConfigurableCaptchaService;
import org.patchca.utils.encoder.EncoderHelper;
import org.patchca.word.RandomWordFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.google.common.io.BaseEncoding;
import com.rick.quiz.data.model.Capcha;

@Service
public class CapchaService {

	Logger log = LoggerFactory.getLogger(CapchaService.class);
	private final Random random = new Random(); // or SecureRandom
	private final ConfigurableCaptchaService cs;

	public CapchaService() {
		cs = new ConfigurableCaptchaService();
		RandomWordFactory wf = new RandomWordFactory();
		wf.setCharacters("123456789");
		wf.setMaxLength(4);
		wf.setMinLength(4);
		cs.setWordFactory(wf);
		cs.setColorFactory(new SingleColorFactory(new Color(25, 60, 170)));
		// cs.setFilterFactory(new
		// CurvesRippleFilterFactory(cs.getColorFactory()));
	}

	public Capcha getCapcha() {
		String capchaFilePath = System.getProperty("java.io.tmpdir") + "/"
				+ generateCapchaFileName().replaceAll("/", "") + ".png";
		log.debug("Generate capcha at file path: " + capchaFilePath);
		FileOutputStream fos = null;
		String strCapcha = null;
		try {
			fos = new FileOutputStream(capchaFilePath);
			strCapcha = EncoderHelper.getChallangeAndWriteImage(cs, "png", fos);
		} catch (Exception e) {
			log.error("Unable to generate capcha.", e);
		}

		Capcha capcha = new Capcha();
		capcha.setCapcha(strCapcha);
		capcha.setFilePath(capchaFilePath);

		return capcha;
	}

	private String generateCapchaFileName() {
		final byte[] buffer = new byte[5];
		random.nextBytes(buffer);
		return BaseEncoding.base64Url().omitPadding().encode(buffer); // or
																		// base32()
	}
}
