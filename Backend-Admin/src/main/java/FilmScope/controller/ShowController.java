package FilmScope.controller;

import FilmScope.dto.ShowListDto;
import FilmScope.service.ShowService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/show-list")
public class ShowController{
    private final ShowService showService;

    @GetMapping
    public ResponseEntity<List<ShowListDto>> getShowList(){
        List<ShowListDto> showList=showService.getShowList();

        return ResponseEntity.ok(showList);
    }



}