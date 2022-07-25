package com.example.survey.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.web.bind.annotation.CrossOrigin;

@SuppressWarnings("unused")
@Entity
@Table(name="Survey")
@CrossOrigin
public class Survey {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
	String description;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="topic_id",nullable=false)
	Topic topic;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="surveyor_id",nullable=false)
	Surveyor postedBy;
	LocalDateTime publisedDateTime=LocalDateTime.now();
	LocalDateTime endDateTime=LocalDateTime.now();
	boolean active;
	@OneToMany(mappedBy="survey",fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	List<Feedback> feedbacks;
	public Survey() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Survey(Long id, String description, Topic topic, Surveyor postedBy, LocalDateTime publisedDateTime,
			LocalDateTime endDateTime, boolean active, List<Feedback> feedbacks) {
		super();
		this.id = id;
		this.description = description;
		this.topic = topic;
		this.postedBy = postedBy;
		this.publisedDateTime =LocalDateTime.now();
		this.endDateTime =LocalDateTime.now();
		this.active = active;
		this.feedbacks = feedbacks;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Topic getTopic() {
		return topic;
	}
	public void setTopic(Topic topic) {
		this.topic = topic;
	}
	public Surveyor getPostedBy() {
		return postedBy;
	}
	public void setPostedBy(Surveyor postedBy) {
		this.postedBy = postedBy;
	}
	public LocalDateTime getPublisedDateTime() {
		return publisedDateTime;
	}
	public void setPublisedDateTime(LocalDateTime publisedDateTime) {
		this.publisedDateTime =LocalDateTime.now();
	}
	public LocalDateTime getEndDateTime() {
		return endDateTime;
	}
	public void setEndDateTime(LocalDateTime endDateTime) {
		this.endDateTime =LocalDateTime.now();
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public List<Feedback> getFeedbacks() {
		return feedbacks;
	}
	public void setFeedbacks(List<Feedback> feedbacks) {
		this.feedbacks = feedbacks;
	}
	
}
