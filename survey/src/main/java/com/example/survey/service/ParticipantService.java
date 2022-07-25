package com.example.survey.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.survey.entity.User;
import com.example.survey.repository.ParticipantRepository;

@Service
public class ParticipantService {
@Autowired
ParticipantRepository participantRepository;
public User addUser(User user) {
	// TODO Auto-generated method stub
	return participantRepository.save(user);
}
public boolean validateUser(User user) {
	// TODO Auto-generated method stub
	List<User> temp=new ArrayList<User>();
	temp=participantRepository.findAll();
	for(User u:temp) {
		if(u.getname().equals(user.getname())) {
			if(u.getPassword().equals(user.getPassword())) {
				return true;
			}
			else {
				return false;
			}
		}
	}
	return false;
}
public User removeUser(User user) {
	// TODO Auto-generated method stub
	Optional<User> userContainer=participantRepository.findById(user.getUserId());
	if(userContainer.isPresent()) {
		User user1=userContainer.get();
		participantRepository.delete(user1);
		return user;
	}
	return null;
}
public List<User> getUsers() {
	// TODO Auto-generated method stub
	List<User>container=new ArrayList<User>();
	container=participantRepository.findAll();
	List<User>res=new ArrayList<User>();
	for(User u:container) {
		if(!(u.getRole().equals("surveyor"))) {
			res.add(u);
		}
	}
	return res;
}

}
