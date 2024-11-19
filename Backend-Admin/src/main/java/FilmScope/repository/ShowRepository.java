package FilmScope.repository;

import FilmScope.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowRepository extends JpaRepository<Show,Integer> {
}
