package FilmScope.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ShowDto {
    private Integer id;
    private String theatre;
    private String showTitle;
    private LocalDate showDate;
    private LocalTime showTime;
    private String filmTitle;
    private String director;
    private Integer releaseYear;
    private String link;
    private Integer filmId;
    private Boolean published;
}
