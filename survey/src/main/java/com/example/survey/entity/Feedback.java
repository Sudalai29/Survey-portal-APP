package com.example.survey.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="feedback")
public class Feedback {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="survey_id",nullable=false)
	Survey survey;
	LocalDateTime postedDateTime;
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="participant_id",nullable=false)
	Participant participant;
	public Feedback() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Feedback(Long id, Survey survey, LocalDateTime postedDateTime, Participant participant) {
		super();
		this.id = id;
		this.survey = survey;
		this.postedDateTime = postedDateTime;
		this.participant = participant;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Survey getSurvey() {
		return survey;
	}
	public void setSurvey(Survey survey) {
		this.survey = survey;
	}
	public LocalDateTime getPostedDateTime() {
		return postedDateTime;
	}
	public void setPostedDateTime(LocalDateTime postedDateTime) {
		this.postedDateTime = postedDateTime;
	}
	public Participant getParticipant() {
		return participant;
	}
	public void setParticipant(Participant participant) {
		this.participant = participant;
	}
	
}
