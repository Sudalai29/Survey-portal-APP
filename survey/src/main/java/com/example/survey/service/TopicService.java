package com.example.survey.service;

import com.example.survey.entity.Topic;
import com.example.survey.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TopicService {
    @Autowired
    TopicRepository topicRepository;

    public Topic addTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    public Topic findById(Long id) {
        Optional<Topic> topic = topicRepository.findById(id);
        return topic.orElse(null);
    }

    public void removeById(Long id) {
        topicRepository.deleteById(id);
    }

    public Topic findByName(Optional<Topic> topicName) {
        Optional<Topic> topic = topicRepository.findByTopicName(topicName);
        return topic.orElse(null);
    }
}
