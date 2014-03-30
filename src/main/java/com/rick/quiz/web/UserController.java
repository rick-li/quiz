package com.rick.quiz.web;

import java.io.File;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.io.Files;
import com.rick.quiz.data.model.Capcha;
import com.rick.quiz.data.model.Question;
import com.rick.quiz.data.model.QuestionSet;
import com.rick.quiz.data.model.QuestionSetAssociation;
import com.rick.quiz.data.model.Quiz;
import com.rick.quiz.data.model.User;
import com.rick.quiz.data.model.UserQuestion;
import com.rick.quiz.data.model.UserQuiz;
import com.rick.quiz.data.repo.QuestionInnerRepo;
import com.rick.quiz.data.repo.QuestionSetInnerRepo;
import com.rick.quiz.data.repo.QuizRepo;
import com.rick.quiz.data.repo.UserQuizRepo;
import com.rick.quiz.data.repo.UserRepo;
import com.rick.quiz.service.CapchaService;
import com.rick.quiz.web.Result.Status;

@Controller
@RequestMapping("/user")
public class UserController {
	private static final Logger log = LoggerFactory
			.getLogger(UserController.class);

	public static final String USER_INFO = "userInfo";
	private static final HttpHeaders HTTP_HEADERS;
	private static final String CAPCHA_KEY = "capcha";
	private static final String QUIZ_QUESTIONS_CACHE_KEY = "quizQuestionCacheKey";
	private static final String USER_QUIZ_RESULT_MAP_KEY = "userQuizResultMapKey";

	static {
		HTTP_HEADERS = new HttpHeaders();
		HTTP_HEADERS.set("Pragma", "No-cache");
		HTTP_HEADERS.set("Cache-Control", "No-cache");
		HTTP_HEADERS.setExpires(0);
		HTTP_HEADERS.setContentType(MediaType.IMAGE_PNG);
	}

	@Autowired
	CapchaService capchaService;

	@Autowired
	UserRepo userRepo;

	@Autowired
	QuizRepo quizRepo;

	@Autowired
	UserQuizRepo userQuizRepo;

	@Autowired
	private QuestionInnerRepo questionRepo;

