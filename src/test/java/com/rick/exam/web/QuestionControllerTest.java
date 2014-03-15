package com.rick.exam.web;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.rick.exam.SpringTestBase;
import com.rick.quiz.service.DirUtils;
import com.rick.quiz.web.QuestionController;
import com.rick.quiz.web.Result;

public class QuestionControllerTest extends SpringTestBase {

	@Autowired
	QuestionController questionCtrl;

	@Autowired
	DirUtils dirUtils;

	@Test
	public void testImageUpload() throws Exception {

		MultipartFile f = new MockMultipartFile("testFile.png", "testFile.png",
				"image/png", this.getClass()
						.getResourceAsStream("testFile.png"));
		Result r = questionCtrl.uploadImage(f);
		@SuppressWarnings("unchecked")
		String filename = ((Map<String, String>) r.getResult()).get("filename");
		System.out.println("Image file is "
				+ new File(dirUtils.getImageDir() + "/" + filename)
						.getAbsolutePath());
		assertTrue(new File(dirUtils.getImageDir() + "/" + filename).isFile());

		assertEquals(r.getStatus(), Result.Status.SUCCESS);

	}
}
