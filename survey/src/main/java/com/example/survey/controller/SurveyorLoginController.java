package com.example.survey.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.survey.entity.User;
import com.example.survey.service.SurveyorLoginService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class SurveyorLoginController {
	@Autowired
	SurveyorLoginService surveyorLoginService;
	@PostMapping("/register")
	public User registerAdmin(@RequestBody User user) {
		return surveyorLoginService.register(user);
	}
	@PostMapping("/validateSurveyor")
	public boolean validateAdmin(@RequestBody User user) {
		return surveyorLoginService.validateAdmin(user);
	}
	@GetMapping("/getSurveyor")
	public List<User> getAdmin(){
		return surveyorLoginService.getAdmin();
	}
}
