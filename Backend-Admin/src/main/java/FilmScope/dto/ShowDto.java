package FilmScope.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ShowDto {
    private Integer id;
    private String theatre;
    private String showTitle;
    private Map<String,List<List<String>>> showtimes;
    private String filmTitle;
    private String director;
    private Integer releaseYear;
    private Integer filmId;
    private Boolean published;
    private String poster;
    private String backdrop;
    private Long customId;
}
