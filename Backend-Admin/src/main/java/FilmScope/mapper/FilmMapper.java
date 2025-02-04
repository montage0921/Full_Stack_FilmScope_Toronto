package FilmScope.mapper;

import FilmScope.dto.FilmDto;
import FilmScope.entity.Film;

public class FilmMapper {
    public static FilmDto mapToFilmDto(Film film){
        return new FilmDto(
                film.getId(),
                film.getFilmId(),
                film.getTitle(),
                film.getOriginalTitle(),
                film.getDirectors(),
                film.getCasts(),
                film.getGenres(),
                film.getReleaseYear(),
                film.getCountries(),
                film.getLanguages(),
                film.getRuntime(),
                film.getPosterPath(),
                film.getOverview(),
                film.getImdbId(),
                film.getBackdropPath(),
                film.getCustomId()
        );
    }

    public static Film mapToFilmEntity(FilmDto filmDto){
        return new Film(
                null,
                filmDto.getFilmId(),
                filmDto.getTitle(),
                filmDto.getOriginalTitle(),
                filmDto.getDirectors(),
                filmDto.getCasts(),
                filmDto.getGenres(),
                filmDto.getReleaseYear(),
                filmDto.getCountries(),
                filmDto.getLanguages(),
                filmDto.getRuntime(),
                filmDto.getPosterPath(),
                filmDto.getBackdropPath(),
                filmDto.getOverview(),
                filmDto.getImdbId(),
                null
        );
    }
}
