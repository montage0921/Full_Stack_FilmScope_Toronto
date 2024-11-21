package FilmScope.repository;

import FilmScope.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShowRepository extends JpaRepository<Show,Integer> {
    @Query("SELECT DISTINCT s.id,s.theatre,s.showTitle From Show s")
    List<Object[]> getShowListData();
}
