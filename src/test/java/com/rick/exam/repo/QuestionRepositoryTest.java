package com.rick.exam.repo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.google.common.collect.Lists;
import com.rick.quiz.data.model.Question;
import com.rick.quiz.data.model.QuestionSet;
import com.rick.quiz.data.repo.QuestionInnerRepo;
import com.rick.quiz.data.repo.QuestionSetInnerRepo;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class QuestionRepositoryTest {
	
	@Autowired
	QuestionInnerRepo qr;
	
	@Autowired
	QuestionSetInnerRepo qsr;
	
	
//	@Test
	public void questionset(){
//		QuestionSet qs = new QuestionSet();
//		qs.setName("aaa111");
//		qs.setDesc("bbbbb");
//		
//		Question qqq = new Question();
//		qqq.setName("cccc");
//		qr.save(qqq);
		
		
		Question q= qr.findOne("52a1abf73004aab6ad0a4a5f");
		QuestionSet qs = qsr.findOne("52a1b17630045478af28e727");
		
//		qs.getQuestions().add(qqq);
//		qs.getQuestions().add(q);
		qs = qsr.save(qs);
	
		System.out.println(qs);
	}
	
	
	@Test
	public void question(){
		Question q = new Question();
		q.setName("question q2222222");
		q.setOptions(Lists.newArrayList("option 1", "option 2", "option 3"));
		q.setRightAnwser(Lists.newArrayList("option 2"));
		q.setQuestionSetId("52a1b2bd30040d5400bc3ce5");
		
		qr.save(q);
	}
}

