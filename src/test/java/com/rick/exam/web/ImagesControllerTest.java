package com.rick.exam.web;

import static org.junit.Assert.assertArrayEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.io.ByteStreams;
import com.rick.exam.SpringTestBase;
import com.rick.quiz.web.ImagesController;
import com.rick.quiz.web.QuestionController;

public class ImagesControllerTest extends SpringTestBase {
	@Autowired
	QuestionController qCtrl;

	@Autowired
	ImagesController imagesCtrl;

	@Test
	public void testImages() throws Exception {
		final String fileName = "testFile.png";
		MultipartFile f = new MockMultipartFile(fileName, fileName,
				"image/png", this.getClass().getResourceAsStream(fileName));

		@SuppressWarnings("unchecked")
		String filename = ((Map<String, String>) qCtrl.uploadImage(f)
				.getResult()).get("filename");

		HttpServletResponse mockResp = mock(HttpServletResponse.class);
		ServletOutputStream mockOs = mock(ServletOutputStream.class);

		when(mockResp.getOutputStream()).thenReturn(mockOs);

		ArgumentCaptor<byte[]> captor = ArgumentCaptor.forClass(byte[].class);

		imagesCtrl.image(filename, mockResp);

		verify(mockOs).write(captor.capture());

		assertArrayEquals(
				ByteStreams.toByteArray(this.getClass().getResourceAsStream(
						fileName)), captor.getValue());
	}
}
