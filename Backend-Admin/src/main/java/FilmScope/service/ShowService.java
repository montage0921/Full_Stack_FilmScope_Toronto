package FilmScope.service;

import FilmScope.dto.*;
import FilmScope.entity.Film;
import FilmScope.entity.Show;
import FilmScope.mapper.FilmMapper;
import FilmScope.mapper.ShowMapper;
import FilmScope.repository.FilmRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import FilmScope.repository.ShowRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class ShowService {
    private final ShowRepository showRepository;
    private final FilmRepository filmRepository;

    // get all shows in list view (only id, showTitle and movie theatre)
    public List<ShowListDto> getAllShows(){
        List<Show> shows= showRepository.findAll();
        return shows.stream().map(show->new ShowListDto(show.getId(),show.getTheatre(),show.getShowTitle(),show.getFilmTitle(),show.getShowTimes().keySet()))
                .toList();
    }

    // pagination loading
    public Page<ShowListDto> load(int page, int size){
        Pageable pageable= PageRequest.of(page,size);
        Page<Show> showPage=showRepository.findAll(pageable);

        return showPage.map(show->new ShowListDto(
                show.getId(),
                show.getTheatre(),
                show.getShowTitle(),
                show.getFilmTitle(),
                show.getShowTimes().keySet()
        ));
    }

    public List<SearchResDto> search(String query){
        List<Show> matchedShow=showRepository.findByFilmTitleContaining(query);
        System.out.println(matchedShow);
        return matchedShow.stream().map(show->
        {
            Film film=filmRepository.findByFilmId(show.getFilmId());
            String imageUrl=film!=null?film.getPosterPath():null;
            return new SearchResDto(
                    show.getId(),
                    show.getShowTitle(),
                    show.getFilmTitle(),
                    show.getTheatre(),
                    imageUrl);
        }
        ).toList();
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
        List<FilmDto> filmDtoList=films.stream().map(FilmMapper::mapToFilmDto).toList();

        return new ShowDetailedDto(theatre,showTitle,showtimes,published,filmDtoList,filmIDs,IDs);
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
    // each of them has same showTitle but a different film. So delete a film means we need to delete a show record
    public void deleteFilm(String showTitle, String theatre, String filmTitle){
        List<Show> shows=showRepository.findByShowTitle(showTitle);
        Show show=shows.stream().filter(show1 -> show1.getTheatre().equals(theatre)).filter(show1 -> show1.getFilmTitle().equals(filmTitle) ).toList().get(0);
        showRepository.delete(show);
    }

    // delete all expired shows
    public void deleteExpiredShows(){
        LocalDate today=LocalDate.now();
        List<Show> shows=showRepository.findAll();

        List<Show> expiredShows=shows.stream().filter(show -> {
            List<String> showDates=show.getShowTimes().keySet().stream().toList();
            for (String dateStr:showDates){
                LocalDate date=LocalDate.parse(dateStr);
                if(date.isAfter(today)){
                    return false;
                }
            }
            return true;
        }).toList();

        showRepository.deleteAll(expiredShows);
    }

    // add show
    @Transactional
    public String addNewShow(ShowDetailedDto showDetailedDto){
        List<FilmDto> filmDtoList=showDetailedDto.getDetailedMovieInfo();

        String show_title=showDetailedDto.getShowTitle();
        String theatre=showDetailedDto.getTheatre();
        Map<String,List<List<String>>> showtimes=showDetailedDto.getShowtimes();
        Boolean published=showDetailedDto.getPublished();

        try{
            for (FilmDto filmDto:filmDtoList){
                String filmTitle=filmDto.getTitle();
                String directors = filmDto.getDirectors().isEmpty() ? "" : filmDto.getDirectors().get(0);
                Integer releaseYear=filmDto.getReleaseYear();
                Integer filmId=filmDto.getFilmId();

                Show show=new Show(null,theatre,show_title,showtimes,filmTitle,directors,releaseYear,filmId,published);
                Film film=FilmMapper.mapToFilmEntity(filmDto);

                showRepository.save(show);
                filmRepository.save(film);
            }
            return "Show and Films added successfully";
        } catch(DataIntegrityViolationException e){
            return "Error: duplicate record";
        } catch(Exception e){
            return String.format("Error %s",e.getMessage());
        }
    }
}
