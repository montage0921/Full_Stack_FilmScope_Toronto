package FilmScope.repository;

import FilmScope.entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilmRepository extends  JpaRepository<Film,Integer>{
    Film findByFilmId(Integer filmId);
    Film findByTitle(String filmTitle);
    List<Film> findByFilmIdIn(List<Integer> filmIds);
    List<Film> findByCustomIdIn(List<Long> customIds);
    Film findByCustomId(Long customId);
}