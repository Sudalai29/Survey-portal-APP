package com.example.survey.controller;

import com.example.survey.entity.User;
import com.example.survey.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class ParticipantController {
    @Autowired
    ParticipantService participantService;

    @PostMapping("/addParticipant")
    public User addUser(@RequestBody User user) {
        return participantService.addUser(user);
    }

    @PostMapping("/validateParticipant")
    public boolean validateUser(@RequestBody User user) {
        return participantService.validateUser(user);
    }

    @DeleteMapping("/removeParticipant")
    public User deleteUser(@RequestBody User user) {
        return participantService.removeUser(user);
    }

    @GetMapping("/getParticipants")
    public List<User> getUsers() {
        return participantService.getUsers();
    }
}
