package com.example.survey.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.survey.entity.User;
import com.example.survey.repository.SurveyorLoginRepository;

@Service
public class SurveyorLoginService {
    @Autowired
    SurveyorLoginRepository surveyorLoginRepository;

    public User register(User user) {
        user.setRole("surveyor");
        return surveyorLoginRepository.save(user);
    }

    public boolean validateAdmin(User user) {
        @SuppressWarnings("unused")
		String username = user.getname();
        List<User> container = new ArrayList<User>();
        container = surveyorLoginRepository.findAll();
        for (User u : container) {
            if (u.getname().equals(user.getname())) {
                if (u.getPassword().equals(user.getPassword())) {
                    return true;
                }
            }
        }
        return false;
    }


    public List<User> getAdmin() {
        List<User> container = new ArrayList<User>();
        container = surveyorLoginRepository.findAll();
        List<User> res = new ArrayList<User>();
        for (User u : container) {
            if (u.getRole().equals("surveyor")) {
                res.add(u);
            }
        }
        return res;
    }

}
