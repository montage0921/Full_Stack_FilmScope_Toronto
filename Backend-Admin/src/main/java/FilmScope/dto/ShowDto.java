package FilmScope.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ShowDto {
    private Integer id;
    private String theatre;
    private String showTitle;
    private String showDate;
    private String showTime;
    private String filmTitle;
    private String director;
    private Integer releaseYear;
    private String link;
    private Integer filmId;
    private Boolean published;

}
