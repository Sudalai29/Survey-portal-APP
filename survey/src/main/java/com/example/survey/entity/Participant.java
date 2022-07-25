package com.example.survey.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="participant")
public class Participant {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
	String userName;
	String firstName;
	String lastName;
	@OneToMany(mappedBy="participant",fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	List<Feedback> feedbacks;
	public Participant() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Participant(Long id, String userName, String firstName, String lastName, List<Feedback> feedbacks) {
		super();
		this.id = id;
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.feedbacks = feedbacks;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public List<Feedback> getFeedbacks() {
		return feedbacks;
	}
	public void setFeedbacks(List<Feedback> feedbacks) {
		this.feedbacks = feedbacks;
	}
	
}
