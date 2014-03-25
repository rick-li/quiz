package com.rick.quiz.data.repo;

import org.springframework.data.repository.CrudRepository;

import com.rick.quiz.data.model.User;

public interface UserRepo extends CrudRepository<User, String> {
	User findByPhonenum(String phoneNnum);
}
