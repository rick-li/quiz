package com.rick.quiz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.base.Function;
import com.google.common.collect.FluentIterable;
import com.google.common.collect.Lists;
import com.rick.quiz.data.model.User;
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

	public Result getAllQuizCodes() {
		Result r = new Result(Result.Status.SUCCESS);
		r.setResult(Lists.newArrayList(quizRepo.findAll()));
		return r;
	}

	@ResponseBody
	@RequestMapping(value = "/{quizCode}", method = RequestMethod.GET)
	public Result getUserQuizByQuizCode(@PathVariable String quizCode) {
		Result r = new Result(Result.Status.SUCCESS);
		List<UserQuiz> userQuizList = userQuizRepo.findByQuizCode(quizCode);

		List<List<String>> aaData = Lists.newArrayList(FluentIterable.from(
				userQuizList).transform(new Function<UserQuiz, List<String>>() {

			@Override
			public List<String> apply(UserQuiz userQuiz) {
				List<String> result = Lists.newArrayList();
				result.add(userQuiz.getScore() + "");
				result.add(userQuiz.getSecondsUsed() + "");
				User user = userQuiz.getUser();

				result.add(user != null ? user.getUserInfo().get("name") : "");
				result.add(user != null ? user.getUserInfo().get("phonenum")
						: "");
				result.add(user != null ? user.getUserInfo().get("birthday")
						: "");
				result.add(user != null ? user.getUserInfo().get("gender") : "");

				return result;
			}
		}));
		r.setResult(aaData);
		return r;
	}
}
