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
@Table(name="surveyor")
public class Surveyor {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
	String userName;
	String firstName;
	String lastName;
	@OneToMany(mappedBy="postedBy",fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	List<Survey> createdSurveys;
	public Surveyor() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Surveyor(Long id, String userName, String firstName, String lastName, List<Survey> createdSurveys) {
		super();
		this.id = id;
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.createdSurveys = createdSurveys;
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
	public List<Survey> getCreatedSurveys() {
		return createdSurveys;
	}
	public void setCreatedSurveys(List<Survey> createdSurveys) {
		this.createdSurveys = createdSurveys;
	}
	
}
