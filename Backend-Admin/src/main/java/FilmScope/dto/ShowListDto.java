package FilmScope.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class ShowListDto {
    private Integer id;
    private String theatre;
    private String showTitle;
}
