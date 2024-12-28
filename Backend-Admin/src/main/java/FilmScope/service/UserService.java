package FilmScope.service;

import FilmScope.entity.Role;
import FilmScope.entity.UserEntity;
import FilmScope.repository.RoleRepository;
import FilmScope.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public String approve(String username){
        UserEntity user=userRepository.findByUsername(username).get();
        Role adminRole=roleRepository.findByRole("ADMIN").get();

        user.getRoles().clear();
        user.getRoles().add(adminRole);
        userRepository.save(user);
        return String.format("User %s has become an admin",username);
    }
}
