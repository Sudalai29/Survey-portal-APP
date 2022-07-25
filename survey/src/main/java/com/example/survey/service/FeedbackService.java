package com.example.survey.service;


import com.example.survey.entity.Feedback;
import com.example.survey.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    @Autowired
    FeedbackRepository feedbackRepository;
    public void addFeedback(Feedback feedback){
        feedbackRepository.save(feedback);
    }
}