	@Autowired
	private QuestionSetInnerRepo qsRepo;

	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value = "/quizCode/{quizCode}/questions", method = RequestMethod.GET)
	public Result getQuestionsByQuizCode(HttpSession session,
			@PathVariable("quizCode") String quizCode) {

		Result r = new Result();
		r.setStatus(Status.SUCCESS);

		List<Question> questionResult = Lists.newArrayList();
		if (session.getAttribute(QUIZ_QUESTIONS_CACHE_KEY) == null) {
			session.setAttribute(QUIZ_QUESTIONS_CACHE_KEY, Maps.newHashMap());
		}
		List<Question> questions = ((Map<String, List<Question>>) session
				.getAttribute(QUIZ_QUESTIONS_CACHE_KEY)).get(quizCode);
		if (questions != null) {
			log.debug("Getting question list from cache");
			questionResult = questions;
		} else {
			try {
				Quiz quiz = quizRepo.findByCode(quizCode);
				List<QuestionSetAssociation> qsAssoc = quiz.getQuestionSets();
				int totalNum = quiz.getQuestionNum();
				for (QuestionSetAssociation qa : qsAssoc) {
					int qsNum = (int) (totalNum * qa.getPercentage() / 100);
					QuestionSet qs = qa.getQs();
					List<Question> qsList = Lists.newArrayList(questionRepo
							.findByQuestionSetIdOrderByLastUpdateDesc(qs
									.getId()));
					Collections.shuffle(qsList);
					int size = qsList.size();
					qsList = qsList.subList(0, size < qsNum ? size : qsNum);
					questionResult.addAll(qsList);
				}
				((Map<String, List<Question>>) session
						.getAttribute(QUIZ_QUESTIONS_CACHE_KEY)).put(quizCode,
						questionResult);

			} catch (Exception e) {
				r.setStatus(Status.FAIL);
				r.setMessage(e.getMessage());
			}
		}
		r.setResult(questionResult);
		return r;
	}

	@ResponseBody
	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public Result submit(HttpSession session, @RequestBody UserQuiz userQuiz) {

		int totalAnswers = userQuiz.getUserQuestions().size();
		int wrongAnswers = 0;
		// calculate score
		for (UserQuestion question : userQuiz.getUserQuestions()) {
			if (!question.getRightAnswer().get(0)
					.equalsIgnoreCase(question.getUserAnswers().get(0))) {
				wrongAnswers++;
			}
		}

		float score = (float) (totalAnswers - wrongAnswers) / totalAnswers;

		log.debug("Wrong answers: " + wrongAnswers);
		log.debug("Total answers: " + totalAnswers);
		log.debug("Score is: {}, eclapsed is  ", userQuiz.getSecondsUsed());

		userQuiz.setScore(score);
		User user = (User) session.getAttribute(USER_INFO);
		userQuiz.setUser(user);
		userQuizRepo.save(userQuiz);

		Map<String, String> resultMap = Maps.newHashMap();
		resultMap.put("score", score * 100 + "");
		resultMap.put("elapsed", userQuiz.getSecondsUsed() + "");
		Map<String, Map<String, String>> quizCodeToResult = this
				.getQuizCodeToResultCache(session);
		quizCodeToResult.put(userQuiz.getQuizCode(), resultMap);
		Result r = new Result(Status.SUCCESS);
		r.setResult(resultMap);
		return r;
	}

	/**
	 * Save a quizCode -> Result cache in session.
	 * 
	 * @param session
	 * @return
	 */
	private Map<String, Map<String, String>> getQuizCodeToResultCache(
			HttpSession session) {
		// quizCode -> quizResult
		@SuppressWarnings("unchecked")
		Map<String, Map<String, String>> quizCodeToResult = (Map<String, Map<String, String>>) session
				.getAttribute(USER_QUIZ_RESULT_MAP_KEY);
		if (quizCodeToResult == null) {
			quizCodeToResult = Maps.newHashMap();
			session.setAttribute(USER_QUIZ_RESULT_MAP_KEY, quizCodeToResult);
		}
		return quizCodeToResult;
	}

	@ResponseBody
	@RequestMapping(value = "/getResult/{quizCode}", method = RequestMethod.GET)
	public Result getResult(@PathVariable("quizCode") String quizCode,
			HttpSession session) {
		Result r = new Result();
		@SuppressWarnings("unchecked")
		Map<String, Map<String, String>> quizCodeToResult = (Map<String, Map<String, String>>) session
				.getAttribute(USER_QUIZ_RESULT_MAP_KEY);
		if (quizCodeToResult == null || quizCodeToResult.get(quizCode) == null) {
			r.setStatus(Status.FAIL);
			r.setMessage("No result found");
		} else {
			Map<String, String> quizResult = quizCodeToResult.get(quizCode);
			r.setStatus(Status.SUCCESS);
			r.setResult(quizResult);
		}
		return r;
	}

	@ResponseBody
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public Result register(HttpSession session,
			@RequestBody Map<String, String> userInfo) {
		Result r = new Result(Status.SUCCESS);
		if (!isCapchaValid(session, userInfo)) {
			r.setStatus(Status.FAIL);
			r.setMessage("验证码出错");
			return r;
		}

		if (!isUniqueUser(userInfo)) {
			r.setStatus(Status.FAIL);
			r.setMessage("您已参与过本次测试，请勿重复");
			return r;
		}

		User user = new User();
		user.setUserInfo(userInfo);
		user.setPhonenum(userInfo.get("phonenum"));
		userRepo.save(user);
		session.setAttribute(USER_INFO, user);
		return r;
	}

	private boolean isUniqueUser(Map<String, String> userInfo) {
		String phonenum = userInfo.get("phonenum");
		if (phonenum != null && userRepo.findByPhonenum(phonenum) == null) {
			return true;
		}
		return false;
	}

	@RequestMapping(value = "/capcha.png", method = RequestMethod.GET)
	public byte[] capcha(HttpSession session, HttpServletResponse response) {
		Capcha capcha = capchaService.getCapcha();
		// save capcha for later use.
		session.setAttribute(CAPCHA_KEY, capcha.getCapcha());
		File imageFile = new File(capcha.getFilePath());
		byte[] imageBytes = new byte[0];

		try {
			imageBytes = Files.toByteArray(imageFile);
			response.getOutputStream().write(imageBytes);
			response.setContentType(MediaType.IMAGE_PNG_VALUE);
			response.flushBuffer();
		} catch (Exception e) {
			log.error(
					"failed to read capcha image "
							+ imageFile.getAbsolutePath(), e);
		}
		return null;
	}

	boolean isCapchaValid(HttpSession session, Map<String, String> userInfo) {
		try {
			return session.getAttribute(CAPCHA_KEY).equals(
					userInfo.get("capcha-input"));
		} catch (Exception e) {
			log.error("Unable to get Capcha.", e);
			return false;
		}
	}
}
