package myNewApp.repository;

import myNewApp.model.User;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class UserRepository {

	private List<User> verySimpleRepository = new ArrayList<>(Arrays.asList(
			new User(1, "John", 45),
			new User(2, "Kate", 33),
			new User(3, "Albert", 25)
	));

	public User findById(long id) {
		for (User user : verySimpleRepository) {
			if (user.getId() == id) {
				return user;
			}
		}
		return null;
	}

	public List<User> findAll() {
		return verySimpleRepository;
	}

	public void save(User user) {
		user.setId(nextId());
		verySimpleRepository.add(user);
	}

	public void update(int userId, User updatedUser) {
		for (User user : verySimpleRepository) {
			if (user.getId() == userId) {
				user.setName(updatedUser.getName());
				user.setAge(updatedUser.getAge());
			}
		}
	}

	public void delete(Integer id) {
		User userToDelete = null;
		for (User user : verySimpleRepository) {
			if (user.getId() == id) {
				userToDelete = user;
			}
		}
		if (userToDelete != null) {
			verySimpleRepository.remove(userToDelete);
		}
	}

	public void clearRepository() {
		verySimpleRepository.clear();
	}

	private long nextId() {
		return verySimpleRepository.size() + 1;
	}
}
