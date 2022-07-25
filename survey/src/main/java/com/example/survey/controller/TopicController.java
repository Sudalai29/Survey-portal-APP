package com.example.survey.controller;

import com.example.survey.entity.Topic;
import com.example.survey.service.TopicService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/topic")
@CrossOrigin

public class TopicController {
    @Autowired
    private TopicService topicService;

    @PostMapping("/create")
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topicName) {
        @SuppressWarnings("unused")
		Topic savedTopic = topicService.addTopic(topicName);
        return ResponseEntity.ok().body(topicName);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Topic> getById(@PathVariable("id") Long id) {
        Topic topic = topicService.findById(id);
        return ResponseEntity.ok().body(topic);
    }

    @GetMapping("/getByName/{name}")
    public ResponseEntity<Topic> getByName(@PathVariable("name") Optional<Topic> name) {
        Topic topic = topicService.findByName(name);
        return ResponseEntity.ok().body(topic);
    }

    @PostMapping("/countSurveys")
    public ResponseEntity<?> countSurveysDone(@RequestBody Topic topic){
        return null;
    }
}
