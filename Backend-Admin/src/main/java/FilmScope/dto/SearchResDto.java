package FilmScope.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SearchResDto {
    private int id;
    private String showTitle;
    private String filmTitle;
    private String theatre;
    private String imageUrl;
}
