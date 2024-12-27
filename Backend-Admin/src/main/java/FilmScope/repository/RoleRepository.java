package FilmScope.repository;

import FilmScope.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface roleRepository extends JpaRepository<Roles,Integer> {
    Roles findByRole(String name);
}
