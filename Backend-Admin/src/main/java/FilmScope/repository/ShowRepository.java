package FilmScope.repository;

import FilmScope.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShowRepository extends JpaRepository<Show,Integer> {
    List<Show> findByShowTitle(String showTitle); // for simple SQL operation, we can only define it as findByFeatureName
    List<Show> findByFilmId(Integer filmId);
}
