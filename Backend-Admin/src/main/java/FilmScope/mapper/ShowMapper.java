package FilmScope.mapper;

import FilmScope.dto.ShowDto;
import FilmScope.entity.Show;

public class ShowMapper {

    public static ShowDto mapToShowDto(Show show){
        return new ShowDto(
                show.getId(),
                show.getTheatre(),
                show.getShowTitle(),
                show.getShowDate(),
                show.getShowTime(),
                show.getFilmTitle(),
                show.getDirector(),
                show.getReleaseYear(),
                show.getLink(),
                show.getFilmId(),
                show.getPublished()

        );
    }

    public static Show mapToShowEntity(ShowDto showDto){
        return new Show(
                showDto.getId(),
                showDto.getTheatre(),
                showDto.getShowTitle(),
                showDto.getShowDate(),
                showDto.getShowTime(),
                showDto.getFilmTitle(),
                showDto.getDirector(),
                showDto.getReleaseYear(),
                showDto.getLink(),
                showDto.getFilmId(),
                showDto.getPublished()
        );
    }
}
