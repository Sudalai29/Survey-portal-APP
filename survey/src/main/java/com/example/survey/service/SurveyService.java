package com.example.survey.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.survey.entity.Feedback;
import com.example.survey.entity.Survey;
import com.example.survey.repository.SurveyRepository;
@Service
public class SurveyService {
@Autowired
SurveyRepository surveyRepository;
	public Survey addSurvey(Survey survey) {
		// TODO Auto-generated method stub
		return surveyRepository.save(survey);
	}
	public Survey findById(Long id) {
		// TODO Auto-generated method stub
		Optional<Survey> container=surveyRepository.findById(id);
		if(container.isPresent()) {
			return container.get();
		}
		return null;
	}
	public Survey updateSurvey(Survey survey) {
		// TODO Auto-generated method stub
		Optional<Survey> container=surveyRepository.findById(survey.getId());
		if(container.isPresent()) {
			Survey result=container.get();
			result.setActive(survey.isActive());
			result.setDescription(survey.getDescription());
			result.setEndDateTime(survey.getEndDateTime());
			result.setFeedbacks(survey.getFeedbacks());
			result.setPostedBy(survey.getPostedBy());
			result.setPublisedDateTime(survey.getPublisedDateTime());
			result.setTopic(survey.getTopic());
			return result;
		}
		return null;
	}
	public void deleteSurvey(Long id) {
		// TODO Auto-generated method stub
		Optional<Survey> container=surveyRepository.findById(id);
		if(container.isPresent()) {
			@SuppressWarnings("unused")
			Survey result=container.get();
			surveyRepository.delete(container.get());
		}
		
	}
	public int getFeedbackCount(Survey survey) {
		// TODO Auto-generated method stub
		Optional<Survey> container=surveyRepository.findById(survey.getId());
		int count=0;
		if(container.isPresent()) {
			Survey result=container.get();
			for(@SuppressWarnings("unused") Feedback f:result.getFeedbacks()) {
				count++;
			}
			return count;
			}
		return 0;
	}

}
