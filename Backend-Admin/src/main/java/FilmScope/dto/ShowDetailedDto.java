package FilmScope.dto;

import FilmScope.entity.Film;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ShowDetailedDto {
    private String theatre;
    private String showTitle;
    private Map<String,List<List<String>>> showtimes;
    private Boolean published;
    private List<Film> detailedMovieInfo;
    private List<Integer> filmIds;
    private List<Integer> Ids;
}
