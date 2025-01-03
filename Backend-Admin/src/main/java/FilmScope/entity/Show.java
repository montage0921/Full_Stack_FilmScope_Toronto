package FilmScope.entity;

import FilmScope.converter.JsonShowTimeConverter;
import ch.qos.logback.classic.pattern.DateConverter;
import jakarta.persistence.*; // JPA library
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="showtime")

public class Show {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="theatre",nullable = false)
    private String theatre;

    @Column(name="show_title",nullable = false)
    private String showTitle;


    @Column(name="showtimes_dict",columnDefinition = "JSON")
    @Convert(converter=JsonShowTimeConverter.class)
    private Map<String,List<List<String>>> showTimes;

    @Column(name="film_title")
    private String filmTitle;

    @Column(name="director")
    private String director;

    @Column(name="year")
    private Integer releaseYear;

    @Column(name="film_id")
    private Integer filmId;

    @Column(name="published")
    private Boolean published;

    @Column(name="poster")
    private String poster;

    @Column(name="backdrop")
    private String backdrop;
}
