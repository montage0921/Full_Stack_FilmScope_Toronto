package FilmScope.service;

import lombok.AllArgsConstructor;
import FilmScope.repository.ShowRepository;
import org.springframework.stereotype.Service;
import FilmScope.dto.ShowListDto;
import FilmScope.mapper.ShowListMapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShowService {
    private final ShowRepository showRepository;

    public List<ShowListDto> getShowList(){

        List<Object[]> showListData=showRepository.getShowListData();
        return showListData.stream()
                .map(ShowListMapper::mapShowListToDto)
                .collect(Collectors.toList());
    }
}
