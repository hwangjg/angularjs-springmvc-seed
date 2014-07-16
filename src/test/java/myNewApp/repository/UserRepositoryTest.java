package myNewApp.repository;

import junit.framework.Assert;
import myNewApp.model.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations={"classpath*:testContext-config.xml"})
public class UserRepositoryTest {

	@Autowired
	private UserRepository userRepository;

	@Before
	public void setUp() throws Exception {
		userRepository.clearRepository();
	}

	@Test
	public void shouldSaveNewUser() throws Exception {
		int usersCountBeforeSaving = userRepository.findAll().size();

		userRepository.save(new User(1, "Admin", 25));
		int usersCountAfterSaving = userRepository.findAll().size();

		Assert.assertTrue(usersCountBeforeSaving + 1 == usersCountAfterSaving);
	}

	@Test
	public void shouldFindUser() throws Exception {
		final String userName = "UserToFind";

		userRepository.save(new User(1, userName, 18));
		User user = userRepository.findById(1);

		Assert.assertEquals(user.getName(), userName);
	}

}