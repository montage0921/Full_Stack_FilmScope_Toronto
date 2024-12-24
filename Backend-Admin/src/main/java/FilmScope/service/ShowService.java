package FilmScope.service;

import FilmScope.dto.ShowListDto;
import FilmScope.entity.Show;
import lombok.AllArgsConstructor;
import FilmScope.repository.ShowRepository;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShowService {
    private final ShowRepository showRepository;


    public List<ShowListDto> getAllShows(){
        List<Show> shows= showRepository.findAll();

        return shows.stream().map(show->new ShowListDto(show.getId(),show.getTheatre(),show.getShowTitle()))
                .toList();
    }

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
}
