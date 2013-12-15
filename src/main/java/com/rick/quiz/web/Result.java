package com.rick.quiz.web;

public class Result {
	
	public static Result Success(Object d){
		Result r = new Result(Status.SUCCESS);
		r.setResult(d);
		return r;
	}
	
	enum Status {
		SUCCESS, FAIL
	}

	private Status status;

	private Object result;

	private String message;
	
	public Result(Status status){
		this.status = status;
	}
	
	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
