package FilmScope.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import FilmScope.entity.User;

public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUsername(String username);
    Boolean existsByUsername(String username);
}
