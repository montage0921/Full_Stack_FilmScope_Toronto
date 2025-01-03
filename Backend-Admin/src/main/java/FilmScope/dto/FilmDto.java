package FilmScope.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor



public class FilmDto {
    private Integer id;
    private Integer filmId;
    private String title;
    private String originalTitle;
    private List<String> directors;
    private List<String> casts;
    private List<String> genres;
    private Integer releaseYear;
    private List<String> countries;
    private List<String> languages;
    private Integer runtime;
    private String posterPath;
    private String overview;
    private String imdbId;
    private String backdropPath;
}
