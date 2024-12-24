package FilmScope.controller;

import FilmScope.dto.ShowDetailedDto;
import FilmScope.dto.ShowListDto;
import FilmScope.service.ShowService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/admin-filmscope")
public class ShowController{
    private final ShowService showService;

    // get a list of movie screening info (id, title, theatre)
    @GetMapping
    public ResponseEntity<List<ShowListDto>> getShowList(){
        List<ShowListDto> shows=showService.getAllShows();
        return ResponseEntity.ok(shows);
    }

    // get recent movie screening list (in 7 days)
    @GetMapping("recent")
    public ResponseEntity<List<ShowListDto>> getRecentShowList(){
        List<ShowListDto> recentShows=showService.getRecentShows();
        return ResponseEntity.ok(recentShows);
    }

    // get movie detailed info by showTitle
    @GetMapping("{showName}")
    public ResponseEntity<ShowDetailedDto> getDetailedShowInfo(@PathVariable("showName") String showName){
        ShowDetailedDto showDetail=showService.getDetailedInfo(showName);
        return ResponseEntity.ok(showDetail);
    }
}