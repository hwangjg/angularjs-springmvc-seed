package myNewApp.controller;

import myNewApp.model.User;
import myNewApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

@Controller
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public @ResponseBody List<User> list() {
		return userRepository.findAll();
	}

	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	public @ResponseBody User find(@PathVariable("id") Integer id, HttpServletResponse response) {
		User user = userRepository.findById(id);
		if (user == null) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		} else {
			response.setStatus(HttpServletResponse.SC_OK);
		}
		return user;
	}

	@RequestMapping(value = "/users", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void create(@RequestBody User userSkeleton) {
		userRepository.save(userSkeleton);
	}

	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable("id") Integer id) {
		userRepository.delete(id);
	}

	@RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@PathVariable("id") Integer id, @RequestBody User user) {
		userRepository.update(id, user);
	}


}
