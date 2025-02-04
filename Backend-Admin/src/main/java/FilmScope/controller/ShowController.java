package FilmScope.controller;

import FilmScope.dto.*;
import FilmScope.service.ShowService;
import FilmScope.service.TMDBService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // React App URL
@RestController
@AllArgsConstructor
@RequestMapping("/admin-filmscope")
public class ShowController{
    private final ShowService showService;
    private final TMDBService tmdbService;

    // get a list of all screening info (id, title, theatre,film,dates)
    @GetMapping("get-all")
    public ResponseEntity<List<ShowListDto>> getShowList(){
        List<ShowListDto> shows=showService.getAllShows();
        return ResponseEntity.ok(shows);
    }

    // pagination
    @GetMapping("load")
    public Page<ShowListDto> load(@RequestParam int size){
        return showService.load(size);
    }

    @GetMapping("search")
    public ResponseEntity<List<SearchResDto>> search(@RequestParam String query){
        return ResponseEntity.ok(showService.search(query));
    }

    @GetMapping("get-film")
    public ResponseEntity<FilmDto> getFilm(@RequestParam Long customId){
        FilmDto filmDto=showService.getFilm(customId);
        return ResponseEntity.ok(filmDto);
    }

    // get a show's detailed info by showTitle
    @GetMapping("detailed-showInfo")
    public ResponseEntity<ShowDetailedDto> getDetailedShowInfo(@RequestParam String showTitle,
                                                               @RequestParam String theatre){
        ShowDetailedDto showDetail=showService.getDetailedInfo(showTitle,theatre);
        return ResponseEntity.ok(showDetail);
    }

    // update show info by showTitle
    // only show_title and showtimes can be updated
    @PutMapping("update-show/{id}")
    public ResponseEntity<String> updateShow(@PathVariable("id") Integer id,
                                                    @RequestBody ShowDto updatedShow)
    {
        String message=showService.updateShow(id,updatedShow);
        return ResponseEntity.ok(message);
    }

    // update movie info by filmId
    @PutMapping("update-film/{customId}")
    public ResponseEntity<FilmDto> updateFilm(@PathVariable("customId") Long customId,@RequestBody
    FilmDto updatedFilmDto){
        FilmDto updatedFilmRes=showService.updateFilm(customId,updatedFilmDto);
        return ResponseEntity.ok(updatedFilmRes);
    }

    // delete a show
    @DeleteMapping("delete-show")
    public ResponseEntity<String> deleteShow(@RequestParam("showTitle") String showTitle,@RequestParam("theatre") String theatre){
        showService.deleteShow(showTitle,theatre);
        return ResponseEntity.ok(String.format("Show %s in %s is successfully deleted", showTitle,theatre));
    }

    @DeleteMapping("delete-show-id")
    public ResponseEntity<String> deleteShowById(@RequestParam("id") Integer id){
        showService.deleteShowById(id);
        return ResponseEntity.ok("the show is deleted successfully");
    }

    // delete a film in a show
    @DeleteMapping("delete-film")
    public ResponseEntity<String> deleteShowByFilm(@RequestParam("customId") Long customId,@RequestParam("theatre") String theatre){
        showService.deleteFilm(customId,theatre);
        return ResponseEntity.ok("Film is successfully deleted");
    }

    // delete all expired show
    @DeleteMapping("delete-expired-show")
    public ResponseEntity<String> deleteExpiredShow(){
        try{
            showService.deleteExpiredShows();
            return ResponseEntity.ok("All shows before today are deleted!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body(String.format("Error:%s",e.getMessage()));
        }
    }

    // Obtain a film's detailed info from TMDB API via python flask app
    // This will fetch detailed movie info based on film's title and year then store in MySQL's move_info table
    @GetMapping("fetch-film-info")
    public ResponseEntity<String> uploadFilmFromTMDB(@RequestParam("filmTitle") String filmTitle,@RequestParam("releaseYear") Integer releaseYear) throws JsonProcessingException {
        String film_info= tmdbService.fetchMovieInfo(filmTitle,releaseYear);

        ObjectMapper objectMapper=new ObjectMapper();

        JsonNode rootNode=objectMapper.readTree(film_info);
        int filmId=rootNode.path("film_info").path("film_id").asInt();

        if(filmId==0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(String.format("Movie %s not found in database",filmTitle));
        }else{
            return ResponseEntity.ok(film_info);
        }
    }

    @PostMapping("add-film")
    public ResponseEntity<String> addNewFilm(@RequestBody FilmDto filmDto) {
        System.out.println("Request received to add film: " + filmDto);
        String addNewFilmStatus = showService.addNewFilm(filmDto);
        if (addNewFilmStatus.contains("Error")) {
            return ResponseEntity.badRequest().body(addNewFilmStatus);
        } else {
            return ResponseEntity.ok(addNewFilmStatus);
        }
    }

    @GetMapping("find-customId")
    public ResponseEntity<Long> getCustomId(@PathParam("filmTitle") String filmTitle,@PathParam("year") Integer year){
        Long customId=showService.getCustomId(filmTitle,year);
        return ResponseEntity.ok(customId);
    }

    @PostMapping("sync-show-with-new-film")
    public ResponseEntity<String> syncShowWithNewFilm(@RequestBody ShowDto showDto){
        String syncStatus=showService.syncShowWithNewFilm(showDto);
        return ResponseEntity.ok(syncStatus);
    }

    @PostMapping("add-show")
    public ResponseEntity<String> addNewShow(@RequestBody ShowDto showDto){
        String addedShowStatus=showService.addNewShow(showDto);
        if(addedShowStatus.contains("Error")){
            return ResponseEntity.badRequest().body(addedShowStatus);
        }else{
            return ResponseEntity.ok(addedShowStatus);
        }
    }
}