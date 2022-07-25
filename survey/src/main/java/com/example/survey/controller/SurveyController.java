package com.example.survey.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.survey.entity.Survey;
import com.example.survey.service.SurveyService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SurveyController {
@Autowired
SurveyService surveyService;
@PostMapping("/addSurvey")
public Survey addSurvey(@RequestBody Survey survey) {
	return surveyService.addSurvey(survey);
}
@GetMapping("/getById/{id}")
public Survey findById(@PathVariable Long id) {
	return surveyService.findById(id);
}
@PutMapping("/updateSurvey")
public Survey updateSurvey(@RequestBody Survey survey) {
	return surveyService.updateSurvey(survey);
}
@DeleteMapping("/deleteSurvey/{id}")
public void deleteSurvey(@PathVariable Long id) {
	surveyService.deleteSurvey(id);
}
@GetMapping("/getFeedbackCount")
public int getFeedbackCount(@RequestBody Survey survey) {
	return surveyService.getFeedbackCount(survey);
}
}
