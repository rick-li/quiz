package com.rick.exam.repo;



import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.rick.quiz.data.model.QuestionSet;
import com.rick.quiz.data.model.QuestionSetAssociation;
import com.rick.quiz.data.model.Quiz;
import com.rick.quiz.data.repo.QuestionSetInnerRepo;
import com.rick.quiz.data.repo.QuizRepo;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class QuizReposotoryTest {
	
	@Autowired
	QuestionSetInnerRepo qsiRepo;
	
	@Autowired
	QuizRepo qzRepo;
	
	@Test
	public void saveQuiz(){
		Quiz q = new Quiz();
		q.setIntroduction("intro");
		q.setName("aaaaaaaa Name");
		QuestionSet qs = qsiRepo.findByName("aaa111");
		System.out.println(qs);
		Assert.assertNotNull(qs);
		QuestionSetAssociation qa = new QuestionSetAssociation();
		qa.setPercentage(0.3f);
		qa.setQs(qs);
		q.getQuestionSets().add(qa);
		qzRepo.save(q);
	}
}
