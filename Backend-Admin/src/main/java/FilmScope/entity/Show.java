package FilmScope.entity;

import jakarta.persistence.*; // JPA library
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

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

    @Column(name="show_date")
    private String showDate;

    @Column(name="show_time")
    private String showTime;

    @Column(name="film_title")
    private String filmTitle;

    @Column(name="director")
    private String director;

    @Column(name="year")
    private Integer releaseYear;

    @Column(name="link")
    private String link;

    @Column(name="film_id")
    private Integer filmId;

    @Column(name="published")
    private Boolean published;
}
