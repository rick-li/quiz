package com.rick.quiz.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.base.Function;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.rick.quiz.data.model.Quiz;
import com.rick.quiz.data.model.UserQuiz;
import com.rick.quiz.data.repo.QuizRepo;
import com.rick.quiz.data.repo.UserQuizRepo;

@Controller
@RequestMapping("/quizresults")
public class QuizResultsController {
	@Autowired
	QuizRepo quizRepo;

	@Autowired
	UserQuizRepo userQuizRepo;

	@ResponseBody
	@RequestMapping(value = "/quizpairs", method = RequestMethod.GET)
	public Result getAllQuizCodes() {
		Result r = new Result(Result.Status.SUCCESS);
		List<Map<String, String>> quizCodeNamePairs = Lists
				.newArrayList(Iterables.transform(quizRepo.findAll(),
						new Function<Quiz, Map<String, String>>() {

							@Override
							public Map<String, String> apply(Quiz quiz) {
								Map<String, String> pair = Maps.newHashMap();
								pair.put("name", quiz.getName());
								pair.put("code", quiz.getCode());
								return pair;
							}

						}));
		r.setResult(quizCodeNamePairs);
		return r;
	}

	@ResponseBody
	@RequestMapping(value = "/{quizCode}", method = RequestMethod.GET)
	public Result getUserQuizByQuizCode(@PathVariable String quizCode) {
		Result r = new Result(Result.Status.SUCCESS);
		List<UserQuiz> userQuizList = userQuizRepo.findByQuizCode(quizCode);

		// List<List<String>> aaData = Lists.newArrayList(FluentIterable.from(
		// userQuizList).transform(new Function<UserQuiz, List<String>>() {
		//
		// @Override
		// public List<String> apply(UserQuiz userQuiz) {
		// List<String> result = Lists.newArrayList();
		// result.add((int) (userQuiz.getScore() * 100) + "");
		// int seconds = userQuiz.getSecondsUsed();
		//
		// int day = (int) TimeUnit.SECONDS.toDays(seconds);
		// Long hours = TimeUnit.SECONDS.toHours(seconds) - (day * 24);
		// Long minute = TimeUnit.SECONDS.toMinutes(seconds)
		// - (TimeUnit.SECONDS.toHours(seconds) * 60);
		// Long second = TimeUnit.SECONDS.toSeconds(seconds)
		// - (TimeUnit.SECONDS.toMinutes(seconds) * 60);
		// String strTime = "";
		// if (hours > 0) {
		// strTime += hours < 10 ? "0" + hours : hours.toString();
		// strTime += ":";
		// }
		// if (minute > 0) {
		// strTime += minute < 10 ? "0" + minute : minute.toString();
		// strTime += ":";
		// } else {
		// strTime += "00";
		// strTime += ":";
		// }
		// if (second > 0) {
		// strTime += second < 10 ? "0" + second : second.toString();
		// } else {
		// strTime += "00";
		// }
		//
		// result.add(strTime);
		// User user = userQuiz.getUser();
		//
		// result.add(user != null ? user.getUserInfo().get("name") : "");
		// result.add(user != null ? user.getUserInfo().get("phonenum")
		// : "");
		// result.add(user != null ? user.getUserInfo().get("birthday")
		// : "");
		// result.add(user != null ? user.getUserInfo().get("gender") : "");
		//
		// return result;
		// }
		// }));
		r.setResult(userQuizList);
		return r;
	}
}
