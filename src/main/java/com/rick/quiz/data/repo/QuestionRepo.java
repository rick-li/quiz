package com.rick.quiz.data.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.rick.quiz.data.model.Question;
import com.rick.quiz.data.model.QuestionSet;
import com.rick.quiz.data.repo.inner.QuestionInnerRepo;
import com.rick.quiz.data.repo.inner.QuestionSetInnerRepo;

@Repository
public class QuestionRepo {
	
	@Autowired
	private QuestionInnerRepo qRepo;
	
	@Autowired
	private QuestionSetInnerRepo qsRepo;
	
	@Autowired
	private MongoTemplate tmpl;
	
	public List<Question> findQuestionsByQuesionSet(String id){
		QuestionSet qs = qsRepo.findOne(id);
		qs.setName("aaa");
		qs.setDesc("bbbbb");
		return null;
//		tmpl.executeQuery(query, collectionName, dch);
	}
}
