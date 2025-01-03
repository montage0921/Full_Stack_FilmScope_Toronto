package FilmScope.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import FilmScope.entity.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    Optional<UserEntity> findByUsername(String username);
    Boolean existsByUsername(String username);
}
