package FilmScope.controller;

import FilmScope.dto.ShowListDto;
import FilmScope.service.ShowService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/admin-filmscope")
public class ShowController{
    private final ShowService showService;

    @GetMapping("/all-show")
    public ResponseEntity<List<ShowListDto>> getShowList(){
        List<ShowListDto> showList=showService.getShowList();

        return ResponseEntity.ok(showList);
    }

    @GetMapping("/upcoming-show")
    public ResponseEntity<List<ShowListDto>> getUpcomingShows(){
        List<ShowListDto> upcomingShows=showService.getUpcomingShows();
        return ResponseEntity.ok(upcomingShows);
    }
}