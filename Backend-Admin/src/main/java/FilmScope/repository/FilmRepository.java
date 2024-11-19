package FilmScope.repository;

import FilmScope.entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FilmRepository extends  JpaRepository<Film,Integer>{

}