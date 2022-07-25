package com.example.survey.repository;

import com.example.survey.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TopicRepository extends JpaRepository<Topic,Long> {
    Optional<Topic> findByTopicName(Optional<Topic> topic);

	Optional<Topic> findBytopicName(Optional<Topic> topic);

}
