package FilmScope.repository;

import FilmScope.entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilmRepository extends  JpaRepository<Film,Integer>{
    Film findByFilmId(Integer filmId);
    List<Film> findByFilmIdIn(List<Integer> filmIds);
}