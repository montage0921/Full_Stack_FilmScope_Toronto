package FilmScope.entity;

import jakarta.persistence.*;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import FilmScope.converter.JsonListConverter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name="movie_info")

public class Film {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY )
    private Integer id;

    @Column(name="film_id")
    private Integer filmId;

    @Column(name="title",nullable = false)
    private String title;

    @Column(name="original_title")
    private String originalTitle;

    @Column(name="directors",columnDefinition = "JSON")
    @Convert(converter = JsonListConverter.class)
    private List<String> directors;

    @Column(name="casts",columnDefinition = "JSON")
    @Convert(converter = JsonListConverter.class)
    private List<String> casts;

    @Column(name="genres",columnDefinition = "JSON")
    @Convert(converter = JsonListConverter.class)
    private List<String> genres;

    @Column(name="release_year")
    private Integer releaseYear;

    @Column(name="countries",columnDefinition = "JSON")
    @Convert(converter = JsonListConverter.class)
    private List<String> countries;

    @Column(name="languages",columnDefinition = "JSON")
    @Convert(converter = JsonListConverter.class)
    private List<String> languages;

    @Column(name="runtime")
    private Integer runtime;

    @Column(name="poster_path")
    private String posterPath;

    @Lob // indicate it is a large object
    @Column(name="overview",columnDefinition = "TEXT")
    private String overview;

    @Column(name="imdb_id")
    private String imdbId;

}
