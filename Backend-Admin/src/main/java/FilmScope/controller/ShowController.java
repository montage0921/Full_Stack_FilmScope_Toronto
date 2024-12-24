package FilmScope.controller;

import FilmScope.dto.ShowDetailedDto;
import FilmScope.dto.ShowDto;
import FilmScope.dto.ShowListDto;
import FilmScope.service.ShowService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("{showTitle}")
    public ResponseEntity<ShowDetailedDto> getDetailedShowInfo(@PathVariable("showTitle") String showTitle){
        ShowDetailedDto showDetail=showService.getDetailedInfo(showTitle);
        return ResponseEntity.ok(showDetail);
    }

    // update show info by showTitle
    // only show_title and showtimes can be updated
    @PutMapping("{showTitle}")
    public ResponseEntity<List<ShowDto>> updateShow(@PathVariable("showTitle") String showTitle,
                                              @RequestBody ShowDto updatedShow)
    {
        List<ShowDto> updatedShows=showService.updateShow(showTitle,updatedShow);
        return ResponseEntity.ok(updatedShows);
    }
}