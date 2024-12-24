package FilmScope.service;

import FilmScope.dto.ShowDetailedDto;
import FilmScope.dto.ShowDto;
import FilmScope.dto.ShowListDto;
import FilmScope.entity.Film;
import FilmScope.entity.Show;
import FilmScope.mapper.ShowMapper;
import FilmScope.repository.FilmRepository;
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
    public ShowDetailedDto getDetailedInfo(String showName){
        List<Show> shows=showRepository.findByShowTitle(showName);
        String theatre=shows.get(0).getTheatre();
        String showTitle=shows.get(0).getShowTitle();
        Boolean published=shows.get(0).getPublished();
        Map<String,List<List<String>>> showtimes=shows.get(0).getShowTimes();

        List<Integer> filmIDs=shows.stream().map(Show::getFilmId).toList();
        List<Integer> IDs=shows.stream().map(Show::getId).toList();

        List<Film> films=filmRepository.findByFilmIdIn(filmIDs);


        return new ShowDetailedDto(theatre,showTitle,showtimes,published,films,filmIDs,IDs);
    }

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
}
