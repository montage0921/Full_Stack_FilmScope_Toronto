package FilmScope.controller;

import FilmScope.dto.FilmDto;
import FilmScope.dto.ShowDetailedDto;
import FilmScope.dto.ShowDto;
import FilmScope.dto.ShowListDto;
import FilmScope.entity.Film;
import FilmScope.service.ShowService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
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
    @PutMapping("update-show/{showTitle}")
    public ResponseEntity<List<ShowDto>> updateShow(@PathVariable("showTitle") String showTitle,
                                              @RequestBody ShowDto updatedShow)
    {
        List<ShowDto> updatedShows=showService.updateShow(showTitle,updatedShow);
        return ResponseEntity.ok(updatedShows);
    }

    // update movie info by filmId
    @PutMapping("update-film/{filmId}")
    public ResponseEntity<FilmDto> updateFilm(@PathVariable("filmId") Integer filmId,@RequestBody
    FilmDto updatedFilmDto){
        FilmDto updatedFilmRes=showService.updateFilm(filmId,updatedFilmDto);
        return ResponseEntity.ok(updatedFilmRes);
    }

    // delete a show
    @DeleteMapping("delete-show")
    public ResponseEntity<String> deleteShow(@RequestParam("showTitle") String showTitle,@RequestParam("theatre") String theatre){
        showService.deleteShow(showTitle,theatre);
        return ResponseEntity.ok(String.format("Show %s in %s is successfully deleted", showTitle,theatre));
    }

    // delete a film in a show
    @DeleteMapping("delete-film")
    public ResponseEntity<String> deleteFilmInAShow(@RequestParam("showTitle") String showTitle,@RequestParam("theatre")
    String theatre,@RequestParam("filmId") String filmTitle){
        showService.deleteFilm(showTitle,theatre,filmTitle);
        return ResponseEntity.ok(String.format("Film %s of show %s in theatre %s is successfully deleted", filmTitle,showTitle,theatre));
    }

}