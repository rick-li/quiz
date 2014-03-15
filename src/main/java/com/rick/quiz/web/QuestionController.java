package com.rick.quiz.web;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.collect.Maps;
import com.google.common.io.Files;
import com.rick.quiz.data.model.Question;
import com.rick.quiz.data.repo.QuestionInnerRepo;
import com.rick.quiz.data.repo.QuestionSetInnerRepo;
import com.rick.quiz.service.DirUtils;
import com.rick.quiz.web.Result.Status;

@Controller
@RequestMapping("/questions")
public class QuestionController {
	Logger log = LoggerFactory.getLogger(QuestionController.class);

	@Autowired
	QuestionInnerRepo qr;

	@Autowired
	QuestionSetInnerRepo qsr;

	@Autowired
	DirUtils dirUtils;

	@ResponseBody
	@RequestMapping(value = "uploadimage", method = RequestMethod.POST)
	public Result uploadImage(@RequestParam MultipartFile file) {

		Result r = new Result(Status.SUCCESS);
		// write images to file
		Map<String, String> data = Maps.newHashMap();

		r.setResult(data);
		// write multiple files
		try {
			String imageDir = dirUtils.getImageDir();
			boolean createDirRes = new File(imageDir).mkdirs();
			log.info("Dir " + imageDir + " created status ===> " + createDirRes);
			File imageFile = File
					.createTempFile("quiz", "", new File(imageDir));
			Files.write(file.getBytes(), imageFile);
			data.put("filename", imageFile.getName());
		} catch (Exception e) {
			r.setStatus(Status.FAIL);
			log.error("Fail to save image.", e);
		}

		return r;
	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.GET)
	public Result getQuestionsByQuestionSetId(
			@RequestParam("questionSetId") String qsId) {
		List<Question> questions = qr.findByQuestionSetId(qsId);
		Result r = new Result(Status.SUCCESS);
		r.setResult(questions);
		return r;
	}

	@ResponseBody
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Result getQuestion(@PathVariable("id") String id) {
		Question q = qr.findOne(id);
		Result r = new Result(Status.SUCCESS);
		r.setResult(q);
		return r;
	}

	@Secured("ROLE_ADMIN")
	@ResponseBody
	@RequestMapping(value = { "", "/{id}" }, method = RequestMethod.POST)
	public Result createOrUpdateQuestion(@RequestBody Question pq) {
		Question q = qr.save(pq);
		Result r = new Result(Status.SUCCESS);
		r.setResult(q.getId());
		return r;
	}

	@Secured("ROLE_ADMIN")
	@ResponseBody
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public Result deleteQuestion(@PathVariable("id") String id) {
		Question q = qr.findOne(id);
		qr.delete(q);
		Result r = new Result(Status.SUCCESS);
		return r;

	}

	// TODO add exception handler;

}
