package FilmScope.mapper;

import FilmScope.dto.ShowDto;
import FilmScope.entity.Show;

public class ShowMapper {
    public static ShowDto mapToShowDto(Show show){
        return new ShowDto(
                show.getId(),
                show.getTheatre(),
                show.getShowTitle(),
                show.getShowTimes(),
                show.getFilmTitle(),
                show.getDirector(),
                show.getReleaseYear(),
                show.getFilmId(),
                show.getPublished()
        );
    }

    public static Show mapToShowEntity(ShowDto showDto){
        return new Show(
                showDto.getId(),
                showDto.getTheatre(),
                showDto.getShowTitle(),
                showDto.getShowtimes(),
                showDto.getFilmTitle(),
                showDto.getDirector(),
                showDto.getReleaseYear(),
                showDto.getFilmId(),
                showDto.getPublished()
        );
    }
}
