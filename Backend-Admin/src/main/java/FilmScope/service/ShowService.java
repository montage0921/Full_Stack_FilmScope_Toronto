package FilmScope.service;

import FilmScope.dto.FilmDto;
import FilmScope.dto.ShowDetailedDto;
import FilmScope.dto.ShowDto;
import FilmScope.dto.ShowListDto;
import FilmScope.entity.Film;
import FilmScope.entity.Show;
import FilmScope.mapper.FilmMapper;
import FilmScope.mapper.ShowMapper;
import FilmScope.repository.FilmRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import FilmScope.repository.ShowRepository;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShowService {
    private final ShowRepository showRepository;
    private final FilmRepository filmRepository;

    // get all shows in list view (only id, showTitle and movie theatre)
    public List<ShowListDto> getAllShows(){
        List<Show> shows= showRepository.findAll();

        return shows.stream().map(show->new ShowListDto(show.getId(),show.getTheatre(),show.getShowTitle()))
                .toList();
    }

    // get shows in recent 7 days in list view
    public List<ShowListDto> getRecentShows(){
        List<Show> shows=showRepository.findAll();
        LocalDate today=LocalDate.now();
        LocalDate oneWeekLater=today.plusDays(7);

        List<Show> recentShows=shows.stream().filter(show->{
            List<String> showDate=show.getShowTimes().keySet().stream().toList();

            for (String dateStr:showDate){
                LocalDate date=LocalDate.parse(dateStr);
                if(!date.isBefore(today)&&date.isBefore(oneWeekLater)){
                    return true;
                }
            }
            return false;
        }).toList();

        return recentShows.stream().map(show -> {
            return new ShowListDto(show.getId(),show.getTheatre(),show.getShowTitle());
        }).toList();
    }

    // get detailed movie info
    public ShowDetailedDto getDetailedInfo(String showName,String theatre){
        List<Show> shows=showRepository.findByShowTitle(showName);
        List<Show> showsInATheatre=shows.stream().filter(show -> show.getTheatre().equals(theatre)).toList();
        String showTitle=showsInATheatre.get(0).getShowTitle();
        Boolean published=showsInATheatre.get(0).getPublished();
        Map<String,List<List<String>>> showtimes=showsInATheatre.get(0).getShowTimes();

        List<Integer> filmIDs=showsInATheatre.stream().map(Show::getFilmId).toList();
        List<Integer> IDs=showsInATheatre.stream().map(Show::getId).toList();

        List<Film> films=filmRepository.findByFilmIdIn(filmIDs);

        return new ShowDetailedDto(theatre,showTitle,showtimes,published,films,filmIDs,IDs);
    }

    @Transactional
    // update show info
    public List<ShowDto> updateShow(String showTitle,ShowDto updatedShow){
        List<Show> shows=showRepository.findByShowTitle((showTitle));
        for (Show show:shows){
            show.setShowTimes(updatedShow.getShowtimes());
            show.setShowTitle(updatedShow.getShowTitle());
            show.setPublished(updatedShow.getPublished());
        }
        showRepository.saveAll((shows));

        return shows.stream().map(ShowMapper::mapToShowDto).toList();
    }

    @Transactional
    // update Film info
    public FilmDto updateFilm(String filmTitle, FilmDto updatedFilmDto){
        // get film record by filmId from database
        Film film=filmRepository.findByTitle(filmTitle);

        // update it with new info from updatedFilmDto
        film.setTitle(updatedFilmDto.getTitle());
        film.setOriginalTitle(updatedFilmDto.getOriginalTitle());
        film.setDirectors(updatedFilmDto.getDirectors());
        film.setCasts(updatedFilmDto.getCasts());
        film.setGenres(updatedFilmDto.getGenres());
        film.setReleaseYear(updatedFilmDto.getReleaseYear());
        film.setCountries(updatedFilmDto.getCountries());
        film.setLanguages(updatedFilmDto.getLanguages());
        film.setRuntime(updatedFilmDto.getRuntime());
        film.setPosterPath(updatedFilmDto.getPosterPath());
        film.setOverview(updatedFilmDto.getOverview());
        film.setImdbId(updatedFilmDto.getImdbId());

        // save the change
        filmRepository.save(film);

        // get show records by filmID
        List<Show> shows=showRepository.findByFilmTitle(filmTitle);

        for (Show show:shows){
            show.setFilmTitle(updatedFilmDto.getTitle());
            // directors can be more than one however film info in showtime table is just for api search purpose, so no need to be accurate. Save one director is enough to get the accurate info im TMDB API
            show.setDirector(updatedFilmDto.getDirectors().get(0));
            show.setReleaseYear(updatedFilmDto.getReleaseYear());
        }

        return FilmMapper.mapToFilmDto(film);
    }

    // delete a show
    public void deleteShow(String showTitle, String theatre){
        List<Show> shows=showRepository.findByShowTitle(showTitle);
        List<Show> showsInSomeTheatre=shows.stream().filter(show -> show.getTheatre().equals(theatre)).toList();
        showRepository.deleteAll(showsInSomeTheatre);
    }

    // delete a showBy Film
    // In our database, each unique film in a single show has a separate record
    // for example, if a show "Lord of the Ring Trilogy" has 3 movies, then we have 3 records,
    // each of them has same showTitle but a different film. So delete a film is like delete a whole show record
    public void deleteFilm(String showTitle, String theatre, String filmTitle){
        List<Show> shows=showRepository.findByShowTitle(showTitle);
        Show show=shows.stream().filter(show1 -> show1.getTheatre().equals(theatre)).filter(show1 -> show1.getFilmTitle().equals(filmTitle) ).toList().get(0);
        showRepository.delete(show);
    }
}
