package com.rick.quiz.data.repo;

import org.springframework.data.repository.CrudRepository;

import com.rick.quiz.data.model.FormFieldType;

public interface FormFieldTypeRepo extends CrudRepository<FormFieldType, String> {

}
