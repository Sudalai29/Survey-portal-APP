package com.example.survey.controller;

import com.example.survey.entity.Feedback;
import com.example.survey.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class FeedbackController {

    @Autowired
    FeedbackService feedbackService;

    @GetMapping("/feedbackform")
    public String getFeedback(Model model){
        model.addAttribute("feedback", new Feedback());
        return "feedbackForm";
    }

    @PostMapping("/feedbackform")
    public String postFeedback(@ModelAttribute("feedback") Feedback feedback){
        feedbackService.addFeedback(feedback);
        return "index";
    }

}
