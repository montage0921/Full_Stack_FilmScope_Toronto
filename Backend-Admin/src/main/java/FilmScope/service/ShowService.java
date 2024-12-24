package FilmScope.service;

import FilmScope.dto.ShowListDto;
import FilmScope.entity.Show;
import lombok.AllArgsConstructor;
import FilmScope.repository.ShowRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShowService {
    private final ShowRepository showRepository;

    public List<ShowListDto> getAllShows(){
        List<Show> shows= showRepository.findAll();
        Map<String,List<List<String>>> showDate=shows.get(0).getShowTimes();
        System.out.println(showDate);

        return shows.stream().map(show->new ShowListDto(show.getId(),show.getTheatre(),show.getShowTitle()))
                .toList();
    }
}
